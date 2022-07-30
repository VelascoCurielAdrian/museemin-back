module.exports = `
  type Query{
    trabajadores(offset: Int, limit: Int): TrabajadorResponse!
    trabajador(id: ID!): trabajador!
  }
  
  type Mutation {
    crearTrabajador(input: trabajadorDatos!): trabajador!
    ActualizarTrabajador(id: ID!, input: trabajadorDatos!): trabajador!
    EliminarTrabajador(id: ID): trabajador!
  }
`;