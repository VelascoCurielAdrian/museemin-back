module.exports = `
  type Query{
    getAllCountClasificacion(offset: Int, limit: Int): ClasificacionResponse!
    getAllClasificaciones:[clasificacion]
    getClasificacion(id: ID!): clasificacion!
  }
  
  type Mutation {
    createClasificacion(input: clasificacionDatos!): responseClasificacion!
    updateClasificacion(id: ID!, input: clasificacionDatos!): responseClasificacion!
    deleteClasificacion(id: ID): responseClasificacion!
  }
`;
