import { findChannelById, knex } from '.';

afterAll(async () => {
  await knex.destroy();
});

describe('test', () => {
  it('#tfindChannelById', async () => {
    const actualValue = await findChannelById('1');
    console.log('actualValue: ', JSON.stringify(actualValue, null, 2));
  });
});
