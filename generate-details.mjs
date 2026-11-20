import fs from 'fs';
import path from 'path';

const outDir = 'C:/aspireai/aangan-doors/public/images';

// Detail 1: Intricate Carving Closeup
const detailCarvingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="detailWood" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3D2517" />
      <stop offset="50%" stop-color="#593924" />
      <stop offset="100%" stop-color="#261409" />
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#detailWood)"/>
  <!-- Close-up Carved Relief Rosette & Floral Detailing -->
  <circle cx="300" cy="300" r="190" fill="#29150B" stroke="#D4AF37" stroke-width="4"/>
  <circle cx="300" cy="300" r="140" fill="none" stroke="#D4AF37" stroke-width="2.5" stroke-dasharray="8,6"/>
  <circle cx="300" cy="300" r="90" fill="#1E0D06" stroke="#D4AF37" stroke-width="3"/>
  <circle cx="300" cy="300" r="40" fill="#D4AF37"/>
  ${Array.from({ length: 16 }).map((_, i) => `
    <line x1="${300 + 90 * Math.cos(i * Math.PI / 8)}" y1="${300 + 90 * Math.sin(i * Math.PI / 8)}" x2="${300 + 140 * Math.cos(i * Math.PI / 8)}" y2="${300 + 140 * Math.sin(i * Math.PI / 8)}" stroke="#D4AF37" stroke-width="3" opacity="0.85"/>
  `).join('')}
  <text x="300" y="550" font-family="'Inter', sans-serif" font-size="12" fill="#EAE0D2" text-anchor="middle" letter-spacing="3">CLOSEUP: HIGH-PRECISION CNC RELIEF</text>
</svg>`;
fs.writeFileSync(path.join(outDir, 'detail-carving.svg'), detailCarvingSvg, 'utf-8');

// Detail 2: Brass Hardware & Lockset Closeup
const detailHardwareSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="woodBg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#352014"/>
      <stop offset="50%" stop-color="#4F3322"/>
      <stop offset="100%" stop-color="#352014"/>
    </linearGradient>
    <linearGradient id="brassDetail" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EED58E"/>
      <stop offset="40%" stop-color="#C5A059"/>
      <stop offset="80%" stop-color="#8F6B2E"/>
      <stop offset="100%" stop-color="#D4AF37"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#woodBg)"/>
  <!-- Beveled Door Stile Groove -->
  <line x1="160" y1="0" x2="160" y2="600" stroke="#1F1109" stroke-width="8"/>
  <line x1="162" y1="0" x2="162" y2="600" stroke="#C5A059" stroke-width="1.5" opacity="0.6"/>
  <!-- Solid Cast Brass Architectural Handle Plate -->
  <rect x="250" y="100" width="100" height="400" rx="10" fill="url(#brassDetail)" stroke="#593E15" stroke-width="3"/>
  <circle cx="300" cy="180" r="16" fill="#1C1008"/>
  <circle cx="300" cy="180" r="6" fill="#D4AF37"/>
  <path d="M 300 240 L 300 420" stroke="#1C1008" stroke-width="14" stroke-linecap="round"/>
  <!-- Decorative Screws -->
  <circle cx="300" cy="130" r="5" fill="#4A3412"/>
  <circle cx="300" cy="465" r="5" fill="#4A3412"/>
  <text x="300" y="550" font-family="'Inter', sans-serif" font-size="12" fill="#EAE0D2" text-anchor="middle" letter-spacing="3">CLOSEUP: SOLID BRASS ARCHITECTURAL HARDWARE</text>
</svg>`;
fs.writeFileSync(path.join(outDir, 'detail-hardware.svg'), detailHardwareSvg, 'utf-8');

// Detail 3: Timber Grain & Hand-Rubbed Finish Closeup
const detailGrainSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="richGrain" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3A2417"/>
      <stop offset="30%" stop-color="#5E3C27"/>
      <stop offset="70%" stop-color="#482D1C"/>
      <stop offset="100%" stop-color="#3A2417"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#richGrain)"/>
  ${Array.from({ length: 40 }).map((_, i) => `
    <line x1="${i * 15}" y1="0" x2="${i * 15 + 10}" y2="600" stroke="#25150C" stroke-width="${(i % 3 === 0) ? 2.5 : 1}" opacity="0.45"/>
    <line x1="${i * 15 + 2}" y1="0" x2="${i * 15 + 12}" y2="600" stroke="#8A5C3C" stroke-width="0.8" opacity="0.35"/>
  `).join('')}
  <!-- Diagonal Light Sheen -->
  <polygon points="0,0 200,0 600,400 600,600" fill="#FFFFFF" opacity="0.06"/>
  <text x="300" y="550" font-family="'Inter', sans-serif" font-size="12" fill="#EAE0D2" text-anchor="middle" letter-spacing="3">CLOSEUP: SEASONED TEAK TIMBER GRAIN & SATIN FINISH</text>
</svg>`;
fs.writeFileSync(path.join(outDir, 'detail-grain.svg'), detailGrainSvg, 'utf-8');

console.log('Generated detail SVGs successfully.');
