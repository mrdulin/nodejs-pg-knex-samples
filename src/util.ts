import fs from 'fs';

function loadSQL(filepath: string): string {
  return fs.readFileSync(filepath).toString();
}

export { loadSQL };
