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

export async function rowNumber(knex: Knex) {
  const query = `
    select row_number() over(partition by subject order by score), * from score;
  `;
  const res = await knex.raw(query);
  return res.rows;
}

export async function rank(knex: Knex) {
  const query = `
    select rank() over(partition by subject order by score), * from score;
  `;
  const res = await knex.raw(query);
  return res.rows;
}

export async function firstValue(knex: Knex) {
  const query = `
    select first_value(score) over(partition by subject order by score), * from score;
  `;
  const res = await knex.raw(query);
  return res.rows;
}

// 窗口函数别名
export async function windowAlias(knex: Knex) {
  const query = `
    select avg(score) over(r), sum(score) over(r), * from score window r as (partition by subject);
  `;
  const res = await knex.raw(query);
  return res.rows;
}
