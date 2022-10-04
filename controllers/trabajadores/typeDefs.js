module.exports = `
  type Query{
    getAllTrabajador(offset: Int, limit: Int, txtBusqueda: String): TrabajadorResponse!
    getTrabajador(id: ID!): trabajador!
  }
  
  type Mutation {
    createTrabajador(input: trabajadorDatos!): responseTrabajador!
    updateTrabajador(id: ID!, input: trabajadorDatos!): responseTrabajador!
    deleteTrabajador(id: ID): responseTrabajador!
  }
`;
