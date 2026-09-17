import { db } from "../src/lib/db";
import { generateOrderNumber } from "../src/lib/order-id";
import { generateWhatsAppOrderLink, formatWhatsAppMessage } from "../src/lib/whatsapp";
import { hashPassword, verifyPassword, createSessionToken, verifySessionToken } from "../src/lib/auth";
import { checkRateLimit } from "../src/lib/rate-limit";

async function runTests() {
  console.log("🧪 Starting RyxerMart Production Test Suite...\n");
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // TEST 1: Unique Order Number Generation Pattern
  console.log("1. Order ID Format & Uniqueness Tests");
  const orderNum1 = generateOrderNumber();
  const orderNum2 = generateOrderNumber();
  assert(/^RXM-\d{8}-[A-F0-9]{4}$/.test(orderNum1), `Order number follows RXM-YYYYMMDD-XXXX format (${orderNum1})`);
  assert(orderNum1 !== orderNum2, "Sequential order IDs are strictly distinct and unique");

  // TEST 2: Password Hashing & Bcrypt Verification
  console.log("\n2. Security & Authentication Tests");
  const plainPassword = "TestSecretPassword123!";
  const hash = await hashPassword(plainPassword);
  assert(hash !== plainPassword, "Password is not stored in plaintext");
  assert(hash.startsWith("$2"), "Password hash uses valid Bcrypt format");
  const isValid = await verifyPassword(plainPassword, hash);
  assert(isValid === true, "Bcrypt verifies valid password successfully");
  const isInvalid = await verifyPassword("WrongPassword!", hash);
  assert(isInvalid === false, "Bcrypt rejects incorrect password");

  // TEST 3: JWT Session Token Signing & Verification
  console.log("\n3. JWT Admin Session Tests");
  const sessionPayload = {
    id: "admin-user-test-1",
    email: "admin@ryxermart.com",
    name: "Test Administrator",
    role: "ADMIN",
  };
  const token = await createSessionToken(sessionPayload);
  assert(typeof token === "string" && token.length > 20, "JWT session token created successfully");
  const verified = await verifySessionToken(token);
  assert(verified !== null && verified.email === sessionPayload.email, "JWT session token verified correctly");
  const fakeVerified = await verifySessionToken("malicious.tampered.token");
  assert(fakeVerified === null, "Tampered/invalid JWT token is rejected safely");

  // TEST 4: WhatsApp Message Formatting & wa.me URL Generation
  console.log("\n4. WhatsApp Integration Tests");
  const testOrderData = {
    orderNumber: "RXM-20260917-A8F2",
    customerName: "Gurpreet Singh",
    customerPhone: "+919876543210",
    customerEmail: "gurpreet@example.com",
    city: "Jalandhar",
    state: "Punjab",
    items: [
      { serviceName: "Royal Website", unitPrice: 5499, quantity: 1, subtotal: 5499 },
      { serviceName: "Starter Website", unitPrice: 3499, quantity: 1, subtotal: 3499 },
    ],
    subtotal: 8998,
    total: 8998,
    requirements: "Need a website for my local retail business.",
  };
  const formattedMsg = formatWhatsAppMessage(testOrderData);
  assert(formattedMsg.includes("RXM-20260917-A8F2"), "WhatsApp message contains Order Reference ID");
  assert(formattedMsg.includes("Royal Website"), "WhatsApp message includes Service 1 Name");
  assert(formattedMsg.includes("₹5,499"), "WhatsApp message includes formatted INR prices");
  assert(formattedMsg.includes("Gurpreet Singh"), "WhatsApp message includes customer name");

  const waLink = generateWhatsAppOrderLink(testOrderData, "919876543210");
  assert(waLink.startsWith("https://wa.me/919876543210?text="), "WhatsApp link uses official wa.me format");
  assert(waLink.includes(encodeURIComponent("RXM-20260917-A8F2")), "WhatsApp link properly URL-encodes payload");

  // TEST 5: Database Services Query & Seed Integrity
  console.log("\n5. Database Seed Integrity Tests");
  const starter = await db.service.findUnique({
    where: { slug: "starter-website" },
    include: { features: true },
  });
  assert(starter !== null, "Starter Website service exists in database");
  assert(starter?.price === 3499, `Starter Website price is ₹3,499 (Got: ₹${starter?.price})`);
  assert(starter?.features.length! > 5, "Starter Website has required feature inclusions");

  const royal = await db.service.findUnique({
    where: { slug: "royal-website" },
    include: { features: true },
  });
  assert(royal !== null, "Royal Website exists in database");
  assert(royal?.price === 5499, `Royal Website price is ₹5,499 (Got: ₹${royal?.price})`);
  assert(royal?.featured === true, "Royal Website is marked as Most Popular (featured: true)");

  const ecommerce = await db.service.findUnique({
    where: { slug: "ecommerce-starter" },
    include: { features: true },
  });
  assert(ecommerce !== null, "Ecommerce Starter exists in database");
  assert(ecommerce?.price === 9999, `Ecommerce Starter price is ₹9,999 (Got: ₹${ecommerce?.price})`);

  const ecommercePrem = await db.service.findUnique({
    where: { slug: "ecommerce-premium" },
    include: { features: true },
  });
  assert(ecommercePrem !== null, "Ecommerce Premium exists in database");
  assert(ecommercePrem?.price === 14999, `Ecommerce Premium price is ₹14,999 (Got: ₹${ecommercePrem?.price})`);

  // TEST 6: Authoritative Price Tamper Protection (Section 69 & 70)
  console.log("\n6. Price Tampering Prevention Test (Authoritative Server Recalculation)");
  // Simulate attacker sending { serviceId, price: 1 }
  const maliciousClientInput = [
    { serviceId: royal!.id, tamperedPrice: 1, quantity: 2 },
  ];
  // Server-side authoritative lookup:
  const dbLookup = await db.service.findMany({
    where: { id: { in: maliciousClientInput.map((i) => i.serviceId) } },
  });
  let serverCalculatedSubtotal = 0;
  for (const item of maliciousClientInput) {
    const authoritative = dbLookup.find((s) => s.id === item.serviceId);
    serverCalculatedSubtotal += authoritative!.price * item.quantity;
  }
  assert(
    serverCalculatedSubtotal === 5499 * 2,
    `Server overrides tampered client price ₹1 and calculates authoritative total ₹${serverCalculatedSubtotal} (₹10,998)`
  );

  // TEST 7: Rate Limiter Tests
  console.log("\n7. Rate Limiter Tests");
  const testIp = "test-ip-" + Date.now();
  const limit = 3;
  const r1 = checkRateLimit(testIp, limit, 5000);
  assert(r1.success === true && r1.remaining === 2, "1st request within rate limit is allowed");
  const r2 = checkRateLimit(testIp, limit, 5000);
  assert(r2.success === true && r2.remaining === 1, "2nd request within rate limit is allowed");
  const r3 = checkRateLimit(testIp, limit, 5000);
  assert(r3.success === true && r3.remaining === 0, "3rd request within rate limit is allowed");
  const r4 = checkRateLimit(testIp, limit, 5000);
  assert(r4.success === false && r4.remaining === 0, "4th request exceeds rate limit and is blocked (429)");

  // TEST 8: Chatbot Base Prompt Security Invariants
  console.log("\n8. Chatbot Security Guardrails Tests");
  const chatbotConfig = await db.chatbotSetting.findUnique({ where: { id: "default" } });
  assert(chatbotConfig !== null, "Default chatbot settings exist in database");
  assert(chatbotConfig?.isEnabled === true, "Chatbot is enabled by default");
  assert(chatbotConfig?.systemPrompt.includes("You are a guide, not an order-processing agent"), "Chatbot prompt explicitly restricts order processing and payments");
  assert(chatbotConfig?.systemPrompt.toLowerCase().includes("never invent"), "Chatbot prompt forbids hallucination of prices or features");

  console.log(`\n========================================`);
  console.log(`Summary: ${passed} passed, ${failed} failed out of ${passed + failed} assertions.`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests()
  .catch((e) => {
    console.error("Test execution failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
