module.exports = `
  type Query{
    getAllHerramientas(offset: Int, limit: Int): HerramientaResponse!
    getHerramienta(id: ID!): herramienta!
  }
  
  type Mutation {
    createHerramienta(input: herramientaDatos!): responseHerramienta!
    updateHerramienta(id: ID!, input: herramientaDatos!): responseHerramienta!
    deleteHerramienta(id: ID): responseHerramienta!
  }
`;
