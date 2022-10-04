module.exports = `
  type Query{
    getAllTipoServicios(offset: Int, limit: Int): TipoServicioResponse!
    getTipoServicio(id: ID!): TipoServicio!
  }
  
  type Mutation {
    createTipoServicio(input: TipoServicioDatos!): responseTipoServicio!
    updateTipoServicio(id: ID!, input: TipoServicioDatos!): responseTipoServicio!
    deleteTipoServicio(id: ID): responseTipoServicio!
  }
`;
