module.exports = `
  type Query{
    getAllCliente(offset: Int, limit: Int): ClienteResponse!
    getCliente(id: ID!): cliente!
  }
  
  type Mutation {
    createCliente(input: clienteDatos!): responseCliente!
    updateCliente(id: ID!, input: clienteDatos!): responseCliente!
    deleteCliente(id: ID): responseCliente!
  }
`;
