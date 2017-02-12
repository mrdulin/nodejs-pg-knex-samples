import faker from 'faker';

function createDatas() {
  const merchants: any[] = [];
  const products: any[] = [];
  for (let i = 0; i < 5; i++) {
    const merchantName = faker.company.companyName();
    const merchant = {
      name: merchantName
    };
    const product = {
      merchant: merchantName,
      name: faker.commerce.productName(),
      price: Number.parseFloat(faker.commerce.price())
    };
    products.push(product);
    merchants.push(merchant);
  }

  return { products, merchants };
}

export { createDatas };
