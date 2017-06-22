import path from 'path';

const seedName = 'merchants_products';

const seedConfig = {
  directory: path.resolve(__dirname, './seeds'),
  extension: 'ts'
};

export { seedName, seedConfig };
