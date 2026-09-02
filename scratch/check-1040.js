async function check() {
  const html = await fetch('http://localhost:3000/').then(r => r.text());
  const cssUrlMatch = html.match(/href="(\/_next\/static\/chunks\/[^"]+\.css)"/);
  if (cssUrlMatch) {
    const css = await fetch('http://localhost:3000' + cssUrlMatch[1]).then(r => r.text());
    console.log('Contains 1040px:', css.includes('1040px'));
    console.log('Contains max-w-5xl:', css.includes('max-w-5xl'));
    
    // Find all max-w rules in compiled CSS
    const maxWRules = css.match(/\.max-w-[^{]+\{[^}]+\}/g);
    console.log('Max-W rules count:', maxWRules ? maxWRules.length : 0);
    console.log('Sample Max-W rules:', maxWRules ? maxWRules.slice(0, 10) : []);
  } else {
    console.log('No CSS URL match');
  }
}
check();
