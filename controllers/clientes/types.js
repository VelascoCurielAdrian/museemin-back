module.exports = `
  type ClienteResponse {
    count: Int
    rows: [cliente]
  }

  type responseCliente {
    mensaje: String!
    respuesta: cliente!
  }

  type cliente {
    id: ID!
    nombre: String!
    primerTelefono: String!
    segundoTelefono: String!
    correo: String!
    domicilio: String!
    usuarioRegistroID: ID!
    activo: Boolean!
    estatus: Boolean!
  }

  input clienteDatos {
    nombre: String!
    primerTelefono: String!
    segundoTelefono: String!
    correo: String!
    domicilio: String!
    usuarioRegistroID: ID,
    estatus: Boolean!
  }
`;
