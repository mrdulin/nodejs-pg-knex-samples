import Knex = require('knex');

// 查询每名学生的学习成绩并且显示课程的平均分

export async function avgscoreUsingJoin(knex: Knex) {
  const query = `
    select *
    from score as s
    left join (select subject, avg(score) as avgscore from score group by subject) as tmp on s.subject = tmp.subject;
  `;
  const res = await knex.raw(query);
  return res.rows;
}

export async function avgscoreUsingWindowFunction(knex: Knex) {
  const query = `
    select *, avg(score) over(partition by subject) as avgscore from score;
  `;
  const res = await knex.raw(query);
  return res.rows;
}
