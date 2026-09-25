import fs from 'node:fs';
import path from 'node:path';

const assets = path.resolve('dist/assets');
if (!fs.existsSync(assets)) throw new Error(`Missing build assets: ${assets}`);

let removed = 0, bytes = 0;
function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.resolve(directory, entry.name);
    if (!full.startsWith(`${assets}${path.sep}`)) throw new Error(`Unexpected build path: ${full}`);
    if (entry.isDirectory()) visit(full);
    else if (entry.isFile() && entry.name.endsWith('.png') && fs.existsSync(full.slice(0, -4) + '.webp')) {
      bytes += fs.statSync(full).size;
      fs.unlinkSync(full);
      removed++;
    }
  }
}
visit(assets);
console.log(`Removed ${removed} superseded PNGs from dist (${(bytes / 1048576).toFixed(1)} MB).`);
