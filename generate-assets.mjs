import fs from 'fs';
import path from 'path';

const outDir = 'C:/aspireai/aangan-doors/public/images';

// Helper for wood grain filter & textures
function getWoodDefs(id, baseColor, highlightColor, darkColor, accentColor = '#A98255') {
  return `
    <defs>
      <!-- Wood Grain Gradient -->
      <linearGradient id="woodGrad_${id}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${darkColor}" />
        <stop offset="25%" stop-color="${baseColor}" />
        <stop offset="50%" stop-color="${highlightColor}" />
        <stop offset="75%" stop-color="${baseColor}" />
        <stop offset="100%" stop-color="${darkColor}" />
      </linearGradient>

      <!-- Vertical Grain Texture Pattern -->
      <pattern id="grain_${id}" width="40" height="200" patternUnits="userSpaceOnUse">
        <line x1="8" y1="0" x2="8" y2="200" stroke="${darkColor}" stroke-width="0.8" opacity="0.35"/>
        <line x1="16" y1="0" x2="16" y2="200" stroke="${highlightColor}" stroke-width="0.6" opacity="0.4"/>
        <line x1="25" y1="0" x2="25" y2="200" stroke="${darkColor}" stroke-width="1.2" opacity="0.3"/>
        <line x1="33" y1="0" x2="33" y2="200" stroke="${highlightColor}" stroke-width="0.5" opacity="0.3"/>
      </pattern>

      <!-- 3D Bevel Shadow Filter -->
      <filter id="bevel_${id}" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#050302" flood-opacity="0.55"/>
      </filter>

      <!-- Recessed Panel Shadow -->
      <filter id="inset_${id}" x="-5%" y="-5%" width="110%" height="110%">
        <feOffset dx="2" dy="3"/>
        <feGaussianBlur stdDeviation="3" result="offset-blur"/>
        <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
        <feFlood flood-color="#000000" flood-opacity="0.6" result="color"/>
        <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
        <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
      </filter>

      <!-- Brass Hardware Metallic Gradient -->
      <linearGradient id="brass_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EED58E" />
        <stop offset="40%" stop-color="#C5A059" />
        <stop offset="70%" stop-color="#8F6B2E" />
        <stop offset="100%" stop-color="#D4AF37" />
      </linearGradient>
    </defs>
  `;
}

// Generate the 15 specific door SVGs
const doorModels = [
  // 1. AD-001 Royal Heritage (Main Entrance)
  {
    fileName: 'door-entrance-1.svg',
    name: 'AD-001 Royal Heritage',
    category: 'Main Entrance Door',
    woodName: 'Seasoned Teak Wood',
    base: '#3A2417',
    highlight: '#543825',
    dark: '#22150D',
    accent: '#D4AF37',
    render: (id) => `
      <!-- Sandstone Outer Arch Wall -->
      <rect width="600" height="900" fill="#EAE0D2"/>
      <path d="M 60 850 L 60 300 Q 300 60 540 300 L 540 850 Z" fill="#CBBBA6" stroke="#B3A28B" stroke-width="12"/>
      <path d="M 78 850 L 78 310 Q 300 85 522 310 L 522 850 Z" fill="#1C120C"/>

      <!-- Door Slab -->
      <path d="M 90 850 L 90 320 Q 300 100 510 320 L 510 850 Z" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <path d="M 90 850 L 90 320 Q 300 100 510 320 L 510 850 Z" fill="url(#grain_${id})"/>

      <!-- Top Arched Carved Panel -->
      <path d="M 130 350 Q 300 160 470 350 L 470 460 L 130 460 Z" fill="#25150C" stroke="#C5A059" stroke-width="3" filter="url(#bevel_${id})"/>
      <!-- Classical Lotus Medallion Carving -->
      <circle cx="300" cy="330" r="55" fill="none" stroke="#C5A059" stroke-width="3"/>
      <circle cx="300" cy="330" r="35" fill="none" stroke="#C5A059" stroke-width="1.8" stroke-dasharray="6,4"/>
      <circle cx="300" cy="330" r="14" fill="#C5A059"/>
      <!-- Radial Petals -->
      ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => `
        <line x1="300" y1="330" x2="${300 + 48 * Math.cos(deg * Math.PI / 180)}" y2="${330 + 48 * Math.sin(deg * Math.PI / 180)}" stroke="#C5A059" stroke-width="1.5" opacity="0.8"/>
      `).join('')}

      <!-- Center Cross Rail -->
      <rect x="100" y="480" width="400" height="20" fill="#23140A" stroke="#C5A059" stroke-width="1.5"/>

      <!-- Bottom Recessed Panels -->
      <rect x="130" y="520" width="155" height="300" rx="4" fill="#201108" stroke="#C5A059" stroke-width="2.5" filter="url(#bevel_${id})"/>
      <line x1="165" y1="540" x2="165" y2="800" stroke="#C5A059" stroke-width="2" opacity="0.4"/>
      <line x1="205" y1="540" x2="205" y2="800" stroke="#C5A059" stroke-width="3" opacity="0.7"/>
      <line x1="250" y1="540" x2="250" y2="800" stroke="#C5A059" stroke-width="2" opacity="0.4"/>

      <rect x="315" y="520" width="155" height="300" rx="4" fill="#201108" stroke="#C5A059" stroke-width="2.5" filter="url(#bevel_${id})"/>
      <line x1="350" y1="540" x2="350" y2="800" stroke="#C5A059" stroke-width="2" opacity="0.4"/>
      <line x1="395" y1="540" x2="395" y2="800" stroke="#C5A059" stroke-width="3" opacity="0.7"/>
      <line x1="435" y1="540" x2="435" y2="800" stroke="#C5A059" stroke-width="2" opacity="0.4"/>

      <!-- Heavy Brass Handle Plate & Lever -->
      <rect x="450" y="470" width="22" height="110" rx="4" fill="url(#brass_${id})" stroke="#664614" stroke-width="1.5" filter="url(#bevel_${id})"/>
      <circle cx="461" cy="495" r="4.5" fill="#1C120C"/>
      <path d="M 461 510 L 461 555" stroke="#1C120C" stroke-width="4.5" stroke-linecap="round"/>

      <!-- Threshold -->
      <rect x="50" y="850" width="500" height="30" fill="#2E1C13" stroke="#150B06" stroke-width="2"/>
    `
  },

  // 2. AD-002 Modern Teak (Main Entrance)
  {
    fileName: 'door-entrance-2.svg',
    name: 'AD-002 Modern Teak',
    category: 'Main Entrance Door',
    woodName: 'Golden Teak Wood',
    base: '#5A3D24',
    highlight: '#7C5735',
    dark: '#3A2413',
    accent: '#D4AF37',
    render: (id) => `
      <!-- Modern Concrete/Plaster Frame -->
      <rect width="600" height="900" fill="#EAE5DC"/>
      <rect x="70" y="50" width="460" height="800" fill="#2B2623" stroke="#1E1A17" stroke-width="4"/>

      <!-- Solid Teak Door Leaf -->
      <rect x="85" y="65" width="430" height="785" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <rect x="85" y="65" width="430" height="785" fill="url(#grain_${id})"/>

      <!-- Modern Horizontal Grooved Slats -->
      ${Array.from({ length: 18 }).map((_, i) => {
        const y = 95 + i * 40;
        return `
          <line x1="110" y1="${y}" x2="490" y2="${y}" stroke="#27180D" stroke-width="3"/>
          <line x1="110" y1="${y+1.5}" x2="490" y2="${y+1.5}" stroke="#91673E" stroke-width="1" opacity="0.6"/>
        `;
      }).join('')}

      <!-- Architectural Oversized Vertical Brushed Brass Pull Handle -->
      <rect x="440" y="300" width="16" height="320" rx="3" fill="url(#brass_${id})" filter="url(#bevel_${id})" stroke="#573D15" stroke-width="1.5"/>
      <circle cx="448" cy="330" r="4" fill="#3D2910"/>
      <circle cx="448" cy="590" r="4" fill="#3D2910"/>

      <!-- Smart Digital Lock Escutcheon -->
      <rect x="436" y="235" width="24" height="50" rx="4" fill="#1C1815" stroke="#D4AF37" stroke-width="1.5"/>
      <circle cx="448" cy="250" r="5" fill="#33B864" opacity="0.9"/>
      <rect x="442" y="263" width="12" height="14" rx="1" fill="#2B2623"/>

      <!-- Threshold -->
      <rect x="55" y="850" width="490" height="25" fill="#292019" stroke="#120D0A" stroke-width="2"/>
    `
  },

  // 3. AD-003 Imperial Carve (CNC Designer)
  {
    fileName: 'door-cnc-1.svg',
    name: 'AD-003 Imperial Carve',
    category: 'CNC Designer Door',
    woodName: 'Engineered Hardwood / Teak',
    base: '#40291D',
    highlight: '#5D3E2D',
    dark: '#24140C',
    accent: '#C5A059',
    render: (id) => `
      <rect width="600" height="900" fill="#E8DFD5"/>
      <rect x="70" y="50" width="460" height="800" fill="#21150F" stroke="#120A06" stroke-width="5"/>
      <rect x="90" y="70" width="420" height="780" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <rect x="90" y="70" width="420" height="780" fill="url(#grain_${id})"/>

      <!-- Large Center CNC Carved Medallion Panel -->
      <rect x="120" y="110" width="360" height="700" rx="6" fill="#25160E" stroke="#C5A059" stroke-width="2.5" filter="url(#bevel_${id})"/>

      <!-- Multi-tier Rosette & CNC Depth Layers -->
      <circle cx="300" cy="460" r="140" fill="none" stroke="#C5A059" stroke-width="3.5"/>
      <circle cx="300" cy="460" r="115" fill="none" stroke="#C5A059" stroke-width="2" stroke-dasharray="8,6"/>
      <circle cx="300" cy="460" r="90" fill="#1C100A" stroke="#C5A059" stroke-width="3"/>
      <circle cx="300" cy="460" r="60" fill="none" stroke="#C5A059" stroke-width="2.5"/>
      <circle cx="300" cy="460" r="30" fill="#C5A059" opacity="0.9"/>
      <circle cx="300" cy="460" r="10" fill="#1C100A"/>

      <!-- Radiating CNC Chamfer Grooves -->
      ${Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15) * Math.PI / 180;
        return `
          <line x1="${300 + 90 * Math.cos(angle)}" y1="${460 + 90 * Math.sin(angle)}" x2="${300 + 138 * Math.cos(angle)}" y2="${460 + 138 * Math.sin(angle)}" stroke="#C5A059" stroke-width="2.5" opacity="0.85"/>
        `;
      }).join('')}

      <!-- Corner CNC Spandrel Filigree -->
      <path d="M 135 125 L 185 125 Q 135 175 135 225 Z" fill="#C5A059" opacity="0.3"/>
      <path d="M 465 125 L 415 125 Q 465 175 465 225 Z" fill="#C5A059" opacity="0.3"/>
      <path d="M 135 795 L 185 795 Q 135 745 135 695 Z" fill="#C5A059" opacity="0.3"/>
      <path d="M 465 795 L 415 795 Q 465 745 465 695 Z" fill="#C5A059" opacity="0.3"/>

      <!-- Brass Hardware -->
      <rect x="440" y="430" width="20" height="110" rx="3" fill="url(#brass_${id})" filter="url(#bevel_${id})"/>
      <circle cx="450" cy="455" r="4" fill="#1A110D"/>
      <path d="M 450 470 L 450 515" stroke="#1A110D" stroke-width="4" stroke-linecap="round"/>

      <rect x="60" y="850" width="480" height="25" fill="#241710" stroke="#100804" stroke-width="2"/>
    `
  },

  // 4. AD-004 Geometric Elegance (CNC Designer)
  {
    fileName: 'door-cnc-2.svg',
    name: 'AD-004 Geometric Elegance',
    category: 'CNC Designer Door',
    woodName: 'Padauk / Steam Beech',
    base: '#382017',
    highlight: '#523427',
    dark: '#21110B',
    accent: '#D4AF37',
    render: (id) => `
      <rect width="600" height="900" fill="#EAE2D8"/>
      <rect x="70" y="50" width="460" height="800" fill="#1C100B" stroke="#0E0603" stroke-width="4"/>
      <rect x="90" y="70" width="420" height="780" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <rect x="90" y="70" width="420" height="780" fill="url(#grain_${id})"/>

      <!-- Precision 3D Ascending Chevron Cuts -->
      ${Array.from({ length: 9 }).map((_, i) => {
        const y = 140 + i * 75;
        return `
          <!-- Shaded Facets -->
          <polygon points="120,${y+50} 300,${y} 300,${y+35} 120,${y+85}" fill="#1D0E08" opacity="0.8"/>
          <polygon points="480,${y+50} 300,${y} 300,${y+35} 480,${y+85}" fill="#543324" opacity="0.9"/>
          <polyline points="120,${y+50} 300,${y} 480,${y+50}" fill="none" stroke="#D4AF37" stroke-width="2.5" opacity="0.85"/>
        `;
      }).join('')}

      <!-- Center spine highlight line -->
      <line x1="300" y1="120" x2="300" y2="800" stroke="#D4AF37" stroke-width="3" opacity="0.9"/>

      <!-- Modern Brass Lock & Handle -->
      <rect x="445" y="420" width="18" height="120" rx="3" fill="url(#brass_${id})" filter="url(#bevel_${id})"/>
      <circle cx="454" cy="445" r="4" fill="#140905"/>
      <path d="M 454 460 L 454 515" stroke="#140905" stroke-width="4" stroke-linecap="round"/>

      <rect x="60" y="850" width="480" height="25" fill="#24140D" stroke="#0D0603" stroke-width="2"/>
    `
  },

  // 5. AD-005 Classic Panel (Interior Door)
  {
    fileName: 'door-interior-1.svg',
    name: 'AD-005 Classic Panel',
    category: 'Interior Door',
    woodName: 'Kiln-Dried White Oak & Teak',
    base: '#5E432F',
    highlight: '#7A5B42',
    dark: '#3E2A1C',
    accent: '#B08850',
    render: (id) => `
      <!-- Interior Wall Soft Paint -->
      <rect width="600" height="900" fill="#F4EFEA"/>
      <!-- Architrave Casing -->
      <rect x="80" y="60" width="440" height="800" fill="#E0D3C3" stroke="#C9B8A2" stroke-width="4"/>
      <rect x="95" y="75" width="410" height="785" fill="#271911"/>

      <!-- Door Stile & Rail Frame -->
      <rect x="105" y="85" width="390" height="775" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <rect x="105" y="85" width="390" height="775" fill="url(#grain_${id})"/>

      <!-- 4 Deep Recessed Raised Panels -->
      <!-- Upper Left -->
      <rect x="135" y="125" width="150" height="310" rx="3" fill="#382417" stroke="#9E7848" stroke-width="2" filter="url(#bevel_${id})"/>
      <rect x="155" y="145" width="110" height="270" rx="2" fill="url(#woodGrad_${id})"/>

      <!-- Upper Right -->
      <rect x="315" y="125" width="150" height="310" rx="3" fill="#382417" stroke="#9E7848" stroke-width="2" filter="url(#bevel_${id})"/>
      <rect x="335" y="145" width="110" height="270" rx="2" fill="url(#woodGrad_${id})"/>

      <!-- Lower Left -->
      <rect x="135" y="475" width="150" height="340" rx="3" fill="#382417" stroke="#9E7848" stroke-width="2" filter="url(#bevel_${id})"/>
      <rect x="155" y="495" width="110" height="300" rx="2" fill="url(#woodGrad_${id})"/>

      <!-- Lower Right -->
      <rect x="315" y="475" width="150" height="340" rx="3" fill="#382417" stroke="#9E7848" stroke-width="2" filter="url(#bevel_${id})"/>
      <rect x="335" y="495" width="110" height="300" rx="2" fill="url(#woodGrad_${id})"/>

      <!-- Interior Brushed Lever Handle & Rose -->
      <circle cx="445" cy="455" r="16" fill="url(#brass_${id})" filter="url(#bevel_${id})"/>
      <rect x="425" y="450" width="55" height="10" rx="3" fill="url(#brass_${id})" filter="url(#bevel_${id})"/>

      <rect x="70" y="860" width="460" height="20" fill="#3B261A" stroke="#1A1009" stroke-width="1.5"/>
    `
  },

  // 6. AD-006 Grandwood Entrance (Main Entrance)
  {
    fileName: 'door-entrance-3.svg',
    name: 'AD-006 Grandwood Entrance',
    category: 'Main Entrance Door',
    woodName: 'Solid Teak & Dark Walnut',
    base: '#321E14',
    highlight: '#4F3323',
    dark: '#1C0F08',
    accent: '#D4AF37',
    render: (id) => `
      <rect width="600" height="900" fill="#E6DDD2"/>
      <!-- Grand Granite Portal Surround -->
      <rect x="60" y="40" width="480" height="820" fill="#3D3A37" stroke="#252321" stroke-width="8"/>
      <rect x="80" y="60" width="440" height="800" fill="#140B06"/>

      <!-- Heavy Pivot Door Leaf -->
      <rect x="95" y="75" width="410" height="785" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <rect x="95" y="75" width="410" height="785" fill="url(#grain_${id})"/>

      <!-- Massive Timber Beams / Stacks -->
      ${Array.from({ length: 8 }).map((_, i) => {
        const y = 100 + i * 90;
        return `
          <rect x="120" y="${y}" width="360" height="70" rx="3" fill="#201108" stroke="#D4AF37" stroke-width="1.5" filter="url(#bevel_${id})"/>
          <line x1="135" y1="${y+35}" x2="465" y2="${y+35}" stroke="#D4AF37" stroke-width="1" opacity="0.4"/>
          <!-- Brass Inlay Studs -->
          <circle cx="145" cy="${y+35}" r="4" fill="url(#brass_${id})"/>
          <circle cx="455" cy="${y+35}" r="4" fill="url(#brass_${id})"/>
        `;
      }).join('')}

      <!-- Architectural Full-Length Brass Bar Handle -->
      <rect x="435" y="240" width="18" height="420" rx="4" fill="url(#brass_${id})" filter="url(#bevel_${id})"/>
      <rect x="433" y="270" width="22" height="12" rx="2" fill="#180D06"/>
      <rect x="433" y="618" width="22" height="12" rx="2" fill="#180D06"/>

      <rect x="50" y="860" width="500" height="25" fill="#231710" stroke="#0E0804" stroke-width="2"/>
    `
  },

  // 7. AD-007 Floral Craft (Traditional Door)
  {
    fileName: 'door-traditional-1.svg',
    name: 'AD-007 Floral Craft',
    category: 'Traditional Door',
    woodName: 'Solid Indian Rosewood / Teak',
    base: '#3A1E14',
    highlight: '#573022',
    dark: '#210E07',
    accent: '#D4AF37',
    render: (id) => `
      <rect width="600" height="900" fill="#EAE1D5"/>
      <!-- Sandstone Temple Style Arch -->
      <path d="M 60 850 L 60 320 Q 300 70 540 320 L 540 850 Z" fill="#C4B097" stroke="#A9957D" stroke-width="8"/>
      <path d="M 75 850 L 75 330 Q 300 90 525 330 L 525 850 Z" fill="#180B05"/>

      <!-- Door Slab -->
      <path d="M 90 850 L 90 340 Q 300 110 510 340 L 510 850 Z" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <path d="M 90 850 L 90 340 Q 300 110 510 340 L 510 850 Z" fill="url(#grain_${id})"/>

      <!-- Large Floral Mandala Carving -->
      <circle cx="300" cy="380" r="110" fill="#200E07" stroke="#D4AF37" stroke-width="3" filter="url(#bevel_${id})"/>
      <circle cx="300" cy="380" r="80" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="6,4"/>
      <circle cx="300" cy="380" r="50" fill="none" stroke="#D4AF37" stroke-width="2.5"/>
      <circle cx="300" cy="380" r="20" fill="#D4AF37"/>

      <!-- Floral Petals -->
      ${Array.from({ length: 16 }).map((_, i) => {
        const rad = (i * 22.5) * Math.PI / 180;
        return `
          <ellipse cx="${300 + 65 * Math.cos(rad)}" cy="${380 + 65 * Math.sin(rad)}" rx="16" ry="9" transform="rotate(${i * 22.5}, ${300 + 65 * Math.cos(rad)}, ${380 + 65 * Math.sin(rad)})" fill="#D4AF37" opacity="0.8"/>
        `;
      }).join('')}

      <!-- Bottom Traditional Haveli Carved Arch Panels -->
      <rect x="130" y="530" width="155" height="290" rx="6" fill="#200E07" stroke="#D4AF37" stroke-width="2.5" filter="url(#bevel_${id})"/>
      <path d="M 145 610 Q 207 550 270 610 L 270 800 L 145 800 Z" fill="none" stroke="#D4AF37" stroke-width="2"/>
      <circle cx="207" cy="670" r="28" fill="none" stroke="#D4AF37" stroke-width="2"/>
      <circle cx="207" cy="670" r="8" fill="#D4AF37"/>

      <rect x="315" y="530" width="155" height="290" rx="6" fill="#200E07" stroke="#D4AF37" stroke-width="2.5" filter="url(#bevel_${id})"/>
      <path d="M 330 610 Q 392 550 455 610 L 455 800 L 330 800 Z" fill="none" stroke="#D4AF37" stroke-width="2"/>
      <circle cx="392" cy="670" r="28" fill="none" stroke="#D4AF37" stroke-width="2"/>
      <circle cx="392" cy="670" r="8" fill="#D4AF37"/>

      <!-- Traditional Brass Lion Knocker / Ring -->
      <circle cx="445" cy="485" r="18" fill="none" stroke="url(#brass_${id})" stroke-width="4.5" filter="url(#bevel_${id})"/>
      <circle cx="445" cy="470" r="7" fill="url(#brass_${id})"/>

      <rect x="50" y="850" width="500" height="25" fill="#26140B" stroke="#120803" stroke-width="2"/>
    `
  },

  // 8. AD-008 Minimal Oak (Interior Door)
  {
    fileName: 'door-interior-2.svg',
    name: 'AD-008 Minimal Oak',
    category: 'Interior Door',
    woodName: 'American White Oak',
    base: '#6E523B',
    highlight: '#8D6B4F',
    dark: '#4B3523',
    accent: '#B89255',
    render: (id) => `
      <rect width="600" height="900" fill="#F5F2EC"/>
      <rect x="80" y="60" width="440" height="800" fill="#E8DFD5" stroke="#D3C7B8" stroke-width="3"/>
      <rect x="95" y="75" width="410" height="785" fill="#2B1E15"/>

      <!-- Flush Solid Oak Slab -->
      <rect x="105" y="85" width="390" height="775" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <rect x="105" y="85" width="390" height="775" fill="url(#grain_${id})"/>

      <!-- Architectural Asymmetric Vertical Slat Channel -->
      <rect x="180" y="85" width="8" height="775" fill="#301F14" opacity="0.9"/>
      <line x1="184" y1="85" x2="184" y2="860" stroke="#C5A059" stroke-width="1.5" opacity="0.6"/>

      <!-- Minimal Matte Black / Brushed Brass Handle -->
      <circle cx="440" cy="460" r="14" fill="#201A16"/>
      <rect x="420" y="455" width="60" height="10" rx="3" fill="url(#brass_${id})" filter="url(#bevel_${id})"/>

      <rect x="70" y="860" width="460" height="20" fill="#443021" stroke="#22160D" stroke-width="1.5"/>
    `
  },

  // 9. AD-009 Heritage Double Door (Traditional Door)
  {
    fileName: 'door-traditional-2.svg',
    name: 'AD-009 Heritage Double Door',
    category: 'Traditional Door',
    woodName: 'Heavy Solid Teak Wood',
    base: '#2D180F',
    highlight: '#482B1C',
    dark: '#1A0C06',
    accent: '#D4AF37',
    render: (id) => `
      <rect width="600" height="900" fill="#E5DDD2"/>
      <!-- Monumental Haveli Arch Frame -->
      <path d="M 50 850 L 50 280 Q 300 50 550 280 L 550 850 Z" fill="#4A3428" stroke="#332117" stroke-width="10"/>
      <path d="M 68 850 L 68 290 Q 300 70 532 290 L 532 850 Z" fill="#140904"/>

      <!-- Left Door Leaf -->
      <path d="M 80 850 L 80 300 Q 185 160 295 120 L 295 850 Z" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <path d="M 80 850 L 80 300 Q 185 160 295 120 L 295 850 Z" fill="url(#grain_${id})"/>

      <!-- Right Door Leaf -->
      <path d="M 305 850 L 305 120 Q 415 160 520 300 L 520 850 Z" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <path d="M 305 850 L 305 120 Q 415 160 520 300 L 520 850 Z" fill="url(#grain_${id})"/>

      <!-- Center Overlap Astragal / Molding -->
      <rect x="294" y="110" width="12" height="740" fill="#1A0C06" stroke="#D4AF37" stroke-width="1.5"/>

      <!-- Studded Traditional Brass Bosses (Gulabi Keel) -->
      ${[200, 300, 400, 500, 600, 700, 800].map(y => `
        <circle cx="130" cy="${y}" r="8" fill="url(#brass_${id})" stroke="#120602" stroke-width="1.5" filter="url(#bevel_${id})"/>
        <circle cx="240" cy="${y}" r="8" fill="url(#brass_${id})" stroke="#120602" stroke-width="1.5" filter="url(#bevel_${id})"/>
        <circle cx="360" cy="${y}" r="8" fill="url(#brass_${id})" stroke="#120602" stroke-width="1.5" filter="url(#bevel_${id})"/>
        <circle cx="470" cy="${y}" r="8" fill="url(#brass_${id})" stroke="#120602" stroke-width="1.5" filter="url(#bevel_${id})"/>
      `).join('')}

      <!-- Twin Brass Lion Door Knockers -->
      <circle cx="270" cy="460" r="16" fill="none" stroke="url(#brass_${id})" stroke-width="4.5" filter="url(#bevel_${id})"/>
      <circle cx="270" cy="445" r="7" fill="url(#brass_${id})"/>

      <circle cx="330" cy="460" r="16" fill="none" stroke="url(#brass_${id})" stroke-width="4.5" filter="url(#bevel_${id})"/>
      <circle cx="330" cy="445" r="7" fill="url(#brass_${id})"/>

      <rect x="40" y="850" width="520" height="30" fill="#201007" stroke="#0D0502" stroke-width="2"/>
    `
  },

  // 10. AD-010 Royal Jali (CNC Designer)
  {
    fileName: 'door-cnc-3.svg',
    name: 'AD-010 Royal Jali',
    category: 'CNC Designer Door',
    woodName: 'Solid Hardwood & Teak',
    base: '#3B261A',
    highlight: '#573B29',
    dark: '#21130B',
    accent: '#D4AF37',
    render: (id) => `
      <rect width="600" height="900" fill="#E8DFD5"/>
      <rect x="70" y="50" width="460" height="800" fill="#1C1008" stroke="#0E0703" stroke-width="4"/>
      <rect x="90" y="70" width="420" height="780" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <rect x="90" y="70" width="420" height="780" fill="url(#grain_${id})"/>

      <!-- Frosted Glass Backing Behind Jali Lattice -->
      <rect x="130" y="110" width="340" height="420" rx="4" fill="#DDE3E6" opacity="0.85"/>

      <!-- Jali Lattice Pattern -->
      <pattern id="jali_${id}" width="34" height="34" patternUnits="userSpaceOnUse">
        <path d="M 0 17 L 17 0 L 34 17 L 17 34 Z" fill="#29180E" stroke="#D4AF37" stroke-width="2"/>
        <circle cx="17" cy="17" r="3.5" fill="#D4AF37"/>
      </pattern>
      <rect x="130" y="110" width="340" height="420" rx="4" fill="url(#jali_${id})" stroke="#D4AF37" stroke-width="3" filter="url(#bevel_${id})"/>

      <!-- Lower Solid Timber Panel with Grooves -->
      <rect x="130" y="560" width="340" height="250" rx="4" fill="#23140C" stroke="#D4AF37" stroke-width="2.5" filter="url(#bevel_${id})"/>
      <line x1="200" y1="580" x2="200" y2="780" stroke="#D4AF37" stroke-width="2" opacity="0.5"/>
      <line x1="265" y1="580" x2="265" y2="780" stroke="#D4AF37" stroke-width="3" opacity="0.8"/>
      <line x1="335" y1="580" x2="335" y2="780" stroke="#D4AF37" stroke-width="3" opacity="0.8"/>
      <line x1="400" y1="580" x2="400" y2="780" stroke="#D4AF37" stroke-width="2" opacity="0.5"/>

      <!-- Brass Handle -->
      <rect x="440" y="470" width="20" height="110" rx="3" fill="url(#brass_${id})" filter="url(#bevel_${id})"/>
      <circle cx="450" cy="495" r="4" fill="#140905"/>
      <path d="M 450 510 L 450 555" stroke="#140905" stroke-width="4" stroke-linecap="round"/>

      <rect x="60" y="850" width="480" height="25" fill="#22130A" stroke="#0F0703" stroke-width="2"/>
    `
  },

  // 11. AD-011 Contemporary Lines (Interior Door)
  {
    fileName: 'door-interior-3.svg',
    name: 'AD-011 Contemporary Lines',
    category: 'Interior Door',
    woodName: 'Steam Beech & Teak Facing',
    base: '#463226',
    highlight: '#664B3A',
    dark: '#2A1C14',
    accent: '#C5A059',
    render: (id) => `
      <rect width="600" height="900" fill="#F4EFEA"/>
      <rect x="80" y="60" width="440" height="800" fill="#DDD0C0" stroke="#C4B4A2" stroke-width="3"/>
      <rect x="95" y="75" width="410" height="785" fill="#1C120C"/>

      <rect x="105" y="85" width="390" height="775" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <rect x="105" y="85" width="390" height="775" fill="url(#grain_${id})"/>

      <!-- Asymmetrical CNC Linear Grooving -->
      <line x1="160" y1="85" x2="160" y2="860" stroke="#1C120C" stroke-width="5"/>
      <line x1="160" y1="85" x2="160" y2="860" stroke="#C5A059" stroke-width="2" opacity="0.8"/>

      <line x1="190" y1="85" x2="190" y2="860" stroke="#1C120C" stroke-width="3"/>
      <line x1="210" y1="85" x2="210" y2="860" stroke="#1C120C" stroke-width="6"/>
      <line x1="210" y1="85" x2="210" y2="860" stroke="#C5A059" stroke-width="2.5" opacity="0.9"/>

      <line x1="380" y1="85" x2="380" y2="860" stroke="#1C120C" stroke-width="3"/>

      <!-- Minimal Lever Lockset -->
      <circle cx="440" cy="450" r="15" fill="url(#brass_${id})" filter="url(#bevel_${id})"/>
      <rect x="420" y="445" width="60" height="10" rx="3" fill="url(#brass_${id})" filter="url(#bevel_${id})"/>

      <rect x="70" y="860" width="460" height="20" fill="#352319" stroke="#170F0A" stroke-width="1.5"/>
    `
  },

  // 12. AD-012 Ornate Tradition (Traditional Door)
  {
    fileName: 'door-traditional-3.svg',
    name: 'AD-012 Ornate Tradition',
    category: 'Traditional Door',
    woodName: 'Grade-A Indian Teak Wood',
    base: '#382015',
    highlight: '#543323',
    dark: '#201009',
    accent: '#D4AF37',
    render: (id) => `
      <rect width="600" height="900" fill="#E8E0D4"/>
      <rect x="65" y="45" width="470" height="810" fill="#331D13" stroke="#1C0E07" stroke-width="6"/>
      <rect x="85" y="65" width="430" height="785" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <rect x="85" y="65" width="430" height="785" fill="url(#grain_${id})"/>

      <!-- Stepped Multi-Level Indian Haveli Borders -->
      <rect x="120" y="100" width="360" height="715" rx="4" fill="none" stroke="#D4AF37" stroke-width="3"/>
      <rect x="135" y="115" width="330" height="685" rx="2" fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="6,4"/>

      <!-- Upper Center Haveli Rosette & Paisley Inlay -->
      <rect x="150" y="135" width="300" height="300" rx="4" fill="#24130A" stroke="#D4AF37" stroke-width="2.5" filter="url(#bevel_${id})"/>
      <circle cx="300" cy="285" r="65" fill="none" stroke="#D4AF37" stroke-width="2.5"/>
      <polygon points="300,240 340,310 260,310" fill="none" stroke="#D4AF37" stroke-width="2"/>
      <polygon points="300,330 340,260 260,260" fill="none" stroke="#D4AF37" stroke-width="2"/>
      <circle cx="300" cy="285" r="12" fill="#D4AF37"/>

      <!-- Lower Symmetrical Carved Panels -->
      <rect x="150" y="465" width="300" height="325" rx="4" fill="#24130A" stroke="#D4AF37" stroke-width="2.5" filter="url(#bevel_${id})"/>
      <circle cx="300" cy="627" r="65" fill="none" stroke="#D4AF37" stroke-width="2.5"/>
      <polygon points="300,582 340,652 260,652" fill="none" stroke="#D4AF37" stroke-width="2"/>
      <polygon points="300,672 340,602 260,602" fill="none" stroke="#D4AF37" stroke-width="2"/>
      <circle cx="300" cy="627" r="12" fill="#D4AF37"/>

      <!-- Brass Hardware -->
      <circle cx="440" cy="450" r="17" fill="none" stroke="url(#brass_${id})" stroke-width="4.5" filter="url(#bevel_${id})"/>
      <circle cx="440" cy="435" r="7" fill="url(#brass_${id})"/>

      <rect x="50" y="850" width="500" height="25" fill="#26150D" stroke="#100703" stroke-width="2"/>
    `
  },

  // 13. AD-013 Signature Walnut (Main Entrance)
  {
    fileName: 'door-entrance-4.svg',
    name: 'AD-013 Signature Walnut',
    category: 'Main Entrance Door',
    woodName: 'American Walnut & Teak',
    base: '#2B1E16',
    highlight: '#473226',
    dark: '#1A110C',
    accent: '#C5A059',
    render: (id) => `
      <rect width="600" height="900" fill="#E8DFD5"/>
      <rect x="70" y="50" width="460" height="800" fill="#1C130D" stroke="#0E0906" stroke-width="4"/>
      <rect x="90" y="70" width="420" height="780" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <rect x="90" y="70" width="420" height="780" fill="url(#grain_${id})"/>

      <!-- 3 Massive 3D Coffered Panels with Heavy Bevels -->
      <!-- Panel 1 -->
      <rect x="130" y="110" width="340" height="200" rx="4" fill="#180F0A" stroke="#C5A059" stroke-width="2.5" filter="url(#bevel_${id})"/>
      <rect x="155" y="130" width="290" height="160" rx="2" fill="url(#woodGrad_${id})" stroke="#C5A059" stroke-width="1.5" stroke-dasharray="5,3"/>

      <!-- Panel 2 -->
      <rect x="130" y="345" width="340" height="200" rx="4" fill="#180F0A" stroke="#C5A059" stroke-width="2.5" filter="url(#bevel_${id})"/>
      <rect x="155" y="365" width="290" height="160" rx="2" fill="url(#woodGrad_${id})" stroke="#C5A059" stroke-width="1.5" stroke-dasharray="5,3"/>

      <!-- Panel 3 -->
      <rect x="130" y="580" width="340" height="200" rx="4" fill="#180F0A" stroke="#C5A059" stroke-width="2.5" filter="url(#bevel_${id})"/>
      <rect x="155" y="600" width="290" height="160" rx="2" fill="url(#woodGrad_${id})" stroke="#C5A059" stroke-width="1.5" stroke-dasharray="5,3"/>

      <!-- Luxury Walnut Entrance Pull -->
      <rect x="445" y="400" width="18" height="140" rx="3" fill="url(#brass_${id})" filter="url(#bevel_${id})"/>
      <circle cx="454" cy="425" r="4" fill="#120B07"/>

      <rect x="60" y="850" width="480" height="25" fill="#20150E" stroke="#0D0804" stroke-width="2"/>
    `
  },

  // 14. AD-014 Precision Grid (CNC Designer)
  {
    fileName: 'door-cnc-4.svg',
    name: 'AD-014 Precision Grid',
    category: 'CNC Designer Door',
    woodName: 'Padauk Timber Core & Teak',
    base: '#3A2017',
    highlight: '#573326',
    dark: '#21100B',
    accent: '#D4AF37',
    render: (id) => `
      <rect width="600" height="900" fill="#EAE0D5"/>
      <rect x="70" y="50" width="460" height="800" fill="#1A0D07" stroke="#0D0603" stroke-width="4"/>
      <rect x="90" y="70" width="420" height="780" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <rect x="90" y="70" width="420" height="780" fill="url(#grain_${id})"/>

      <!-- Asymmetrical Architectural Precision Grid -->
      <rect x="120" y="100" width="360" height="720" fill="#221109" stroke="#D4AF37" stroke-width="2" filter="url(#bevel_${id})"/>

      <!-- Vertical Channels -->
      <line x1="220" y1="100" x2="220" y2="820" stroke="#D4AF37" stroke-width="3" opacity="0.85"/>
      <line x1="330" y1="100" x2="330" y2="820" stroke="#D4AF37" stroke-width="3" opacity="0.85"/>

      <!-- Horizontal Channels -->
      <line x1="120" y1="260" x2="480" y2="260" stroke="#D4AF37" stroke-width="3" opacity="0.85"/>
      <line x1="120" y1="460" x2="480" y2="460" stroke="#D4AF37" stroke-width="3" opacity="0.85"/>
      <line x1="120" y1="640" x2="480" y2="640" stroke="#D4AF37" stroke-width="3" opacity="0.85"/>

      <!-- Alternating Depth Shaded Relief Pockets -->
      <rect x="135" y="115" width="70" height="130" fill="#D4AF37" opacity="0.18"/>
      <rect x="235" y="275" width="80" height="170" fill="#D4AF37" opacity="0.25"/>
      <rect x="345" y="475" width="120" height="150" fill="#D4AF37" opacity="0.2"/>
      <rect x="135" y="655" width="70" height="150" fill="#D4AF37" opacity="0.15"/>

      <!-- Brass Hardware -->
      <rect x="440" y="420" width="18" height="110" rx="3" fill="url(#brass_${id})" filter="url(#bevel_${id})"/>
      <circle cx="449" cy="445" r="4" fill="#120703"/>

      <rect x="60" y="850" width="480" height="25" fill="#24120A" stroke="#0C0502" stroke-width="2"/>
    `
  },

  // 15. AD-015 Classic Teak Panel (Interior Door)
  {
    fileName: 'door-interior-4.svg',
    name: 'AD-015 Classic Teak Panel',
    category: 'Interior Door',
    woodName: 'Select Grade Teak Wood',
    base: '#523A27',
    highlight: '#735339',
    dark: '#352417',
    accent: '#B89255',
    render: (id) => `
      <rect width="600" height="900" fill="#F4EFEA"/>
      <rect x="80" y="60" width="440" height="800" fill="#E0D2C2" stroke="#C4B4A2" stroke-width="3"/>
      <rect x="95" y="75" width="410" height="785" fill="#20150D"/>

      <rect x="105" y="85" width="390" height="775" fill="url(#woodGrad_${id})" filter="url(#bevel_${id})"/>
      <rect x="105" y="85" width="390" height="775" fill="url(#grain_${id})"/>

      <!-- 6-Panel Configuration -->
      <!-- Row 1 (Top) -->
      <rect x="135" y="115" width="150" height="190" rx="3" fill="#302014" stroke="#B89255" stroke-width="2" filter="url(#bevel_${id})"/>
      <rect x="150" y="130" width="120" height="160" rx="2" fill="url(#woodGrad_${id})"/>

      <rect x="315" y="115" width="150" height="190" rx="3" fill="#302014" stroke="#B89255" stroke-width="2" filter="url(#bevel_${id})"/>
      <rect x="330" y="130" width="120" height="160" rx="2" fill="url(#woodGrad_${id})"/>

      <!-- Row 2 (Middle - Tall) -->
      <rect x="135" y="335" width="150" height="240" rx="3" fill="#302014" stroke="#B89255" stroke-width="2" filter="url(#bevel_${id})"/>
      <rect x="150" y="350" width="120" height="210" rx="2" fill="url(#woodGrad_${id})"/>

      <rect x="315" y="335" width="150" height="240" rx="3" fill="#302014" stroke="#B89255" stroke-width="2" filter="url(#bevel_${id})"/>
      <rect x="330" y="350" width="120" height="210" rx="2" fill="url(#woodGrad_${id})"/>

      <!-- Row 3 (Bottom) -->
      <rect x="135" y="605" width="150" height="210" rx="3" fill="#302014" stroke="#B89255" stroke-width="2" filter="url(#bevel_${id})"/>
      <rect x="150" y="620" width="120" height="180" rx="2" fill="url(#woodGrad_${id})"/>

      <rect x="315" y="605" width="150" height="210" rx="3" fill="#302014" stroke="#B89255" stroke-width="2" filter="url(#bevel_${id})"/>
      <rect x="330" y="620" width="120" height="180" rx="2" fill="url(#woodGrad_${id})"/>

      <!-- Brushed Brass Lever Handle -->
      <circle cx="445" cy="455" r="15" fill="url(#brass_${id})" filter="url(#bevel_${id})"/>
      <rect x="425" y="450" width="55" height="10" rx="3" fill="url(#brass_${id})" filter="url(#bevel_${id})"/>

      <rect x="70" y="860" width="460" height="20" fill="#352418" stroke="#160E08" stroke-width="1.5"/>
    `
  }
];

// Write all 15 door SVGs
doorModels.forEach((d, idx) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="100%" height="100%">
    ${getWoodDefs(`door_${idx+1}`, d.base, d.highlight, d.dark, d.accent)}
    ${d.render(`door_${idx+1}`)}
    <!-- Editorial Architectural Tag -->
    <text x="300" y="878" font-family="'Playfair Display', Georgia, serif" font-size="11" fill="#77716A" text-anchor="middle" letter-spacing="3">AANGAN DOORS • ${d.name.toUpperCase()} • ${d.woodName.toUpperCase()}</text>
  </svg>`;

  fs.writeFileSync(path.join(outDir, d.fileName), svg, 'utf-8');
});

console.log(`Generated ${doorModels.length} realistic architectural door SVGs.`);

// Now generate Production Page Visuals
// 1. Phase 1: CAD/CAM Design Translation
const cadSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3A281E" />
      <stop offset="100%" stop-color="#261A13" />
    </linearGradient>
  </defs>

  <!-- Workshop Studio Background -->
  <rect width="800" height="500" fill="#251A16"/>

  <!-- Workshop Technical Blueprint Wall -->
  <rect x="40" y="30" width="720" height="440" rx="6" fill="#1C1410" stroke="#39271F" stroke-width="3"/>

  <!-- Solid Oak/Teak Workshop Desk -->
  <rect x="40" y="380" width="720" height="90" fill="url(#deskGrad)" stroke="#A98255" stroke-width="1.5"/>

  <!-- Main CAD/CAM Display Monitor -->
  <rect x="120" y="60" width="560" height="300" rx="8" fill="url(#screenGrad)" stroke="#475569" stroke-width="4"/>
  <!-- Monitor Stand -->
  <rect x="375" y="360" width="50" height="25" fill="#334155"/>
  <rect x="330" y="382" width="140" height="8" rx="2" fill="#1E293B"/>

  <!-- CAD Vector Software Grid Interface -->
  ${Array.from({ length: 15 }).map((_, i) => `<line x1="${140 + i * 36}" y1="80" x2="${140 + i * 36}" y2="340" stroke="#334155" stroke-width="0.8" opacity="0.4"/>`).join('')}
  ${Array.from({ length: 7 }).map((_, i) => `<line x1="140" y1="${90 + i * 36}" x2="660" y2="${90 + i * 36}" stroke="#334155" stroke-width="0.8" opacity="0.4"/>`).join('')}

  <!-- CAD Door Technical Wireframe Elevation (Indian Arch & CNC jaali) -->
  <rect x="310" y="90" width="180" height="240" fill="none" stroke="#38BDF8" stroke-width="2.5"/>
  <path d="M 330 200 Q 400 110 470 200 L 470 310 L 330 310 Z" fill="none" stroke="#F59E0B" stroke-width="2"/>
  <circle cx="400" cy="180" r="30" fill="none" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="310" y1="210" x2="490" y2="210" stroke="#38BDF8" stroke-width="1.5"/>
  <circle cx="475" cy="225" r="3" fill="#F59E0B"/>

  <!-- CNC Toolpath Vectors (Cyan / Magenta G-Code Paths) -->
  <path d="M 345 230 L 455 230 L 455 300 L 345 300 Z" fill="none" stroke="#EC4899" stroke-width="1.5" stroke-dasharray="3,2"/>
  <line x1="375" y1="230" x2="375" y2="300" stroke="#EC4899" stroke-width="1"/>
  <line x1="425" y1="230" x2="425" y2="300" stroke="#EC4899" stroke-width="1"/>

  <!-- Coordinate Display & CNC Status in CAD Viewport -->
  <rect x="135" y="75" width="130" height="100" rx="3" fill="#0F172A" opacity="0.9"/>
  <text x="145" y="95" font-family="monospace" font-size="10" fill="#38BDF8">CAD/CAM v4.8</text>
  <text x="145" y="112" font-family="monospace" font-size="9" fill="#94A3B8">X: 84.000 in</text>
  <text x="145" y="127" font-family="monospace" font-size="9" fill="#94A3B8">Y: 36.000 in</text>
  <text x="145" y="142" font-family="monospace" font-size="9" fill="#94A3B8">Z: -0.750 in (Cut)</text>
  <text x="145" y="160" font-family="monospace" font-size="9" fill="#10B981">TOOLPATH: READY</text>

  <!-- Indian Workshop Desk Items: Teak Timber Block & Steel Ruler -->
  <rect x="80" y="400" width="140" height="35" rx="3" fill="#523826" stroke="#2D1D13" stroke-width="2"/>
  <text x="150" y="422" font-family="'Inter', sans-serif" font-size="9" fill="#EAE0D2" text-anchor="middle" letter-spacing="1">TEAK TIMBER SAMPLE</text>

  <rect x="580" y="415" width="140" height="12" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
  ${Array.from({ length: 14 }).map((_, i) => `<line x1="${590 + i * 9}" y1="415" x2="${590 + i * 9}" y2="421" stroke="#334155" stroke-width="0.8"/>`).join('')}

  <!-- Title Badge -->
  <rect x="230" y="450" width="340" height="28" rx="4" fill="#251A16" stroke="#A98255" stroke-width="1.5"/>
  <text x="400" y="468" font-family="'Inter', sans-serif" font-size="11" fill="#F7F3EC" text-anchor="middle" letter-spacing="2">PHASE 1: DIGITAL CAD/CAM TOOLPATH ENGINEERING</text>
</svg>`;
fs.writeFileSync(path.join(outDir, 'production-cad.svg'), cadSvg, 'utf-8');

// 2. Phase 2: High-Precision CNC Router Machine
const cncSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="gantryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="50%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <linearGradient id="spindleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="50%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#64748B"/>
    </linearGradient>
    <linearGradient id="teakSlab" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3B261A"/>
      <stop offset="50%" stop-color="#5A3D29"/>
      <stop offset="100%" stop-color="#3B261A"/>
    </linearGradient>
  </defs>

  <!-- Industrial Machine Cell Environment -->
  <rect width="800" height="500" fill="#1C1410"/>

  <!-- Heavy Vacuum CNC Machine Bed / Table -->
  <rect x="60" y="160" width="680" height="280" rx="6" fill="#0F172A" stroke="#334155" stroke-width="4"/>
  <!-- Vacuum Grid Pods on Table -->
  ${Array.from({ length: 9 }).map((_, i) => `<line x1="${90 + i * 70}" y1="160" x2="${90 + i * 70}" y2="440" stroke="#1E293B" stroke-width="2"/>`).join('')}
  ${Array.from({ length: 6 }).map((_, i) => `<line x1="60" y1="${190 + i * 45}" x2="740" y2="${190 + i * 45}" stroke="#1E293B" stroke-width="2"/>`).join('')}

  <!-- Massive Solid Teak Door Blank Mounted on Machine Bed -->
  <rect x="130" y="190" width="540" height="220" rx="4" fill="url(#teakSlab)" stroke="#271810" stroke-width="3"/>

  <!-- Active Carved CNC Floral & Arch Door Relief Pattern -->
  <path d="M 180 300 Q 280 210 380 300 L 380 380 L 180 380 Z" fill="#25160E" stroke="#D4AF37" stroke-width="2.5"/>
  <circle cx="280" cy="275" r="35" fill="none" stroke="#D4AF37" stroke-width="2"/>
  <circle cx="280" cy="275" r="10" fill="#D4AF37"/>
  <!-- Fresh Carved Grooves -->
  <line x1="210" y1="310" x2="210" y2="375" stroke="#D4AF37" stroke-width="2.5"/>
  <line x1="280" y1="310" x2="280" y2="375" stroke="#D4AF37" stroke-width="3.5"/>
  <line x1="350" y1="310" x2="350" y2="375" stroke="#D4AF37" stroke-width="2.5"/>

  <!-- CNC Heavy Bridge Gantry Beam -->
  <rect x="40" y="60" width="720" height="50" rx="4" fill="url(#gantryGrad)" stroke="#64748B" stroke-width="2"/>
  <line x1="40" y1="85" x2="760" y2="85" stroke="#94A3B8" stroke-width="3"/>

  <!-- Moving Z-Axis Carriage -->
  <rect x="360" y="50" width="120" height="130" rx="4" fill="#334155" stroke="#64748B" stroke-width="2"/>
  <rect x="380" y="90" width="80" height="90" fill="#1E293B"/>

  <!-- High-Speed Water-Cooled CNC Spindle (24,000 RPM) -->
  <rect x="395" y="110" width="50" height="130" rx="6" fill="url(#spindleGrad)" stroke="#475569" stroke-width="2"/>
  <!-- Collet Chuck -->
  <polygon points="410,240 430,240 426,260 414,260" fill="#334155"/>
  <!-- Solid Carbide 3D Relief Ballnose Router Bit -->
  <rect x="418" y="260" width="4" height="35" fill="#E2E8F0"/>
  <!-- High Speed Rotation Glow & Wood Chips Sparkle -->
  <circle cx="420" cy="295" r="16" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4,4" opacity="0.8"/>
  <circle cx="420" cy="295" r="4" fill="#F59E0B"/>
  <!-- Wood Shavings Flying -->
  <circle cx="435" cy="285" r="2.5" fill="#C5A059"/>
  <circle cx="405" cy="290" r="2" fill="#D4AF37"/>
  <circle cx="440" cy="305" r="3" fill="#C5A059"/>
  <circle cx="408" cy="308" r="2" fill="#EAE0D2"/>

  <!-- Dust Extraction Hood & Flexible Duct -->
  <path d="M 445 160 Q 560 80 600 40" fill="none" stroke="#94A3B8" stroke-width="18" stroke-linecap="round" opacity="0.75"/>
  <path d="M 445 160 Q 560 80 600 40" fill="none" stroke="#64748B" stroke-width="14" stroke-linecap="round"/>

  <!-- Emergency Stop Button -->
  <circle cx="90" cy="185" r="12" fill="#DC2626" stroke="#991B1B" stroke-width="2"/>
  <circle cx="90" cy="185" r="8" fill="#EF4444"/>

  <!-- Digital Status Bar -->
  <rect x="220" y="455" width="360" height="28" rx="4" fill="#251A16" stroke="#A98255" stroke-width="1.5"/>
  <text x="400" y="473" font-family="'Inter', sans-serif" font-size="11" fill="#F7F3EC" text-anchor="middle" letter-spacing="2">PHASE 2: MULTI-AXIS CNC WOOD ROUTER CARVING</text>
</svg>`;
fs.writeFileSync(path.join(outDir, 'production-cnc.svg'), cncSvg, 'utf-8');

// 3. Workshop Assembly & Timber Framing
const workshopSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="benchWood" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4A3425"/>
      <stop offset="50%" stop-color="#6E4F39"/>
      <stop offset="100%" stop-color="#4A3425"/>
    </linearGradient>
  </defs>

  <rect width="800" height="500" fill="#201510"/>
  <!-- Workshop Wall with Hanging Woodworking Tools -->
  <rect x="40" y="30" width="720" height="440" fill="#18100C" stroke="#332219" stroke-width="2"/>
  
  <!-- Tool Pegboard -->
  <rect x="60" y="50" width="680" height="120" fill="#261A14" stroke="#3D291F" stroke-width="1"/>
  <!-- Saws, Hand Planes, Framing Squares -->
  <path d="M 120 70 L 160 140 L 140 145 Z" fill="#94A3B8"/>
  <rect x="220" y="80" width="80" height="35" rx="3" fill="#6B4B35"/>
  <polygon points="380,65 380,145 440,145 440,135 390,135 390,65" fill="#CBD5E1"/>

  <!-- Heavy Joinery Workbench -->
  <rect x="70" y="240" width="660" height="210" fill="url(#benchWood)" stroke="#301F15" stroke-width="4"/>

  <!-- Door Timber Stiles & Rails in Assembly (Clamps Attached) -->
  <rect x="130" y="260" width="540" height="160" rx="3" fill="#3D2719" stroke="#A98255" stroke-width="2"/>
  <!-- Door Panels Inset -->
  <rect x="170" y="280" width="130" height="120" rx="2" fill="#29180E" stroke="#A98255" stroke-width="1.5"/>
  <rect x="335" y="280" width="130" height="120" rx="2" fill="#29180E" stroke="#A98255" stroke-width="1.5"/>
  <rect x="500" y="280" width="130" height="120" rx="2" fill="#29180E" stroke="#A98255" stroke-width="1.5"/>

  <!-- Steel Sash Clamps -->
  <rect x="110" y="300" width="580" height="10" fill="#475569" stroke="#1E293B" stroke-width="1"/>
  <rect x="110" y="370" width="580" height="10" fill="#475569" stroke="#1E293B" stroke-width="1"/>

  <!-- Title Badge -->
  <rect x="230" y="455" width="340" height="28" rx="4" fill="#251A16" stroke="#A98255" stroke-width="1.5"/>
  <text x="400" y="473" font-family="'Inter', sans-serif" font-size="11" fill="#F7F3EC" text-anchor="middle" letter-spacing="2">WORKSHOP TIMBER ASSEMBLY & JOINERY</text>
</svg>`;
fs.writeFileSync(path.join(outDir, 'production-workshop.svg'), workshopSvg, 'utf-8');

// 4. Hand Sanding & Detailing
const sandingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#1C130D"/>
  <rect x="50" y="30" width="700" height="440" fill="#241710" stroke="#3A2417" stroke-width="2"/>

  <!-- Teak Door Panel Closeup (Artisan Sanding Relief) -->
  <rect x="100" y="70" width="600" height="360" rx="4" fill="#4D3322" stroke="#25150C" stroke-width="3"/>
  <circle cx="400" cy="250" r="120" fill="#382215" stroke="#C5A059" stroke-width="3"/>
  <circle cx="400" cy="250" r="80" fill="none" stroke="#C5A059" stroke-width="2" stroke-dasharray="6,4"/>
  <circle cx="400" cy="250" r="30" fill="#C5A059"/>

  <!-- Hand Sanding Tool & Sandpaper Block on Groove -->
  <rect x="420" y="170" width="70" height="45" rx="4" fill="#D97706" stroke="#92400E" stroke-width="2"/>
  <rect x="418" y="212" width="74" height="6" rx="1" fill="#FDE68A"/>
  <!-- Fine Wood Dust Powder Effect -->
  <circle cx="410" cy="225" r="8" fill="#F7F3EC" opacity="0.3"/>
  <circle cx="430" cy="230" r="12" fill="#F7F3EC" opacity="0.25"/>
  <circle cx="460" cy="225" r="10" fill="#F7F3EC" opacity="0.3"/>

  <!-- Title Badge -->
  <rect x="230" y="455" width="340" height="28" rx="4" fill="#251A16" stroke="#A98255" stroke-width="1.5"/>
  <text x="400" y="473" font-family="'Inter', sans-serif" font-size="11" fill="#F7F3EC" text-anchor="middle" letter-spacing="2">HAND SANDING & PROFILE REFINEMENT</text>
</svg>`;
fs.writeFileSync(path.join(outDir, 'production-sanding.svg'), sandingSvg, 'utf-8');

// 5. Finishing & Polishing
const finishingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="lusterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3D2416"/>
      <stop offset="60%" stop-color="#6B452B"/>
      <stop offset="100%" stop-color="#4F301C"/>
    </linearGradient>
  </defs>

  <rect width="800" height="500" fill="#1A110C"/>
  <rect x="50" y="30" width="700" height="440" fill="#261710" stroke="#3D251A" stroke-width="2"/>

  <!-- Finished Luster Door Panel with Hand-Rubbed Oil Polish -->
  <rect x="120" y="70" width="560" height="360" rx="4" fill="url(#lusterGrad)" stroke="#A98255" stroke-width="2"/>
  <!-- Rich Surface Reflection Highlight -->
  <polygon points="120,70 240,70 160,430 120,430" fill="#FFFFFF" opacity="0.08"/>

  <!-- Traditional Walnut Stain & Finishing Oil Cans -->
  <rect x="580" y="330" width="60" height="80" rx="3" fill="#CBD5E1" stroke="#64748B" stroke-width="1.5"/>
  <rect x="590" y="350" width="40" height="40" fill="#A98255"/>
  <text x="610" y="375" font-family="sans-serif" font-size="8" fill="#FFFFFF" text-anchor="middle">TEAK OIL</text>

  <!-- Title Badge -->
  <rect x="230" y="455" width="340" height="28" rx="4" fill="#251A16" stroke="#A98255" stroke-width="1.5"/>
  <text x="400" y="473" font-family="'Inter', sans-serif" font-size="11" fill="#F7F3EC" text-anchor="middle" letter-spacing="2">MULTI-TIER HAND-RUBBED WOOD FINISHING</text>
</svg>`;
fs.writeFileSync(path.join(outDir, 'production-finishing.svg'), finishingSvg, 'utf-8');

// 6. Quality & Dimensional Inspection
const inspectionSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#1C1410"/>
  <rect x="50" y="30" width="700" height="440" fill="#241913" stroke="#3B281E" stroke-width="2"/>

  <!-- Door Frame Being Inspected for Squareness -->
  <rect x="180" y="60" width="360" height="370" fill="#3D271B" stroke="#25160E" stroke-width="3"/>
  <rect x="220" y="90" width="120" height="140" fill="#25150C" stroke="#A98255" stroke-width="1.5"/>
  <rect x="380" y="90" width="120" height="140" fill="#25150C" stroke="#A98255" stroke-width="1.5"/>
  <rect x="220" y="260" width="120" height="140" fill="#25150C" stroke="#A98255" stroke-width="1.5"/>
  <rect x="380" y="260" width="120" height="140" fill="#25150C" stroke="#A98255" stroke-width="1.5"/>

  <!-- Precision Digital Caliper Tool Measuring Rebate Edge -->
  <rect x="140" y="180" width="160" height="12" fill="#E2E8F0" stroke="#475569" stroke-width="1"/>
  <rect x="140" y="170" width="16" height="35" fill="#475569"/>
  <rect x="175" y="170" width="16" height="35" fill="#475569"/>
  <rect x="200" y="165" width="45" height="25" rx="2" fill="#0F172A"/>
  <text x="222" y="182" font-family="monospace" font-size="9" fill="#10B981" text-anchor="middle">38.10 mm</text>

  <!-- Quality Stamp -->
  <circle cx="580" cy="140" r="35" fill="none" stroke="#10B981" stroke-width="2.5" stroke-dasharray="5,3"/>
  <text x="580" y="137" font-family="'Inter', sans-serif" font-size="9" fill="#10B981" font-weight="bold" text-anchor="middle">PASSED</text>
  <text x="580" y="150" font-family="'Inter', sans-serif" font-size="8" fill="#10B981" text-anchor="middle">MOISTURE &lt; 10%</text>

  <!-- Title Badge -->
  <rect x="230" y="455" width="340" height="28" rx="4" fill="#251A16" stroke="#A98255" stroke-width="1.5"/>
  <text x="400" y="473" font-family="'Inter', sans-serif" font-size="11" fill="#F7F3EC" text-anchor="middle" letter-spacing="2">PRECISION DIMENSIONAL & MOISTURE INSPECTION</text>
</svg>`;
fs.writeFileSync(path.join(outDir, 'production-inspection.svg'), inspectionSvg, 'utf-8');

// 7. Category Showcase SVGs (Cover Images)
const catEntranceSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  ${getWoodDefs('cat_ent', '#3A2417', '#543825', '#22150D', '#D4AF37')}
  <rect width="600" height="800" fill="#EAE0D2"/>
  <path d="M 80 800 L 80 280 Q 300 60 520 280 L 520 800 Z" fill="#CBBBA6" stroke="#B3A28B" stroke-width="10"/>
  <path d="M 98 800 L 98 290 Q 300 85 502 290 L 502 800 Z" fill="url(#woodGrad_cat_ent)"/>
  <path d="M 98 800 L 98 290 Q 300 85 502 290 L 502 800 Z" fill="url(#grain_cat_ent)"/>
  <circle cx="300" cy="300" r="60" fill="none" stroke="#D4AF37" stroke-width="3"/>
  <circle cx="300" cy="300" r="16" fill="#D4AF37"/>
  <rect x="140" y="450" width="140" height="280" rx="4" fill="#201108" stroke="#D4AF37" stroke-width="2"/>
  <rect x="320" y="450" width="140" height="280" rx="4" fill="#201108" stroke="#D4AF37" stroke-width="2"/>
  <rect x="440" y="420" width="18" height="110" rx="3" fill="url(#brass_cat_ent)"/>
</svg>`;
fs.writeFileSync(path.join(outDir, 'category-entrance.svg'), catEntranceSvg, 'utf-8');

const catCncSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  ${getWoodDefs('cat_cnc', '#40291D', '#5D3E2D', '#24140C', '#C5A059')}
  <rect width="600" height="800" fill="#E8DFD5"/>
  <rect x="70" y="60" width="460" height="700" rx="6" fill="url(#woodGrad_cat_cnc)"/>
  <rect x="70" y="60" width="460" height="700" rx="6" fill="url(#grain_cat_cnc)"/>
  <circle cx="300" cy="410" r="150" fill="none" stroke="#C5A059" stroke-width="4"/>
  <circle cx="300" cy="410" r="100" fill="#22130A" stroke="#C5A059" stroke-width="3"/>
  <circle cx="300" cy="410" r="30" fill="#C5A059"/>
  ${Array.from({ length: 16 }).map((_, i) => `<line x1="${300 + 100 * Math.cos(i * Math.PI / 8)}" y1="${410 + 100 * Math.sin(i * Math.PI / 8)}" x2="${300 + 150 * Math.cos(i * Math.PI / 8)}" y2="${410 + 150 * Math.sin(i * Math.PI / 8)}" stroke="#C5A059" stroke-width="3"/>`).join('')}
</svg>`;
fs.writeFileSync(path.join(outDir, 'category-cnc.svg'), catCncSvg, 'utf-8');

const catInteriorSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  ${getWoodDefs('cat_int', '#5E432F', '#7A5B42', '#3E2A1C', '#B08850')}
  <rect width="600" height="800" fill="#F4EFEA"/>
  <rect x="90" y="60" width="420" height="710" fill="url(#woodGrad_cat_int)"/>
  <rect x="90" y="60" width="420" height="710" fill="url(#grain_cat_int)"/>
  <rect x="130" y="100" width="150" height="270" rx="3" fill="#382417" stroke="#9E7848" stroke-width="2"/>
  <rect x="320" y="100" width="150" height="270" rx="3" fill="#382417" stroke="#9E7848" stroke-width="2"/>
  <rect x="130" y="420" width="150" height="300" rx="3" fill="#382417" stroke="#9E7848" stroke-width="2"/>
  <rect x="320" y="420" width="150" height="300" rx="3" fill="#382417" stroke="#9E7848" stroke-width="2"/>
  <circle cx="440" cy="400" r="14" fill="url(#brass_cat_int)"/>
  <rect x="420" y="395" width="50" height="10" rx="2" fill="url(#brass_cat_int)"/>
</svg>`;
fs.writeFileSync(path.join(outDir, 'category-interior.svg'), catInteriorSvg, 'utf-8');

const catTraditionalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  ${getWoodDefs('cat_trad', '#2D180F', '#482B1C', '#1A0C06', '#D4AF37')}
  <rect width="600" height="800" fill="#EAE1D5"/>
  <path d="M 60 760 L 60 250 Q 300 40 540 250 L 540 760 Z" fill="#3A1E14" stroke="#210E07" stroke-width="8"/>
  <rect x="90" y="120" width="195" height="640" fill="url(#woodGrad_cat_trad)"/>
  <rect x="315" y="120" width="195" height="640" fill="url(#woodGrad_cat_trad)"/>
  ${[200, 320, 440, 560, 680].map(y => `
    <circle cx="140" cy="${y}" r="8" fill="url(#brass_cat_trad)"/>
    <circle cx="230" cy="${y}" r="8" fill="url(#brass_cat_trad)"/>
    <circle cx="370" cy="${y}" r="8" fill="url(#brass_cat_trad)"/>
    <circle cx="460" cy="${y}" r="8" fill="url(#brass_cat_trad)"/>
  `).join('')}
  <circle cx="260" cy="420" r="15" fill="none" stroke="url(#brass_cat_trad)" stroke-width="4"/>
  <circle cx="340" cy="420" r="15" fill="none" stroke="url(#brass_cat_trad)" stroke-width="4"/>
</svg>`;
fs.writeFileSync(path.join(outDir, 'category-traditional.svg'), catTraditionalSvg, 'utf-8');

// 8. Hero Door & About Door Visuals
const heroDoorSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%">
  ${getWoodDefs('hero', '#39271F', '#573D2F', '#20150F', '#D4AF37')}
  <!-- Dark Walnut Architectural Vignette Background -->
  <rect width="1200" height="800" fill="#1C130D"/>
  
  <!-- Architectural Sandstone Haveli Entrance Portal Structure -->
  <path d="M 280 800 L 280 320 Q 600 80 920 320 L 920 800 Z" fill="#2E1F18" stroke="#52392B" stroke-width="12"/>
  <path d="M 320 800 L 320 340 Q 600 110 880 340 L 880 800 Z" fill="#140D09"/>

  <!-- Left Grand Teak Door Leaf -->
  <rect x="340" y="160" width="250" height="640" fill="url(#woodGrad_hero)"/>
  <rect x="340" y="160" width="250" height="640" fill="url(#grain_hero)"/>
  <!-- Right Grand Teak Door Leaf -->
  <rect x="610" y="160" width="250" height="640" fill="url(#woodGrad_hero)"/>
  <rect x="610" y="160" width="250" height="640" fill="url(#grain_hero)"/>

  <!-- Center Astragal Seal -->
  <rect x="592" y="150" width="16" height="650" fill="#140D09" stroke="#D4AF37" stroke-width="2"/>

  <!-- Intricate CNC Lotus Rosettes on both leaves -->
  <circle cx="465" cy="380" r="70" fill="#24140D" stroke="#D4AF37" stroke-width="3"/>
  <circle cx="465" cy="380" r="45" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="6,4"/>
  <circle cx="465" cy="380" r="16" fill="#D4AF37"/>

  <circle cx="735" cy="380" r="70" fill="#24140D" stroke="#D4AF37" stroke-width="3"/>
  <circle cx="735" cy="380" r="45" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="6,4"/>
  <circle cx="735" cy="380" r="16" fill="#D4AF37"/>

  <!-- Lower Recessed Timber Panels -->
  <rect x="375" y="520" width="180" height="240" rx="4" fill="#20110A" stroke="#D4AF37" stroke-width="2"/>
  <line x1="420" y1="540" x2="420" y2="740" stroke="#D4AF37" stroke-width="2" opacity="0.6"/>
  <line x1="465" y1="540" x2="465" y2="740" stroke="#D4AF37" stroke-width="3" opacity="0.9"/>
  <line x1="510" y1="540" x2="510" y2="740" stroke="#D4AF37" stroke-width="2" opacity="0.6"/>

  <rect x="645" y="520" width="180" height="240" rx="4" fill="#20110A" stroke="#D4AF37" stroke-width="2"/>
  <line x1="690" y1="540" x2="690" y2="740" stroke="#D4AF37" stroke-width="2" opacity="0.6"/>
  <line x1="735" y1="540" x2="735" y2="740" stroke="#D4AF37" stroke-width="3" opacity="0.9"/>
  <line x1="780" y1="540" x2="780" y2="740" stroke="#D4AF37" stroke-width="2" opacity="0.6"/>

  <!-- Brass Door Knockers & Pulls -->
  <circle cx="560" cy="460" r="20" fill="none" stroke="url(#brass_hero)" stroke-width="5"/>
  <circle cx="560" cy="440" r="8" fill="url(#brass_hero)"/>

  <circle cx="640" cy="460" r="20" fill="none" stroke="url(#brass_hero)" stroke-width="5"/>
  <circle cx="640" cy="440" r="8" fill="url(#brass_hero)"/>
</svg>`;
fs.writeFileSync(path.join(outDir, 'hero-door.svg'), heroDoorSvg, 'utf-8');

console.log('Successfully generated all production, category, and door assets.');
