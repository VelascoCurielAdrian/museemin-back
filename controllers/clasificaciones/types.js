module.exports = `
  type ClasificacionResponse {
    count: Int
    rows: [clasificacion]
  }

  type responseClasificacion {
    mensaje: String!
    respuesta: clasificacion!
  }

  type clasificacion {
    id: ID!
    descripcion: String!
    usuarioRegistroID: ID
    activo: Boolean
    estatus: Boolean
  }

  input clasificacionDatos {
    descripcion: String!
    usuarioRegistroID: ID,
    estatus: Boolean!
  }
`;
