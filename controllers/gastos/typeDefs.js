module.exports = `
  type Query{
    getAllGastos(offset: Int, limit: Int, txtBusqueda: String): GastosResponse!
    getGastos(id: ID!): gastos!
  }
  
  type Mutation {
    createGastos(input: datosGastos): responseGastos
    updateGastos(id: ID, input: datosGastos): responseGastos
    deleteGastos(id: ID): responseGastos
  }
`;
