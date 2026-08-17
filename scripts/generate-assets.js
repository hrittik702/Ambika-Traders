import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const imagesDir = path.join(rootDir, 'public', 'images');

const dirs = [
  path.join(imagesDir, 'hero'),
  path.join(imagesDir, 'products'),
  path.join(imagesDir, 'services'),
  path.join(imagesDir, 'projects'),
];

dirs.forEach((d) => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

function createSvg({ title, category, code, width = 1200, height = 800, dark = false }) {
  const bg = dark ? '#0a0a0a' : '#141414';
  const border = dark ? '#222222' : '#2a2a2a';
  const accent = '#ffffff';
  const textMuted = '#888888';
  const gridColor = '#1f1f1f';

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg}" />
      <stop offset="100%" stop-color="#050505" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${gridColor}" stroke-width="0.75" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#grad)" />
  <rect width="${width}" height="${height}" fill="url(#grid)" opacity="0.65" />

  <!-- Architectural Frame -->
  <rect x="40" y="40" width="${width - 80}" height="${height - 80}" fill="none" stroke="${border}" stroke-width="1.5" />
  <rect x="52" y="52" width="${width - 104}" height="${height - 104}" fill="none" stroke="${border}" stroke-width="0.5" stroke-dasharray="4 4" />

  <!-- Diagonal Engineering Lines -->
  <line x1="40" y1="40" x2="160" y2="160" stroke="${border}" stroke-width="0.75" />
  <line x1="${width - 40}" y1="40" x2="${width - 160}" y2="160" stroke="${border}" stroke-width="0.75" />
  <line x1="40" y1="${height - 40}" x2="160" y2="${height - 160}" stroke="${border}" stroke-width="0.75" />
  <line x1="${width - 40}" y1="${height - 40}" x2="${width - 160}" y2="${height - 160}" stroke="${border}" stroke-width="0.75" />

  <!-- Central Architectural Blueprint Graphic -->
  <g transform="translate(${width / 2}, ${height / 2 - 40})">
    <!-- Outer Blueprint Circle -->
    <circle r="120" fill="none" stroke="${border}" stroke-width="1" />
    <circle r="90" fill="none" stroke="#2c2c2c" stroke-width="1" stroke-dasharray="6 6" />
    <circle r="4" fill="${accent}" />

    <!-- Technical Crosshairs -->
    <line x1="-140" y1="0" x2="140" y2="0" stroke="${border}" stroke-width="1" />
    <line x1="0" y1="-140" x2="0" y2="140" stroke="${border}" stroke-width="1" />

    <!-- Isometric Box Motif -->
    <polygon points="0,-50 45,-25 45,25 0,50 -45,25 -45,-25" fill="#181818" stroke="${accent}" stroke-width="1.5" />
    <line x1="0" y1="0" x2="0" y2="50" stroke="${accent}" stroke-width="1.5" />
    <line x1="0" y1="0" x2="45" y2="-25" stroke="${accent}" stroke-width="1.5" />
    <line x1="0" y1="0" x2="-45" y2="-25" stroke="${accent}" stroke-width="1.5" />
  </g>

  <!-- Typography Block -->
  <g transform="translate(80, ${height - 130})">
    <text x="0" y="0" font-family="'JetBrains Mono', 'Courier New', monospace" font-size="13" font-weight="600" fill="${textMuted}" letter-spacing="3">[${code || 'AMBIKA SPECIFICATION'}]</text>
    <text x="0" y="32" font-family="'Inter', -apple-system, sans-serif" font-size="26" font-weight="700" fill="${accent}" letter-spacing="-0.5">${title}</text>
    <text x="0" y="58" font-family="'JetBrains Mono', 'Courier New', monospace" font-size="12" fill="${textMuted}" letter-spacing="1">SECTION: ${category || 'ARCHITECTURAL PROFILE'}</text>
  </g>

  <!-- Top Right Brand Stamp -->
  <g transform="translate(${width - 240}, 80)">
    <text x="0" y="0" font-family="'Inter', -apple-system, sans-serif" font-size="12" font-weight="800" fill="${accent}" letter-spacing="2">AMBIKA TRADERS</text>
    <text x="0" y="16" font-family="'JetBrains Mono', 'Courier New', monospace" font-size="10" fill="${textMuted}" letter-spacing="1">PRECISION FABRICATION</text>
  </g>
</svg>
`.trim();
}

const assets = [
  // Hero
  { file: 'hero/hero-architectural-showroom.jpg', title: 'Architectural Showroom & Workshop', category: 'Flagship Facility', code: 'HERO-01', width: 1920, height: 1080, dark: true },

  // Products
  { file: 'products/slim-sliding-window.jpg', title: 'Slim Profile Sliding Window System', category: 'Fenestration', code: 'PROD-01' },
  { file: 'products/casement-door-system.jpg', title: 'Heavy-Duty Casement Door System', category: 'Door Systems', code: 'PROD-02' },
  { file: 'products/acoustic-glass-partition.jpg', title: 'Acoustic Glass Partition System', category: 'Partitions', code: 'PROD-03' },
  { file: 'products/premium-sanitary-suite.jpg', title: 'Matte Finish Sanitaryware Suite', category: 'Sanitaryware', code: 'PROD-04' },
  { file: 'products/modular-kitchen-profile.jpg', title: 'Aluminium Modular Kitchen System', category: 'Kitchen Systems', code: 'PROD-05' },
  { file: 'products/sliding-wardrobe-system.jpg', title: 'Profile Glass Sliding Wardrobe', category: 'Wardrobe Systems', code: 'PROD-06' },
  { file: 'products/gypsum-grid-ceiling.jpg', title: 'Architectural False Ceiling Grid', category: 'Ceiling Systems', code: 'PROD-07' },

  // Categories
  { file: 'products/cat-doors-windows.jpg', title: 'Aluminium Doors & Windows', category: 'Category Catalog', code: 'CAT-01' },
  { file: 'products/cat-sliding-partitions.jpg', title: 'Sliding Systems & Glass Partitions', category: 'Category Catalog', code: 'CAT-02' },
  { file: 'products/cat-sanitaryware.jpg', title: 'Sanitaryware & Bath Solutions', category: 'Category Catalog', code: 'CAT-03' },
  { file: 'products/cat-kitchen.jpg', title: 'Modular Kitchen Systems', category: 'Category Catalog', code: 'CAT-04' },
  { file: 'products/cat-wardrobes.jpg', title: 'Wardrobes & Interior Works', category: 'Category Catalog', code: 'CAT-05' },
  { file: 'products/cat-false-ceiling.jpg', title: 'False Ceiling & Panels', category: 'Category Catalog', code: 'CAT-06' },
  { file: 'products/cat-hardware.jpg', title: 'Architectural Hardware & Fittings', category: 'Category Catalog', code: 'CAT-07' },

  // Services
  { file: 'services/aluminium-fabrication.jpg', title: 'Custom Aluminium Fabrication', category: 'Installation & Fitout', code: 'SRV-01' },
  { file: 'services/sliding-partitions.jpg', title: 'Glass Partitions & Systems', category: 'Installation & Fitout', code: 'SRV-02' },
  { file: 'services/interior-execution.jpg', title: 'Complete Interior Solutions', category: 'Installation & Fitout', code: 'SRV-03' },
  { file: 'services/false-ceiling.jpg', title: 'False Ceiling & Grid Works', category: 'Installation & Fitout', code: 'SRV-04' },
  { file: 'services/renovation.jpg', title: 'Renovation & Retrofit Services', category: 'Installation & Fitout', code: 'SRV-05' },
  { file: 'services/architectural-consulting.jpg', title: 'Architectural Consultation', category: 'Advisory & Planning', code: 'SRV-06' },

  // Projects
  { file: 'projects/project-villa-01.jpg', title: 'The Green Villa — View 01', category: 'Residential Architecture', code: 'PROJ-01A' },
  { file: 'projects/project-villa-02.jpg', title: 'The Green Villa — View 02', category: 'Residential Architecture', code: 'PROJ-01B' },
  { file: 'projects/project-villa-03.jpg', title: 'The Green Villa — View 03', category: 'Residential Architecture', code: 'PROJ-01C' },
  { file: 'projects/project-office-01.jpg', title: 'Horizon Corporate — View 01', category: 'Commercial Fitout', code: 'PROJ-02A' },
  { file: 'projects/project-office-02.jpg', title: 'Horizon Corporate — View 02', category: 'Commercial Fitout', code: 'PROJ-02B' },
  { file: 'projects/project-penthouse-01.jpg', title: 'Apex Penthouse — View 01', category: 'Interior Fitouts', code: 'PROJ-03A' },
  { file: 'projects/project-penthouse-02.jpg', title: 'Apex Penthouse — View 02', category: 'Interior Fitouts', code: 'PROJ-03B' },
];

assets.forEach((asset) => {
  const filePath = path.join(imagesDir, asset.file);
  const svg = createSvg(asset);
  // Write SVG content (browsers can render SVG saved as .jpg or .svg smoothly)
  fs.writeFileSync(filePath, svg, 'utf8');
  console.log(`Generated: ${asset.file}`);
});

console.log('All image assets successfully generated.');
