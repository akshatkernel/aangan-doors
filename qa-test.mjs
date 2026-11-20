import { initialProducts } from './src/data/initialProducts.js';
import { initialCategories } from './src/data/initialCategories.js';
import { initialContent } from './src/data/initialContent.js';
import { initialSettings } from './src/data/initialSettings.js';
import { sanitizePhoneNumber } from './src/utils/whatsapp.js';
import fs from 'fs';
import path from 'path';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('=== AANGAN DOORS COMPREHENSIVE AUDIT & QA SUITE ===\n');

// 1. Check that all 15 products exist and have valid fields
assert(Array.isArray(initialProducts) && initialProducts.length === 15, '15 initial products defined');

const ids = new Set();
const imagesDir = 'C:/aspireai/aangan-doors/public';

initialProducts.forEach((p, idx) => {
  assert(Boolean(p.id && p.id.startsWith('AD-')), `Product #${idx + 1} (${p.id}) has valid ID format`);
  assert(!ids.has(p.id), `Product ID "${p.id}" is unique`);
  ids.add(p.id);

  assert(Boolean(p.name && p.name.length > 2), `Product "${p.id}" has valid name: ${p.name}`);
  assert(Boolean(p.category), `Product "${p.id}" has valid category: ${p.category}`);
  assert(Boolean(p.material), `Product "${p.id}" specifies timber material: ${p.material}`);
  assert(Boolean(p.dimensions), `Product "${p.id}" specifies dimensions`);
  assert(Boolean(p.finish), `Product "${p.id}" specifies finish`);
  assert(Array.isArray(p.images) && p.images.length > 0, `Product "${p.id}" has images array`);

  // Ensure NO living room, sofa, or parking lot images exist
  p.images.forEach((img, i) => {
    assert(!img.includes('photo-1513694203232'), `Product "${p.id}" img #${i+1} is NOT the old living room image`);
    assert(!img.includes('photo-1506521781263'), `Product "${p.id}" img #${i+1} is NOT the old parking lot image`);
    assert(!img.includes('photo-1549488344'), `Product "${p.id}" img #${i+1} is NOT the old generic room image`);
    assert(!img.includes('photo-1581092160607'), `Product "${p.id}" img #${i+1} is NOT the old robot arm image`);

    // Verify local image file actually exists on disk
    if (img.startsWith('/images/')) {
      const diskPath = path.join(imagesDir, img);
      assert(fs.existsSync(diskPath), `Local file exists on disk: ${img}`);
    }
  });
});

// 2. Check that Category covers exist and are valid doors
assert(initialCategories.length === 4, '4 categories defined');
initialCategories.forEach((c) => {
  assert(Boolean(c.image && c.image.startsWith('/images/')), `Category "${c.name}" uses local verified door image (${c.image})`);
  const diskPath = path.join(imagesDir, c.image);
  assert(fs.existsSync(diskPath), `Category image exists on disk: ${c.image}`);
});

// 3. Verify Production Images
const requiredProductionFiles = [
  'production-cad.svg',
  'production-cnc.svg',
  'production-workshop.svg',
  'production-sanding.svg',
  'production-finishing.svg',
  'production-inspection.svg',
  'hero-door.svg',
  'door-fallback.svg'
];

requiredProductionFiles.forEach((file) => {
  const diskPath = path.join(imagesDir, 'images', file);
  assert(fs.existsSync(diskPath), `Production visual exists: /images/${file}`);
});

// 4. Test WhatsApp Sanitizer
assert(sanitizePhoneNumber('917879626597') === '917879626597', 'Sanitizer preserves valid digits');
assert(sanitizePhoneNumber('+91 7879626597') === '917879626597', 'Sanitizer strips spaces and + symbol');
assert(sanitizePhoneNumber('7879626597') === '917879626597', 'Sanitizer prepends 91 to 10-digit Indian numbers');

console.log(`\nQA TEST RESULTS: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
