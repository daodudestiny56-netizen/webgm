async function check() {
  const html = await fetch('http://localhost:3000/').then(r => r.text());
  const cssUrlMatch = html.match(/href="(\/_next\/static\/chunks\/[^"]+\.css)"/);
  if (cssUrlMatch) {
    const css = await fetch('http://localhost:3000' + cssUrlMatch[1]).then(r => r.text());
    console.log('Contains space-y-14:', css.includes('space-y-14'));
    console.log('Contains space-y-20:', css.includes('space-y-20'));
    console.log('Contains gap-12:', css.includes('gap-12'));
    console.log('Contains gap-16:', css.includes('gap-16'));
  }
}
check();
