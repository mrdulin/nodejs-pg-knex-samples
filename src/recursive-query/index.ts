import { knex } from '../db-local';

async function getSubordinates(employeeId: number) {
  const sql = `
    with recursive subordinates as (
      select * from employees where employee_id = ?
      union
      select e.* from employees as e inner join subordinates as s on s.employee_id = e.employee_manager_id
    )
    select * from subordinates;
  `;

  return knex.raw(sql, [employeeId]).get('rows');
}

async function getAllCampaigns(organizationId: number) {
  // const sql = `
  //   with recursive suborgs as (
  //     select * from organizations where parent_id = (select parent_id from organizations where organization_id = ?)
  //     union
  //     select o.* from organizations as o
  //     inner join suborgs as so on so.organization_id = o.parent_id
  //   )
  //   select * from suborgs;
  // `;

  const sql = `
    select c.* from organizations as o1
    inner join organizations as o2 on o1.parent_id = o2.parent_id
    inner join locations as loc on loc.organization_id = o1.organization_id
    inner join campaigns as c on c.location_id = loc.location_id
    where o2.organization_id = ?;
  `;

  return knex.raw(sql, [organizationId]).get('rows');
}

export { getSubordinates, getAllCampaigns };
