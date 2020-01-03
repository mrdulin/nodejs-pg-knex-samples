import * as queries from './';
import { knex } from '../db';

describe('window-function', () => {
  afterAll(done => {
    knex.destroy(done);
  });

  const expectedAvgScoreDataset = [
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
      const rows = await queries.avgscoreUsingJoin(knex);
      expect(rows).toHaveLength(9);
      expect(rows).toEqual(expectedAvgScoreDataset);
    });
  });

  describe('#avgscoreUsingWindowFunction', () => {
    it('should pass', async () => {
      const rows = await queries.avgscoreUsingWindowFunction(knex);
      expect(rows).toHaveLength(9);
    });
  });

  describe('#rowNumber', () => {
    const expectedRowNumberDataset = [
      { row_number: '1', id: 2, subject: 'Chinese', stu_name: 'Westley Steuber IV', score: 70 },
      { row_number: '2', id: 1, subject: 'Chinese', stu_name: 'Cortez Nader', score: 70 },
      { row_number: '3', id: 3, subject: 'Chinese', stu_name: 'Camilla Reilly', score: 80 },
      { row_number: '1', id: 6, subject: 'English', stu_name: 'Marta Homenick', score: 60 },
      { row_number: '2', id: 4, subject: 'English', stu_name: 'Dortha Abbott DDS', score: 75 },
      { row_number: '3', id: 5, subject: 'English', stu_name: 'Claudia Mante', score: 90 },
      { row_number: '1', id: 9, subject: 'Math', stu_name: 'Margret Emmerich DDS', score: 65 },
      { row_number: '2', id: 7, subject: 'Math', stu_name: 'Floyd Auer', score: 80 },
      { row_number: '3', id: 8, subject: 'Math', stu_name: 'Devyn Kessler', score: 99 }
    ];

    it('should pass', async () => {
      const rows = await queries.rowNumber(knex);
      expect(rows).toHaveLength(9);
      expect(rows).toEqual(expectedRowNumberDataset);
    });
  });

  describe('#rank', () => {
    const expectRankDataset = [
      { rank: '1', id: 2, subject: 'Chinese', stu_name: 'Westley Steuber IV', score: 70 },
      { rank: '1', id: 1, subject: 'Chinese', stu_name: 'Cortez Nader', score: 70 },
      { rank: '3', id: 3, subject: 'Chinese', stu_name: 'Camilla Reilly', score: 80 },
      { rank: '1', id: 6, subject: 'English', stu_name: 'Marta Homenick', score: 60 },
      { rank: '2', id: 4, subject: 'English', stu_name: 'Dortha Abbott DDS', score: 75 },
      { rank: '3', id: 5, subject: 'English', stu_name: 'Claudia Mante', score: 90 },
      { rank: '1', id: 9, subject: 'Math', stu_name: 'Margret Emmerich DDS', score: 65 },
      { rank: '2', id: 7, subject: 'Math', stu_name: 'Floyd Auer', score: 80 },
      { rank: '3', id: 8, subject: 'Math', stu_name: 'Devyn Kessler', score: 99 }
    ];
    it('should pass', async () => {
      const rows = await queries.rank(knex);
      expect(rows).toHaveLength(9);
      expect(rows).toEqual(expectRankDataset);
    });
  });

  describe('#firstValue', () => {
    const expectedFirstValueDataset = [
      { first_value: 70, id: 2, subject: 'Chinese', stu_name: 'Westley Steuber IV', score: 70 },
      { first_value: 70, id: 1, subject: 'Chinese', stu_name: 'Cortez Nader', score: 70 },
      { first_value: 70, id: 3, subject: 'Chinese', stu_name: 'Camilla Reilly', score: 80 },
      { first_value: 60, id: 6, subject: 'English', stu_name: 'Marta Homenick', score: 60 },
      { first_value: 60, id: 4, subject: 'English', stu_name: 'Dortha Abbott DDS', score: 75 },
      { first_value: 60, id: 5, subject: 'English', stu_name: 'Claudia Mante', score: 90 },
      { first_value: 65, id: 9, subject: 'Math', stu_name: 'Margret Emmerich DDS', score: 65 },
      { first_value: 65, id: 7, subject: 'Math', stu_name: 'Floyd Auer', score: 80 },
      { first_value: 65, id: 8, subject: 'Math', stu_name: 'Devyn Kessler', score: 99 }
    ];
    it('should pass', async () => {
      const rows = await queries.firstValue(knex);
      expect(rows).toHaveLength(9);
      expect(rows).toEqual(expectedFirstValueDataset);
    });
  });

  describe('#windowAlias', () => {
    it('should pass', async () => {
      const rows = await queries.windowAlias(knex);
      expect(rows).toHaveLength(9);
      expect(rows).toEqual([
        { avg: 73.3333333333333, sum: 220, id: 1, subject: 'Chinese', stu_name: 'Cortez Nader', score: 70 },
        { avg: 73.3333333333333, sum: 220, id: 2, subject: 'Chinese', stu_name: 'Westley Steuber IV', score: 70 },
        { avg: 73.3333333333333, sum: 220, id: 3, subject: 'Chinese', stu_name: 'Camilla Reilly', score: 80 },
        { avg: 75, sum: 225, id: 4, subject: 'English', stu_name: 'Dortha Abbott DDS', score: 75 },
        { avg: 75, sum: 225, id: 5, subject: 'English', stu_name: 'Claudia Mante', score: 90 },
        { avg: 75, sum: 225, id: 6, subject: 'English', stu_name: 'Marta Homenick', score: 60 },
        { avg: 81.3333333333333, sum: 244, id: 7, subject: 'Math', stu_name: 'Floyd Auer', score: 80 },
        { avg: 81.3333333333333, sum: 244, id: 8, subject: 'Math', stu_name: 'Devyn Kessler', score: 99 },
        { avg: 81.3333333333333, sum: 244, id: 9, subject: 'Math', stu_name: 'Margret Emmerich DDS', score: 65 }
      ]);
    });
  });
});
