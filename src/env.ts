import dotenv from 'dotenv';
import path from 'path';

const dotenvOutput = dotenv.config({ path: path.resolve(__dirname, '../.env') });
// console.log('dotenvOutput.parsed: ', dotenvOutput.parsed);
