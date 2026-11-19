/**
 * Apply a presentation-only workaround to all generated static HTML pages.
 * Netlify adds the badge iframe at its edge, outside this source repository.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const output = join(process.cwd(), 'public');
const badgeStyle = '<style data-fures-netlify-badge="hidden">#nl-badge-frame{display:none!important}</style>';
let scanned = 0;
let updated = 0;
function visit(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      visit(path);
    } else if (entry.isFile() && /\.html?$/i.test(entry.name)) {
      const html = readFileSync(path, 'utf8');
      if (!/<\/head\s*>/i.test(html)) continue;
      scanned++;
      if (html.includes('data-fures-netlify-badge="hidden"')) continue;
      writeFileSync(path, html.replace(/<\/head\s*>/i, badgeStyle + '\n</head>'), 'utf8');
      updated++;
    }
  }
}

if (!existsSync(output)) {
  console.error('Missing build output: public/');
  process.exit(1);
}
visit(output);
if (!scanned) {
  console.error('No HTML pages in public/.');
  process.exit(1);
}
console.log('Netlify overlay style applied to ' + updated + ' of ' + scanned + ' HTML pages.');
