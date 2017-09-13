class UserGateway {
  public async findById(id: string) {
    const query = `
      select * from users where user_id = ?
    `;
    return this.knex.raw(query, [id]);
  }
}

export { UserGateway };
