import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, createSessionToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const rateCheck = checkRateLimit(`login:${ip}`, 5, 60 * 1000); // 5 attempts per minute
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many login attempts. Please wait 1 minute before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid credentials" },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const adminEmail = (process.env.ADMIN_EMAIL || "ryxereverlynx@gmail.com").toLowerCase();
    const isMasterPassword = password === "Admin@Ryxer2026!" || password === "Admin@RyxerMart2026!";

    let user: any = null;
    try {
      user = await db.adminUser.findUnique({
        where: { email: email.toLowerCase() },
      });
    } catch (dbError) {
      console.warn("[Auth Notice] Database offline or unreachable during login check:", dbError);
    }

    // If user was not found in DB or DB was unreachable, check if this is the master owner account
    if (!user) {
      if (email.toLowerCase() === adminEmail && isMasterPassword) {
        user = {
          id: "root-admin-ryxer",
          email: adminEmail,
          name: "RyxerMart Administrator",
          role: "ADMIN",
          active: true,
        };
      } else {
        await logAudit({
          adminName: email,
          action: "FAILED_LOGIN",
          targetType: "AUTH",
          metadata: { reason: "User not found or inactive" },
          ipAddress: ip,
        });
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }
    } else {
      if (!user.active) {
        return NextResponse.json(
          { error: "This administrator account is disabled" },
          { status: 401 }
        );
      }

      const isValid = await verifyPassword(password, user.passwordHash);
      if (!isValid) {
        await logAudit({
          adminUserId: user.id,
          adminName: user.name,
          action: "FAILED_LOGIN",
          targetType: "AUTH",
          metadata: { reason: "Incorrect password" },
          ipAddress: ip,
        });
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }
    }

    // Try updating lastLoginAt if db is available
    try {
      if (user.id !== "root-admin-ryxer") {
        await db.adminUser.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });
      }
    } catch (err) {
      console.warn("[Auth Notice] Could not update lastLoginAt:", err);
    }

    const token = await createSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await logAudit({
      adminUserId: user.id,
      adminName: user.name,
      action: "LOGIN",
      targetType: "AUTH",
      metadata: { role: user.role },
      ipAddress: ip,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login" },
      { status: 500 }
    );
  }
}
