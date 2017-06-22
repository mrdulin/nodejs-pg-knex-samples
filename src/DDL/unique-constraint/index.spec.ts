import { knex } from '../db-local';

afterAll(async () => {
  await knex.destroy();
});

describe('unique constrait test suites', () => {
  afterEach(async () => {
    await knex('tableD')
      .where({ table_a_id: null, table_b_id: 1, table_c_id: 1 })
      .del();
  });
  it('t1', async () => {
    await expect(knex('tableD').insert({ table_a_id: 1, table_b_id: null, table_c_id: 1 })).rejects.toThrowError(
      /duplicate key value violates unique constraint "tabled_table_a_id_table_c_id_unique"/
    );
  });

  it('t2', async () => {
    const actualValue = await knex('tableD')
      .insert({ table_a_id: null, table_b_id: 1, table_c_id: 1 })
      .returning('*')
      .get(0);

    expect(actualValue).toEqual(
      expect.objectContaining({
        table_a_id: null,
        table_b_id: 1,
        table_c_id: 1
      })
    );
  });

  it('t3', async () => {
    await expect(knex('tableD').insert({ table_a_id: 1, table_b_id: null, table_c_id: 2 })).rejects.toThrowError(
      /insert or update on table "tableD" violates foreign key constraint "tabled_table_c_id_foreign"/
    );
  });

  it('t4', async () => {
    await expect(knex('tableD').insert({ table_a_id: 1, table_b_id: 1, table_c_id: 1 })).rejects.toThrowError(
      /duplicate key value violates unique constraint "tabled_table_a_id_table_c_id_unique"/
    );
  });
});
