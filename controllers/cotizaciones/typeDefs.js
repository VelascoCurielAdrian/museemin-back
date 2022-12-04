module.exports = `
  type Query{
    getAllCotizaciones(offset: Int, limit: Int, txtBusqueda: String): CotizacionesResponse!
    getCotizaciones(id: ID!): cotizacion!
    getCotizacionCliente(clienteID: ID!): [cotizacion]!
  }
  
  type Mutation {
    createCotizaciones(input: datosCotizaciones): responseCotizaciones
    updateCotizaciones(id: ID, input: datosCotizaciones): responseCotizaciones
    deleteCotizaciones(id: ID): responseCotizaciones
  }
`;
