class UserAddressGateway {
  public async findById(id: string) {
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
}

export { UserAddressGateway };
