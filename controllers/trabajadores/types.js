module.exports = `
  type TrabajadorResponse {
    count: Int
    rows: [trabajador]
  }

  type responseTrabajador {
    mensaje: String!
    respuesta: trabajador!
  }

  type trabajador{
    id: ID!
    nombres: String!
    primerApellido: String!
    segundoApellido: String!
    sexo: String!
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
    sexo: String!
    telefono: String!
    correo: String!
    colonia: String
    calles: String
    referencia: String
    numeroExterior: String
    usuarioRegistroID: ID
    estatus: Boolean!
  }
`;
