module.exports = `
  type Query{
    getAllClasificacion(offset: Int, limit: Int): ClasificacionResponse!
    getClasificacion(id: ID!): clasificacion!
  }
  
  type Mutation {
    createClasificacion(input: clasificacionDatos!): responseClasificacion!
    updateClasificacion(id: ID!, input: clasificacionDatos!): responseClasificacion!
    deleteClasificacion(id: ID): responseClasificacion!
  }
`;
