const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createIco(pngBuffers, sizes) {
  const numImages = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(numImages, 4);

  const dirEntries = [];
  let offset = 6 + 16 * numImages;

  for (let i = 0; i < numImages; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += buf.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
}

async function run() {
  const logoPath = path.join(__dirname, '../public/images/logo.png');

  // 1. Generate multi-resolution icons
  const iconSizes = [
    { file: 'public/favicon-16x16.png', size: 16 },
    { file: 'public/favicon-32x32.png', size: 32 },
    { file: 'public/favicon-48x48.png', size: 48 }, // Google SERP standard
    { file: 'public/apple-touch-icon.png', size: 180 },
    { file: 'public/icon-192x192.png', size: 192 },
    { file: 'public/icon-512x512.png', size: 512 },
    { file: 'src/app/icon.png', size: 512 },
    { file: 'src/app/apple-icon.png', size: 180 },
  ];

  for (const item of iconSizes) {
    const outPath = path.join(__dirname, '..', item.file);
    await sharp(logoPath).resize(item.size, item.size).png().toFile(outPath);
    console.log(`Generated: ${item.file}`);
  }

  // 2. Generate multi-size favicon.ico
  const icoSizes = [16, 32, 48];
  const pngBuffers = [];
  for (const s of icoSizes) {
    const b = await sharp(logoPath).resize(s, s).png().toBuffer();
    pngBuffers.push(b);
  }
  const ico = await createIco(pngBuffers, icoSizes);
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), ico);
  fs.writeFileSync(path.join(__dirname, '../src/app/favicon.ico'), ico);
  console.log('Generated: public/favicon.ico & src/app/favicon.ico');

  // 3. Generate static OG image (1200x630)
  const width = 1200;
  const height = 630;
  const logoBuf = fs.readFileSync(logoPath);
  const logoBase64 = 'data:image/png;base64,' + logoBuf.toString('base64');

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#090D1A" />
        <stop offset="50%" stop-color="#0F172A" />
        <stop offset="100%" stop-color="#050811" />
      </linearGradient>
      <radialGradient id="blueGlow" cx="20%" cy="25%" r="45%">
        <stop offset="0%" stop-color="#0284C7" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#090D1A" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="purpleGlow" cx="80%" cy="75%" r="45%">
        <stop offset="0%" stop-color="#7C3AED" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#090D1A" stop-opacity="0" />
      </radialGradient>
      <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="100%" height="100%" fill="url(#bgGrad)" />
    <rect width="100%" height="100%" fill="url(#blueGlow)" />
    <rect width="100%" height="100%" fill="url(#purpleGlow)" />

    <!-- Subtle Grid Overlay -->
    <g stroke="rgba(255,255,255,0.03)" stroke-width="1">
      <line x1="0" y1="105" x2="1200" y2="105"/>
      <line x1="0" y1="210" x2="1200" y2="210"/>
      <line x1="0" y1="315" x2="1200" y2="315"/>
      <line x1="0" y1="420" x2="1200" y2="420"/>
      <line x1="0" y1="525" x2="1200" y2="525"/>
      <line x1="200" y1="0" x2="200" y2="630"/>
      <line x1="400" y1="0" x2="400" y2="630"/>
      <line x1="600" y1="0" x2="600" y2="630"/>
      <line x1="800" y1="0" x2="800" y2="630"/>
      <line x1="1000" y1="0" x2="1000" y2="630"/>
    </g>

    <!-- Card Container -->
    <rect x="60" y="60" width="1080" height="510" rx="24" fill="rgba(15, 23, 42, 0.75)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5" filter="url(#dropShadow)"/>

    <!-- Header Section -->
    <g transform="translate(100, 100)">
      <image href="${logoBase64}" width="68" height="68" x="0" y="0" preserveAspectRatio="xMidYMid meet" />
      <text x="86" y="48" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="40" font-weight="900" letter-spacing="-1">RyxerMart</text>
      
      <rect x="315" y="16" width="340" height="38" rx="19" fill="rgba(124, 58, 237, 0.22)" stroke="rgba(167, 139, 250, 0.45)" stroke-width="1"/>
      <text x="485" y="41" fill="#C4B5FD" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" text-anchor="middle">Professional Web Solutions Agency</text>
    </g>

    <!-- Main Headline -->
    <g transform="translate(100, 240)">
      <text x="0" y="0" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="48" font-weight="900" letter-spacing="-1.5">
        High-Performing Websites &amp;
      </text>
      <text x="0" y="58" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="48" font-weight="900" letter-spacing="-1.5">
        E-Commerce Stores
      </text>
      <text x="0" y="122" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="500">
        Starting at ₹3,499 • 1 Year Free High-Speed SSD Cloud Hosting • Free SSL • 3–5 Day Delivery
      </text>
    </g>

    <!-- Footer Features -->
    <g transform="translate(100, 485)">
      <circle cx="8" cy="0" r="5" fill="#38BDF8"/>
      <text x="24" y="6" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700">100% Mobile Responsive</text>

      <circle cx="270" cy="0" r="5" fill="#34D399"/>
      <text x="286" y="6" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700">Free SSL &amp; Cloud Hosting</text>

      <circle cx="580" cy="0" r="5" fill="#FBBF24"/>
      <text x="596" y="6" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700">WhatsApp Instant Ordering</text>

      <text x="980" y="6" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" text-anchor="end">https://ryxer.site</text>
    </g>
  </svg>
  `;

  const ogOutPath = path.join(__dirname, '../public/images/og-image.png');
  await sharp(Buffer.from(svg)).png({ quality: 95 }).toFile(ogOutPath);
  console.log('Generated: public/images/og-image.png');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
