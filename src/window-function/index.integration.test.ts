import * as queries from './';
import { knex } from '../db';

describe('window-function', () => {
  afterAll(done => {
    knex.destroy(done);
  });

  const expectedDataset = [
    { id: 1, subject: 'Chinese', stu_name: 'Cortez Nader', score: 70, avgscore: 73.3333333333333 },
    { id: 2, subject: 'Chinese', stu_name: 'Westley Steuber IV', score: 70, avgscore: 73.3333333333333 },
    { id: 3, subject: 'Chinese', stu_name: 'Camilla Reilly', score: 80, avgscore: 73.3333333333333 },
    { id: 4, subject: 'English', stu_name: 'Dortha Abbott DDS', score: 75, avgscore: 75 },
    { id: 5, subject: 'English', stu_name: 'Claudia Mante', score: 90, avgscore: 75 },
    { id: 6, subject: 'English', stu_name: 'Marta Homenick', score: 60, avgscore: 75 },
    { id: 7, subject: 'Math', stu_name: 'Floyd Auer', score: 80, avgscore: 81.3333333333333 },
    { id: 8, subject: 'Math', stu_name: 'Devyn Kessler', score: 99, avgscore: 81.3333333333333 },
    { id: 9, subject: 'Math', stu_name: 'Margret Emmerich DDS', score: 65, avgscore: 81.3333333333333 }
  ];

  describe('#avgscoreUsingJoin', () => {
    it('should pass', async () => {
      expect.assertions(2);
      const rows = await queries.avgscoreUsingJoin(knex);
      expect(rows).toHaveLength(9);
      expect(rows).toEqual(expectedDataset);
    });
  });

  describe('#avgscoreUsingWindowFunction', () => {
    it('should pass', async () => {
      expect.assertions(2);
      const rows = await queries.avgscoreUsingWindowFunction(knex);
      expect(rows).toHaveLength(9);
      expect(rows).toEqual(expectedDataset);
    });
  });
});
