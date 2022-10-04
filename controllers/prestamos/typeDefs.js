module.exports = `
  type Query{
    getAllPrestamo(offset: Int, limit: Int, txtBusqueda: String): PrestamoResponse!
    getPrestamo(id: ID!): prestamo!
  }
  
  type Mutation {
    createPrestamo(input: datosPrestamo!): responsePrestamo!
    updatePrestamo(id: ID!, input: datosPrestamo!): responsePrestamo!
    deletePrestamo(id: ID): responsePrestamo!
  }
`;
