module.exports = `
  type TrabajadorResponse {
    count: Int
    rows: [trabajador]
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