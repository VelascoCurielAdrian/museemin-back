module.exports = `
  type TrabajadorResponse {
    count: Int
    rows: [trabajador]
  }

  type response {
    mensaje: String!
    respuesta: trabajador!
  }

  type trabajador{
    id: ID!
    nombres: String!
    primerApellido: String!
    segundoApellido: String!
    telefono: String!
    correo: String!
    colonia: String
    calles: String
    referencia: String
    numeroExterior: String
    usuarioRegistroID: ID
    activo: Boolean
    estatus: Boolean
  }

  input trabajadorDatos {
    nombres: String!
    primerApellido: String!
    segundoApellido: String!
    telefono: String!
    correo: String!
    colonia: String
    calles: String
    referencia: String
    numeroExterior: String
    usuarioRegistroID: ID
  }
`;
