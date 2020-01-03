import * as Knex from 'knex';
import faker from 'faker';

export async function seed(knex: Knex): Promise<any> {
  return knex('score')
    .del()
    .then(() => {
      return knex('score').insert([
        { id: 1, subject: 'Chinese', stu_name: faker.name.findName(), score: 70 },
        { id: 2, subject: 'Chinese', stu_name: faker.name.findName(), score: 70 },
        { id: 3, subject: 'Chinese', stu_name: faker.name.findName(), score: 80 },
        { id: 4, subject: 'English', stu_name: faker.name.findName(), score: 75 },
        { id: 5, subject: 'English', stu_name: faker.name.findName(), score: 90 },
        { id: 6, subject: 'English', stu_name: faker.name.findName(), score: 60 },
        { id: 7, subject: 'Math', stu_name: faker.name.findName(), score: 80 },
        { id: 8, subject: 'Math', stu_name: faker.name.findName(), score: 99 },
        { id: 9, subject: 'Math', stu_name: faker.name.findName(), score: 65 }
      ]);
    });
}
