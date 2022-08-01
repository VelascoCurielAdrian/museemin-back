module.exports = `
  type Query{
    getAll(offset: Int, limit: Int): TrabajadorResponse!
    get(id: ID!): trabajador!
  }
  
  type Mutation {
    create(input: trabajadorDatos!): response!
    update(id: ID!, input: trabajadorDatos!): response!
    delete(id: ID): response!
  }
`;
