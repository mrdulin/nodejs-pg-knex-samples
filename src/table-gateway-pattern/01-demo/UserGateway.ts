class UserGateWay {
  public async findById(id: string) {
    const query = `
      select * from users where user_id = ?
    `;
    return this.knex.raw(query, [id]);
  }

  public async findByIdWithAddress(id: string) {
    const query = `
      select
        u.*,
        addr.*
      from users as u
      inner join addresses as addr using (user_id)
      where u.user_id = ?;
    `;
    return this.knex.raw(query, [id]);
  }

  public async findByIdWithOtherTableDatas(id) {
    const query = `
      select
        u.*,
        addr.*,
        orgs.org_name,
      from users as u
      inner join addresses as addr using (user_id)
      inner join organizations as orgs using (org_id)
      where u.user_id = ?;
    `;
    return this.knex.raw(query, [id]);
  }
}

export { UserGateWay };
