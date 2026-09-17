import { db } from "./db";

export interface LogAuditParams {
  adminUserId?: string;
  adminName?: string;
  action: string;
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, unknown> | string;
  ipAddress?: string;
}

export async function logAudit(params: LogAuditParams): Promise<void> {
  try {
    const metadataString =
      typeof params.metadata === "object"
        ? JSON.stringify(params.metadata)
        : params.metadata;

    await db.auditLog.create({
      data: {
        adminUserId: params.adminUserId,
        adminName: params.adminName || "System",
        action: params.action,
        targetType: params.targetType,
        targetId: params.targetId,
        metadata: metadataString,
        ipAddress: params.ipAddress,
      },
    });
  } catch (error) {
    // Audit logging should never crash the main application, but should report errors
    console.error("[AuditLog Error]:", error);
  }
}
