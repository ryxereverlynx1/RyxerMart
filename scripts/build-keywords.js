const fs = require('fs');
const path = require('path');

const brandAndTypos = [
  'ryxermart', 'ryxer mart', 'ryzer mart', 'ryzermart', 'rixermart', 'rixer mart',
  'rysermart', 'ryser mart', 'ryxar mart', 'ryxar', 'ryxer', 'ryzer', 'rixer', 'ryser',
  'ryxer site', 'ryzer site', 'ryxermart site', 'ryzer mart site', 'ryxermart official',
  'ryzer mart official', 'ryxermart website', 'ryzer mart website', 'ryxermart web solutions',
  'ryzer mart web solutions', 'ryxermart agency', 'ryzer mart agency', 'ryxermart jalandhar',
  'ryzer mart jalandhar', 'ryxermart punjab', 'ryzer mart punjab', 'ryxermart india',
  'ryzer mart india', 'ryxer tech', 'ryzer tech', 'ryxer web design', 'ryzer web design',
  'ryxermart packages', 'ryzer mart packages', 'ryxermart login', 'ryxermart services',
  'ryxermart dev', 'ryzer dev', 'ryxermart contact', 'ryzer mart contact', 'ryxermart price',
  'ryzer mart price', 'everlynx mart', 'ryxer everlynx', 'ryxereverlynx', 'ryxer software'
];

const cities = [
  'jalandhar', 'punjab', 'ludhiana', 'amritsar', 'chandigarh', 'mohali', 'patiala',
  'bathinda', 'haryana', 'delhi', 'noida', 'gurgaon', 'jaipur', 'mumbai', 'bangalore',
  'hyderabad', 'pune', 'kolkata', 'chennai', 'ahmedabad', 'surat', 'lucknow', 'indore'
];

const webServices = [
  'web design', 'website development', 'website designer', 'web development company',
  'website maker', 'website building agency', 'low cost website', 'affordable web design'
];

const geoKeywords = [];
for (const s of webServices) {
  for (const c of cities) {
    geoKeywords.push(`${s} in ${c}`);
    geoKeywords.push(`${s} ${c}`);
  }
}

const industries = [
  'restaurant', 'cafe', 'doctor clinic', 'hospital healthcare', 'dental clinic',
  'lawyer legal firm', 'real estate builder', 'property consultant', 'gym fitness club',
  'yoga studio', 'coaching institute', 'school college', 'tuition centre',
  'travel agency tour booking', 'hotel resort', 'car rental taxi', 'automobile dealership',
  'industrial manufacturer', 'factory exporter', 'b2b trade', 'textile garment manufacturer',
  'salon beauty parlour', 'spa wellness', 'event wedding planner', 'photography studio',
  'accountant ca firm', 'interior design architect', 'construction contractor',
  'cleaning service', 'security agency', 'transport logistics', 'courier delivery',
  'jewellery store', 'bakery cake shop', 'furniture decor store', 'pharmacy chemist shop',
  'pet clinic pet shop', 'bookstore stationery shop', 'optician eyewear store',
  'hardware sanitary store', 'solar energy company', 'packers and movers service'
];

const industryKeywords = [];
for (const ind of industries) {
  industryKeywords.push(`${ind} website design`);
  industryKeywords.push(`${ind} website development`);
  industryKeywords.push(`${ind} website maker india`);
}

const coreKeywords = [
  'website development india', 'web design company', 'website designer near me',
  'best website design agency', 'professional web developer', 'business website maker',
  'website design services india', 'website building company', 'full stack web development agency',
  'nextjs web developer', 'react js website developer', 'responsive web design company',
  'custom website design services', 'fast loading websites', 'mobile friendly website developer',
  'static website design', 'dynamic web development', 'corporate website maker',
  'portfolio website developer', 'startup web design', 'affordable web design agency',
  'low cost web developer', 'cheap website design india', 'budget website design',
  'fixed price website package', 'freelance web designer india', 'hire web developer india',
  'website development packages', 'modern website design company', 'creative web design agency',
  'clean website design', 'web portal development', 'enterprise web development',
  'website revamp services', 'website redesign agency', 'website maintenance services',
  'domain and hosting services', 'free ssl website design', 'cloud hosting website company',
  'landing page design company', 'lead generation website design', 'high converting landing page',
  'custom cms development', 'headless nextjs website', 'frontend development services',
  'single page application development', 'website speed optimization india', 'core web vitals optimization',
  'seo friendly web development', 'google search console indexing services', 'schema markup web design',
  'pwa website development', 'web application development india', 'custom api web integration',
  'ecommerce website development', 'ecommerce website maker india', 'whatsapp ecommerce store',
  'whatsapp store maker', 'whatsapp catalog website', 'online store developer',
  'custom ecommerce development', 'nextjs ecommerce store', 'upi ecommerce website',
  'ecommerce website with payment gateway', 'razorpay integration website', 'online shopping store maker',
  'grocery website development', 'clothing boutique website', 'footwear online store',
  'electronics online store', 'ecommerce website starting 9999', 'affordable ecommerce website',
  'shopify alternative india', 'woocommerce alternative', 'multi product ecommerce website',
  'single product landing page', 'high converting sales funnel', 'checkout page optimization',
  'instant whatsapp order website', 'product catalog website design', 'direct to consumer website maker',
  'd2c brand website developer', 'b2b ecommerce portal development', 'inventory management store design',
  'multi vendor ecommerce website', 'digital product selling website', 'automated receipt ecommerce website',
  'starter website package', 'starter website 3499', 'royal website package',
  'royal website 5499', 'ecommerce starter package', 'ecommerce starter 9999',
  'ecommerce premium package', 'ecommerce premium 14999', 'website with free hosting',
  '1 year free hosting website', 'free ssl certificate website package', '3 day website delivery',
  '5 day website delivery', 'website starting 3499', 'website under 5000',
  'website under 10000', 'low cost website package', 'budget website for small business',
  'ready to launch business website', 'fast turnaround website maker', 'whatsapp checkout website'
];

const combined = Array.from(new Set([
  ...brandAndTypos,
  ...coreKeywords,
  ...geoKeywords,
  ...industryKeywords
]));

console.log('Generated total unique keywords:', combined.length);

const fileContent = `// Comprehensive SEO & Query Matching Keywords Catalog
// Target: Brand variations (Ryxer Mart / Ryzer Mart), Geo-targeting (Punjab / National), Industry niches, and Packages.
export const SEO_KEYWORDS: string[] = ${JSON.stringify(combined, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/keywords.ts'), fileContent, 'utf8');
console.log('Saved src/lib/keywords.ts successfully.');
