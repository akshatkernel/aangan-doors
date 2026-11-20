async function test() {
  try {
    const res = await fetch('https://images.unsplash.com/photo-1550684393-8e0b1468ca57?w=100');
    console.log('STATUS:', res.status);
  } catch (err) {
    console.log('NETWORK BLOCKED:', err.message);
  }
}
test();
