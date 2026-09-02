async function checkPaddingRules() {
  const html = await fetch('http://localhost:3000/workspace').then(r => r.text());
  const cssMatch = html.match(/href="(\/_next\/static\/chunks\/[^"]+\.css)"/);
  const css = await fetch('http://localhost:3000' + cssMatch[1]).then(r => r.text());

  // Search for padding classes
  const regex = /\.[^\s{]+padding[^\s{]+/g;
  const paddingRules = [...css.matchAll(/\.([a-zA-Z0-9\\:\-_]+)\s*\{\s*padding:\s*([^;]+);/g)];
  console.log('Total padding rules found in CSS:', paddingRules.length);
  paddingRules.forEach(r => {
    if (r[1].includes('p-') || r[1].includes('p\\:')) {
      console.log(`Selector: .${r[1]} -> padding: ${r[2]}`);
    }
  });
}
checkPaddingRules().catch(console.error);
