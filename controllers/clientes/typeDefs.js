module.exports = `
  type Query{
    getAllCliente(offset: Int, limit: Int, txtBusqueda: String): ClienteResponse!
    getCliente(id: ID!): cliente!
  }
  
  type Mutation {
    createCliente(input: clienteDatos!): responseCliente!
    updateCliente(id: ID!, input: clienteDatos!): responseCliente!
    deleteCliente(id: ID): responseCliente!
  }
`;
