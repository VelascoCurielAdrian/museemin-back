module.exports = `
  type ClasificacionResponse {
    count: Int
    rows: [clasificacion]
  }

  type responseClasificacion {
    mensaje: String!
    respuesta: clasificacion!
  }

  type cliente {
    id: ID!
    nombre: String!
    telefono: String!
    primerTelefono: String!
    segundoTelefono: String!
    correo: String!
    domicilio: String!
    usuarioRegistroID: ID!
    activo: Boolean!
    estatus: Boolean!
  }

  input clasificacionDatos {
    nombre: String!
    telefono: String!
    primerTelefono: String!
    segundoTelefono: String!
    correo: String!
    domicilio: String!
    usuarioRegistroID: ID,
    estatus: Boolean!
  }
`;
