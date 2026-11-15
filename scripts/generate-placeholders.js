import fs from 'fs';
import path from 'path';

const categories = [
  { id: 'cleanser', name: 'Cleanser', icon: '💧', color: '#FCE8EF' },
  { id: 'toner', name: 'Toner', icon: '✨', color: '#FDF0F5' },
  { id: 'serum', name: 'Serum', icon: '🧪', color: '#FCE8EF' },
  { id: 'moisturizer', name: 'Moisturizer', icon: '🧴', color: '#FBF2F6' },
  { id: 'sunscreen', name: 'Sunscreen', icon: '☀️', color: '#FFF5F8' },
  { id: 'masker', name: 'Masker', icon: '🌸', color: '#FCE8EF' },
  { id: 'makeup', name: 'Makeup', icon: '💄', color: '#FDF0F5' },
];

const skinTypes = [
  { id: 'oily', label: 'Berminyak', en: 'Oily Skin', tagColor: '#E8A0B8' },
  { id: 'dry', label: 'Kering', en: 'Dry Skin', tagColor: '#D88A9E' },
  { id: 'combination', label: 'Kombinasi', en: 'Combination', tagColor: '#C96F91' },
  { id: 'sensitive', label: 'Sensitif', en: 'Sensitive', tagColor: '#EAA5BC' },
  { id: 'acne', label: 'Berjerawat', en: 'Acne-Prone', tagColor: '#B8587A' },
];

const outDir = path.resolve('assets/images/products');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

categories.forEach(cat => {
  skinTypes.forEach(skin => {
    const filename = `${cat.id}-${skin.id}.jpg`;
    const svgFilename = `${cat.id}-${skin.id}.svg`;
    const filepath = path.join(outDir, filename);

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9FB"/>
      <stop offset="50%" stop-color="${cat.color}"/>
      <stop offset="100%" stop-color="#F7D8E4"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#C96F91" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect width="600" height="600" fill="url(#bg)"/>

  <!-- Pedestal circle -->
  <circle cx="300" cy="300" r="210" fill="#FFFFFF" opacity="0.8" filter="url(#shadow)"/>
  <circle cx="300" cy="300" r="190" fill="none" stroke="#E8A0B8" stroke-width="1.5" stroke-dasharray="4,4"/>

  <!-- Brand watermark -->
  <text x="300" y="145" font-family="'Cormorant Garamond', Georgia, serif" font-size="20" font-weight="600" letter-spacing="4" fill="#8A7D84" text-anchor="middle">S K I N O R A</text>
  <line x1="260" y1="158" x2="340" y2="158" stroke="#E8A0B8" stroke-width="1"/>

  <!-- Icon / Illustration -->
  <g transform="translate(300, 260)">
    <circle cx="0" cy="0" r="56" fill="#FCE8EF"/>
    <text x="0" y="18" font-size="44" text-anchor="middle">${cat.icon}</text>
  </g>

  <!-- Category & Skin Type Titles -->
  <text x="300" y="360" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="24" font-weight="700" fill="#292329" text-anchor="middle">${cat.name}</text>
  <text x="300" y="388" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="500" fill="#8A7D84" text-anchor="middle">Formula Khusus ${skin.label} (${skin.en})</text>

  <!-- Pill Badge -->
  <g transform="translate(300, 420)">
    <rect x="-90" y="-14" width="180" height="28" rx="14" fill="${skin.tagColor}"/>
    <text x="0" y="5" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">SLOT FOTO PRODUK</text>
  </g>

  <!-- Footnote -->
  <text x="300" y="520" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#A89BA2" text-anchor="middle">assets/images/products/${filename}</text>
</svg>`;

    // Save as SVG and as JPG name (SVG content) so browsers display it directly as an image
    fs.writeFileSync(filepath, svg);
    fs.writeFileSync(path.join(outDir, svgFilename), svg);
  });
});

console.log('Successfully generated 35 product placeholder images in assets/images/products/');
