import fs from 'fs';
import path from 'path';

const outDir = 'C:/aspireai/aangan-doors/public/images';

const doorConfigs = [
  // Main Entrance Doors
  {
    id: 'door-entrance-1',
    title: 'Royal Heritage Entrance',
    tone1: '#2A1810',
    tone2: '#4A2E1F',
    accent: '#C5A059',
    type: 'entrance',
    pattern: 'arch-panels'
  },
  {
    id: 'door-entrance-2',
    title: 'Modern Teak Entrance',
    tone1: '#3D2619',
    tone2: '#5C3D2B',
    accent: '#B89255',
    type: 'entrance',
    pattern: 'horizontal-slats'
  },
  {
    id: 'door-entrance-3',
    title: 'Grandwood Grand Entrance',
    tone1: '#1F140E',
    tone2: '#3B2317',
    accent: '#D4AF37',
    type: 'entrance',
    pattern: 'double-arch'
  },
  {
    id: 'door-entrance-4',
    title: 'Signature Walnut Heavy Door',
    tone1: '#261C14',
    tone2: '#443224',
    accent: '#A98255',
    type: 'entrance',
    pattern: 'coffered-panel'
  },

  // CNC Designer Doors
  {
    id: 'door-cnc-1',
    title: 'Imperial Carve CNC',
    tone1: '#322017',
    tone2: '#523727',
    accent: '#E6C280',
    type: 'cnc',
    pattern: 'cnc-radial'
  },
  {
    id: 'door-cnc-2',
    title: 'Geometric Elegance CNC',
    tone1: '#241B15',
    tone2: '#453326',
    accent: '#C9A364',
    type: 'cnc',
    pattern: 'cnc-chevron'
  },
  {
    id: 'door-cnc-3',
    title: 'Royal Jali Lattice',
    tone1: '#2D1F18',
    tone2: '#4C3529',
    accent: '#D9B472',
    type: 'cnc',
    pattern: 'cnc-lattice'
  },
  {
    id: 'door-cnc-4',
    title: 'Precision Grid Modern CNC',
    tone1: '#1E1612',
    tone2: '#3D2D23',
    accent: '#B08850',
    type: 'cnc',
    pattern: 'cnc-grid'
  },

  // Interior Doors
  {
    id: 'door-interior-1',
    title: 'Classic Panel Interior',
    tone1: '#4A3428',
    tone2: '#684D3B',
    accent: '#9C7A52',
    type: 'interior',
    pattern: 'four-panel'
  },
  {
    id: 'door-interior-2',
    title: 'Minimal Oak Flush Door',
    tone1: '#543D2C',
    tone2: '#75563E',
    accent: '#8C6C47',
    type: 'interior',
    pattern: 'vertical-minimal'
  },
  {
    id: 'door-interior-3',
    title: 'Contemporary Lines Interior',
    tone1: '#3E2D23',
    tone2: '#5E4436',
    accent: '#A88358',
    type: 'interior',
    pattern: 'asymmetric-grooves'
  },
  {
    id: 'door-interior-4',
    title: 'Classic Teak Panel Interior',
    tone1: '#463124',
    tone2: '#634735',
    accent: '#BA9462',
    type: 'interior',
    pattern: 'six-panel'
  },

  // Traditional Doors
  {
    id: 'door-traditional-1',
    title: 'Floral Craft Traditional Door',
    tone1: '#231610',
    tone2: '#3E281D',
    accent: '#D1AC68',
    type: 'traditional',
    pattern: 'floral-mandala'
  },
  {
    id: 'door-traditional-2',
    title: 'Heritage Double Door',
    tone1: '#20130C',
    tone2: '#3A2416',
    accent: '#C59E56',
    type: 'traditional',
    pattern: 'temple-double'
  },
  {
    id: 'door-traditional-3',
    title: 'Ornate Tradition Door',
    tone1: '#2B1A12',
    tone2: '#472E20',
    accent: '#DEB777',
    type: 'traditional',
    pattern: 'traditional-brass'
  }
];

function generateDoorSvg(cfg) {
  let innerDecoration = '';

  if (cfg.pattern === 'arch-panels') {
    innerDecoration = `
      <rect x="140" y="130" width="320" height="290" rx="8" fill="#1C120D" stroke="${cfg.accent}" stroke-width="2.5" />
      <path d="M 170 370 Q 300 160 430 370" fill="none" stroke="${cfg.accent}" stroke-width="3" opacity="0.8"/>
      <circle cx="300" cy="275" r="45" fill="none" stroke="${cfg.accent}" stroke-width="2.5" />
      <circle cx="300" cy="275" r="20" fill="${cfg.accent}" opacity="0.4" />
      
      <line x1="120" y1="455" x2="480" y2="455" stroke="${cfg.accent}" stroke-width="3" />
      
      <rect x="140" y="490" width="320" height="310" rx="4" fill="#1C120D" stroke="${cfg.accent}" stroke-width="2.5" />
      <line x1="200" y1="520" x2="200" y2="770" stroke="${cfg.accent}" stroke-width="2" opacity="0.5"/>
      <line x1="260" y1="520" x2="260" y2="770" stroke="${cfg.accent}" stroke-width="2" opacity="0.5"/>
      <line x1="300" y1="520" x2="300" y2="770" stroke="${cfg.accent}" stroke-width="3.5" opacity="0.9"/>
      <line x1="340" y1="520" x2="340" y2="770" stroke="${cfg.accent}" stroke-width="2" opacity="0.5"/>
      <line x1="400" y1="520" x2="400" y2="770" stroke="${cfg.accent}" stroke-width="2" opacity="0.5"/>
    `;
  } else if (cfg.pattern === 'horizontal-slats') {
    let slats = '';
    for (let y = 140; y < 800; y += 38) {
      slats += `<rect x="135" y="${y}" width="330" height="26" rx="2" fill="#2E1C13" stroke="${cfg.accent}" stroke-width="1.2" opacity="0.85"/>
      <line x1="140" y1="${y+13}" x2="460" y2="${y+13}" stroke="${cfg.accent}" stroke-width="0.8" opacity="0.4"/>`;
    }
    innerDecoration = slats + `<rect x="430" y="380" width="18" height="150" rx="4" fill="${cfg.accent}" opacity="0.95"/>`;
  } else if (cfg.pattern === 'double-arch') {
    innerDecoration = `
      <!-- Left Door Half -->
      <rect x="120" y="90" width="175" height="745" fill="#291810" stroke="${cfg.accent}" stroke-width="2"/>
      <rect x="140" y="130" width="135" height="300" rx="4" fill="#1A100B" stroke="${cfg.accent}" stroke-width="1.5"/>
      <circle cx="207" cy="280" r="35" fill="none" stroke="${cfg.accent}" stroke-width="2"/>
      <rect x="140" y="470" width="135" height="330" rx="4" fill="#1A100B" stroke="${cfg.accent}" stroke-width="1.5"/>
      
      <!-- Right Door Half -->
      <rect x="305" y="90" width="175" height="745" fill="#291810" stroke="${cfg.accent}" stroke-width="2"/>
      <rect x="325" y="130" width="135" height="300" rx="4" fill="#1A100B" stroke="${cfg.accent}" stroke-width="1.5"/>
      <circle cx="392" cy="280" r="35" fill="none" stroke="${cfg.accent}" stroke-width="2"/>
      <rect x="325" y="470" width="135" height="330" rx="4" fill="#1A100B" stroke="${cfg.accent}" stroke-width="1.5"/>
      
      <!-- Twin Brass Handles -->
      <rect x="278" y="440" width="12" height="80" rx="3" fill="${cfg.accent}"/>
      <rect x="310" y="440" width="12" height="80" rx="3" fill="${cfg.accent}"/>
    `;
  } else if (cfg.pattern === 'coffered-panel') {
    innerDecoration = `
      <rect x="135" y="130" width="330" height="200" rx="4" fill="#1E140E" stroke="${cfg.accent}" stroke-width="2.5"/>
      <rect x="160" y="155" width="280" height="150" rx="2" fill="#2C1D15" stroke="${cfg.accent}" stroke-width="1.5" stroke-dasharray="4,4"/>
      
      <rect x="135" y="360" width="330" height="200" rx="4" fill="#1E140E" stroke="${cfg.accent}" stroke-width="2.5"/>
      <rect x="160" y="385" width="280" height="150" rx="2" fill="#2C1D15" stroke="${cfg.accent}" stroke-width="1.5" stroke-dasharray="4,4"/>
      
      <rect x="135" y="590" width="330" height="200" rx="4" fill="#1E140E" stroke="${cfg.accent}" stroke-width="2.5"/>
      <rect x="160" y="615" width="280" height="150" rx="2" fill="#2C1D15" stroke="${cfg.accent}" stroke-width="1.5" stroke-dasharray="4,4"/>
    `;
  } else if (cfg.pattern === 'cnc-radial') {
    innerDecoration = `
      <rect x="130" y="120" width="340" height="680" rx="6" fill="#21150F" stroke="${cfg.accent}" stroke-width="2"/>
      <!-- CNC Intricate Rosette & Radials -->
      <circle cx="300" cy="460" r="130" fill="none" stroke="${cfg.accent}" stroke-width="3"/>
      <circle cx="300" cy="460" r="90" fill="none" stroke="${cfg.accent}" stroke-width="2" stroke-dasharray="8,6"/>
      <circle cx="300" cy="460" r="50" fill="none" stroke="${cfg.accent}" stroke-width="2.5"/>
      <circle cx="300" cy="460" r="18" fill="${cfg.accent}"/>
      <!-- Carved rays -->
      <line x1="300" y1="300" x2="300" y2="620" stroke="${cfg.accent}" stroke-width="2" opacity="0.7"/>
      <line x1="140" y1="460" x2="460" y2="460" stroke="${cfg.accent}" stroke-width="2" opacity="0.7"/>
      <line x1="187" y1="347" x2="413" y2="573" stroke="${cfg.accent}" stroke-width="2" opacity="0.7"/>
      <line x1="413" y1="347" x2="187" y2="573" stroke="${cfg.accent}" stroke-width="2" opacity="0.7"/>
      <!-- CNC Precision Label -->
      <text x="300" y="740" font-family="'Inter', sans-serif" font-size="11" fill="${cfg.accent}" letter-spacing="4" text-anchor="middle">PRECISION CNC CARVED</text>
    `;
  } else if (cfg.pattern === 'cnc-chevron') {
    let chevrons = '';
    for (let y = 160; y < 760; y += 75) {
      chevrons += `<path d="M 160 ${y+40} L 300 ${y} L 440 ${y+40}" fill="none" stroke="${cfg.accent}" stroke-width="3.5" opacity="0.8"/>
      <path d="M 160 ${y+55} L 300 ${y+15} L 440 ${y+55}" fill="none" stroke="${cfg.accent}" stroke-width="1.5" opacity="0.4"/>`;
    }
    innerDecoration = `
      <rect x="130" y="115" width="340" height="690" rx="4" fill="#1B120D" stroke="${cfg.accent}" stroke-width="2"/>
      ${chevrons}
    `;
  } else if (cfg.pattern === 'cnc-lattice') {
    innerDecoration = `
      <rect x="130" y="120" width="340" height="400" rx="6" fill="#1C120C" stroke="${cfg.accent}" stroke-width="2.5"/>
      <!-- Jali lattice pattern -->
      <pattern id="jaliPat_${cfg.id}" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 0 20 L 20 0 L 40 20 L 20 40 Z" fill="none" stroke="${cfg.accent}" stroke-width="2"/>
        <circle cx="20" cy="20" r="4" fill="${cfg.accent}" opacity="0.7"/>
      </pattern>
      <rect x="150" y="140" width="300" height="360" fill="url(#jaliPat_${cfg.id})"/>
      
      <rect x="130" y="550" width="340" height="250" rx="4" fill="#241710" stroke="${cfg.accent}" stroke-width="2"/>
      <line x1="200" y1="580" x2="200" y2="770" stroke="${cfg.accent}" stroke-width="2" opacity="0.5"/>
      <line x1="300" y1="580" x2="300" y2="770" stroke="${cfg.accent}" stroke-width="3" opacity="0.8"/>
      <line x1="400" y1="580" x2="400" y2="770" stroke="${cfg.accent}" stroke-width="2" opacity="0.5"/>
    `;
  } else if (cfg.pattern === 'cnc-grid') {
    innerDecoration = `
      <rect x="130" y="115" width="340" height="690" rx="4" fill="#1B130E" stroke="${cfg.accent}" stroke-width="2"/>
      <!-- Precision modern grid -->
      <line x1="240" y1="115" x2="240" y2="805" stroke="${cfg.accent}" stroke-width="2.5" opacity="0.8"/>
      <line x1="360" y1="115" x2="360" y2="805" stroke="${cfg.accent}" stroke-width="2.5" opacity="0.8"/>
      <line x1="130" y1="280" x2="470" y2="280" stroke="${cfg.accent}" stroke-width="2.5" opacity="0.8"/>
      <line x1="130" y1="460" x2="470" y2="460" stroke="${cfg.accent}" stroke-width="2.5" opacity="0.8"/>
      <line x1="130" y1="640" x2="470" y2="640" stroke="${cfg.accent}" stroke-width="2.5" opacity="0.8"/>
      
      <rect x="160" y="150" width="50" height="100" fill="${cfg.accent}" opacity="0.15"/>
      <rect x="270" y="320" width="60" height="100" fill="${cfg.accent}" opacity="0.2"/>
      <rect x="390" y="500" width="50" height="100" fill="${cfg.accent}" opacity="0.15"/>
    `;
  } else if (cfg.pattern === 'four-panel') {
    innerDecoration = `
      <rect x="140" y="120" width="145" height="310" rx="4" fill="#2A1B14" stroke="${cfg.accent}" stroke-width="2"/>
      <rect x="315" y="120" width="145" height="310" rx="4" fill="#2A1B14" stroke="${cfg.accent}" stroke-width="2"/>
      
      <rect x="140" y="470" width="145" height="330" rx="4" fill="#2A1B14" stroke="${cfg.accent}" stroke-width="2"/>
      <rect x="315" y="470" width="145" height="330" rx="4" fill="#2A1B14" stroke="${cfg.accent}" stroke-width="2"/>
    `;
  } else if (cfg.pattern === 'vertical-minimal') {
    innerDecoration = `
      <line x1="220" y1="80" x2="220" y2="850" stroke="${cfg.accent}" stroke-width="3" opacity="0.75"/>
      <line x1="228" y1="80" x2="228" y2="850" stroke="#120B08" stroke-width="2" opacity="0.9"/>
      <rect x="440" y="420" width="16" height="120" rx="3" fill="${cfg.accent}"/>
    `;
  } else if (cfg.pattern === 'asymmetric-grooves') {
    innerDecoration = `
      <rect x="120" y="90" width="360" height="740" fill="#221711"/>
      <line x1="170" y1="90" x2="170" y2="830" stroke="${cfg.accent}" stroke-width="2" opacity="0.8"/>
      <line x1="200" y1="90" x2="200" y2="830" stroke="${cfg.accent}" stroke-width="4" opacity="0.9"/>
      <line x1="220" y1="90" x2="220" y2="830" stroke="${cfg.accent}" stroke-width="1.5" opacity="0.5"/>
      <line x1="380" y1="90" x2="380" y2="830" stroke="${cfg.accent}" stroke-width="2" opacity="0.6"/>
    `;
  } else if (cfg.pattern === 'six-panel') {
    innerDecoration = `
      <rect x="140" y="120" width="145" height="190" rx="3" fill="#281A12" stroke="${cfg.accent}" stroke-width="2"/>
      <rect x="315" y="120" width="145" height="190" rx="3" fill="#281A12" stroke="${cfg.accent}" stroke-width="2"/>
      <rect x="140" y="340" width="145" height="230" rx="3" fill="#281A12" stroke="${cfg.accent}" stroke-width="2"/>
      <rect x="315" y="340" width="145" height="230" rx="3" fill="#281A12" stroke="${cfg.accent}" stroke-width="2"/>
      <rect x="140" y="600" width="145" height="200" rx="3" fill="#281A12" stroke="${cfg.accent}" stroke-width="2"/>
      <rect x="315" y="600" width="145" height="200" rx="3" fill="#281A12" stroke="${cfg.accent}" stroke-width="2"/>
    `;
  } else if (cfg.pattern === 'floral-mandala') {
    innerDecoration = `
      <rect x="130" y="120" width="340" height="680" rx="6" fill="#1C110B" stroke="${cfg.accent}" stroke-width="3"/>
      <!-- Ornate Floral Mandala & Pillars -->
      <circle cx="300" cy="300" r="100" fill="none" stroke="${cfg.accent}" stroke-width="2.5"/>
      <circle cx="300" cy="300" r="70" fill="none" stroke="${cfg.accent}" stroke-width="2" stroke-dasharray="6,4"/>
      <circle cx="300" cy="300" r="40" fill="none" stroke="${cfg.accent}" stroke-width="2"/>
      <circle cx="300" cy="300" r="15" fill="${cfg.accent}"/>
      
      <!-- Arch frame -->
      <path d="M 150 450 Q 300 370 450 450" fill="none" stroke="${cfg.accent}" stroke-width="2"/>
      <circle cx="300" cy="620" r="80" fill="none" stroke="${cfg.accent}" stroke-width="2.5"/>
      <circle cx="300" cy="620" r="50" fill="none" stroke="${cfg.accent}" stroke-width="1.5" stroke-dasharray="5,3"/>
      <circle cx="300" cy="620" r="20" fill="${cfg.accent}" opacity="0.6"/>
    `;
  } else if (cfg.pattern === 'temple-double') {
    innerDecoration = `
      <!-- Double temple style doors -->
      <rect x="120" y="90" width="175" height="740" fill="#20120B" stroke="${cfg.accent}" stroke-width="2.5"/>
      <rect x="305" y="90" width="175" height="740" fill="#20120B" stroke="${cfg.accent}" stroke-width="2.5"/>
      
      <!-- Studded brass bosses -->
      ${[160, 260, 360, 460, 560, 660, 760].map(y => `
        <circle cx="160" cy="${y}" r="8" fill="${cfg.accent}" stroke="#100805" stroke-width="1"/>
        <circle cx="250" cy="${y}" r="8" fill="${cfg.accent}" stroke="#100805" stroke-width="1"/>
        <circle cx="350" cy="${y}" r="8" fill="${cfg.accent}" stroke="#100805" stroke-width="1"/>
        <circle cx="440" cy="${y}" r="8" fill="${cfg.accent}" stroke="#100805" stroke-width="1"/>
      `).join('')}
      <!-- Traditional lion ring pull / handles -->
      <circle cx="280" cy="460" r="16" fill="none" stroke="${cfg.accent}" stroke-width="4"/>
      <circle cx="320" cy="460" r="16" fill="none" stroke="${cfg.accent}" stroke-width="4"/>
    `;
  } else if (cfg.pattern === 'traditional-brass') {
    innerDecoration = `
      <rect x="130" y="115" width="340" height="690" rx="4" fill="#23140D" stroke="${cfg.accent}" stroke-width="2.5"/>
      <!-- Traditional Inlay Borders -->
      <rect x="150" y="135" width="300" height="650" rx="2" fill="none" stroke="${cfg.accent}" stroke-width="1.5" stroke-dasharray="8,6"/>
      <circle cx="300" cy="270" r="60" fill="none" stroke="${cfg.accent}" stroke-width="2.5"/>
      <polygon points="300,230 335,290 265,290" fill="none" stroke="${cfg.accent}" stroke-width="2"/>
      <polygon points="300,310 335,250 265,250" fill="none" stroke="${cfg.accent}" stroke-width="2"/>
      
      <circle cx="300" cy="580" r="60" fill="none" stroke="${cfg.accent}" stroke-width="2.5"/>
      <polygon points="300,540 335,600 265,600" fill="none" stroke="${cfg.accent}" stroke-width="2"/>
      <polygon points="300,620 335,560 265,560" fill="none" stroke="${cfg.accent}" stroke-width="2"/>
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="100%" height="100%">
  <defs>
    <linearGradient id="wallBg_${cfg.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2ECE1"/>
      <stop offset="100%" stop-color="#E2D6C5"/>
    </linearGradient>
    <linearGradient id="woodGrad_${cfg.id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${cfg.tone1}"/>
      <stop offset="40%" stop-color="${cfg.tone2}"/>
      <stop offset="70%" stop-color="${cfg.tone1}"/>
      <stop offset="100%" stop-color="${cfg.tone2}"/>
    </linearGradient>
    <filter id="shadow_${cfg.id}" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="5" stdDeviation="5" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Wall Background -->
  <rect width="600" height="900" fill="url(#wallBg_${cfg.id})"/>
  
  <!-- Architectural Portal Frame -->
  <rect x="70" y="50" width="460" height="800" rx="4" fill="#CBBBA6" stroke="#B8A790" stroke-width="5"/>
  <rect x="85" y="65" width="430" height="785" fill="#18110D"/>

  <!-- Door Outer Frame -->
  <rect x="100" y="80" width="400" height="770" fill="url(#woodGrad_${cfg.id})" stroke="#120A06" stroke-width="4" filter="url(#shadow_${cfg.id})"/>

  ${innerDecoration}

  <!-- Brass Door Handle (unless twin/double handles already present) -->
  ${cfg.pattern.includes('double') ? '' : `
    <rect x="445" y="440" width="22" height="110" rx="4" fill="${cfg.accent}" stroke="#3D2910" stroke-width="1.5"/>
    <circle cx="456" cy="465" r="4" fill="#1A110D"/>
    <path d="M 456 480 L 456 525" stroke="#1A110D" stroke-width="4" stroke-linecap="round"/>
  `}

  <!-- Threshold Base -->
  <rect x="60" y="850" width="480" height="25" fill="#2E1C13" stroke="#150B06" stroke-width="2"/>
  
  <!-- Label -->
  <text x="300" y="878" font-family="'Playfair Display', serif" font-size="11" fill="#77716A" text-anchor="middle" letter-spacing="3">AANGAN DOORS • ${cfg.title.toUpperCase()}</text>
</svg>`;
}

// Generate all door SVGs
doorConfigs.forEach(cfg => {
  const filePath = path.join(outDir, `${cfg.id}.svg`);
  fs.writeFileSync(filePath, generateDoorSvg(cfg), 'utf-8');
});

console.log(`Generated ${doorConfigs.length} door SVGs in ${outDir}`);

// Generate Production Process SVGs
const productionSteps = [
  { id: 'production-cnc', title: 'CNC Precision Routing Machine', subtitle: 'Automated 3D Router Head & Wood Panel' },
  { id: 'production-workshop', title: 'Aangan Craft Workshop', subtitle: 'Solid Timber Preparation & Joinery' },
  { id: 'production-carving', title: 'Intricate Carving Details', subtitle: 'High-Precision Relief & Contour Work' },
  { id: 'production-finishing', title: 'Polishing & Finishing', subtitle: 'Hand-Rubbed Oils & Protective Topcoats' },
  { id: 'production-inspection', title: 'Quality & Fitment Inspection', subtitle: 'Dimensional Accuracy & Moisture Testing' },
  { id: 'hero-door', title: 'AANGAN DOORS Digital Showroom', subtitle: 'Architectural Timber Entrance' }
];

productionSteps.forEach(step => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_${step.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D1F18"/>
      <stop offset="60%" stop-color="#3D2B22"/>
      <stop offset="100%" stop-color="#1F140E"/>
    </linearGradient>
    <linearGradient id="metal_${step.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6B7280"/>
      <stop offset="50%" stop-color="#4B5563"/>
      <stop offset="100%" stop-color="#374151"/>
    </linearGradient>
    <linearGradient id="gold_${step.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#A98255"/>
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bg_${step.id})"/>
  
  <!-- Subtle architectural grid lines -->
  <line x1="50" y1="50" x2="750" y2="50" stroke="#A98255" stroke-width="0.75" opacity="0.3"/>
  <line x1="50" y1="550" x2="750" y2="550" stroke="#A98255" stroke-width="0.75" opacity="0.3"/>
  <line x1="50" y1="50" x2="50" y2="550" stroke="#A98255" stroke-width="0.75" opacity="0.3"/>
  <line x1="750" y1="50" x2="750" y2="550" stroke="#A98255" stroke-width="0.75" opacity="0.3"/>

  <!-- Stylized Industrial / Woodcraft illustration -->
  <rect x="150" y="140" width="500" height="300" rx="8" fill="#1A110D" stroke="#A98255" stroke-width="2"/>
  
  <!-- Wood grain slats inside table -->
  <rect x="180" y="170" width="440" height="240" rx="4" fill="#3A271D" stroke="#251A16" stroke-width="2"/>
  <line x1="220" y1="170" x2="220" y2="410" stroke="#A98255" stroke-width="1.5" opacity="0.4"/>
  <line x1="280" y1="170" x2="280" y2="410" stroke="#A98255" stroke-width="2.5" opacity="0.7"/>
  <line x1="340" y1="170" x2="340" y2="410" stroke="#A98255" stroke-width="1.5" opacity="0.4"/>
  <line x1="400" y1="170" x2="400" y2="410" stroke="#A98255" stroke-width="3" opacity="0.9"/>
  <line x1="460" y1="170" x2="460" y2="410" stroke="#A98255" stroke-width="1.5" opacity="0.4"/>
  <line x1="520" y1="170" x2="520" y2="410" stroke="#A98255" stroke-width="2.5" opacity="0.7"/>
  <line x1="580" y1="170" x2="580" y2="410" stroke="#A98255" stroke-width="1.5" opacity="0.4"/>

  <!-- CNC Head / Precision Gantry beam -->
  <rect x="250" y="100" width="300" height="30" rx="4" fill="url(#metal_${step.id})" stroke="#9CA3AF" stroke-width="1.5"/>
  <rect x="375" y="130" width="50" height="110" rx="2" fill="url(#gold_${step.id})" stroke="#374151" stroke-width="2"/>
  <!-- Router bit -->
  <polygon points="400,265 390,240 410,240" fill="#E5E7EB"/>
  <circle cx="400" cy="275" r="5" fill="#F59E0B" opacity="0.8"/>
  <circle cx="400" cy="275" r="18" fill="none" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.6"/>

  <!-- Typography overlay -->
  <text x="400" y="490" font-family="'Playfair Display', serif" font-size="24" fill="#F7F3EC" text-anchor="middle" font-weight="600">${step.title}</text>
  <text x="400" y="525" font-family="'Inter', sans-serif" font-size="13" fill="#A98255" text-anchor="middle" letter-spacing="2">${step.subtitle.toUpperCase()}</text>
</svg>`;

  fs.writeFileSync(path.join(outDir, `${step.id}.svg`), svg, 'utf-8');
});

console.log(`Generated all production SVGs`);
