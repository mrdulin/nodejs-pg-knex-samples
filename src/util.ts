import fs from 'fs';
import path from 'path';

function loadSQL(filepath: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), filepath)).toString();
}

export { loadSQL };
