module.exports = `
  type Query{
    getAllPaqueteHerramientas(offset: Int, limit: Int, txtBusqueda: String): PaqueteHerramientaResponse!
    getPaqueteHerramienta(id: ID!): paqueteHerramienta!
  }
  
  type Mutation {
    createPaqueteHerramienta(input: datosPaqueteHerramienta!): responsePaqueteHerramienta!
    updatePaqueteHerramienta(id: ID!, input: datosPaqueteHerramienta!): responsePaqueteHerramienta!
    deletePaqueteHerramienta(id: ID): responsePaqueteHerramienta!
  }
`;
