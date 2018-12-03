import { knex } from '../db-local';

async function getSubordinates(employeeId: number) {
  const sql = `
    with recursive subordinates as (
      select * from employees where employee_id = ?
      union
      select e.* from employees as e
      inner join subordinates as s on s.employee_id = e.employee_manager_id
    ) select * from subordinates;
  `;

  return knex.raw(sql, [employeeId]).get('rows');
}

export { getSubordinates };
