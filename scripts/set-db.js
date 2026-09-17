const fs = require('fs');
const path = require('path');

const targetProvider = process.argv[2];
if (!['postgresql', 'sqlite'].includes(targetProvider)) {
  console.error('Usage: node scripts/set-db.js <postgresql|sqlite>');
  process.exit(1);
}

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

schema = schema.replace(/provider\s*=\s*"(sqlite|postgresql)"/, `provider = "${targetProvider}"`);

fs.writeFileSync(schemaPath, schema, 'utf8');
console.log(`Prisma datasource provider updated to: "${targetProvider}" in prisma/schema.prisma`);
