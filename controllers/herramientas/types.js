module.exports = `
  type HerramientaResponse {
    count: Int
    rows: [herramienta]
  }

  type responseHerramienta {
    mensaje: String!
    respuesta: herramienta!
  }

  type herramienta {
    id: ID!
    nombre: String!
    descripcion: String!
    precio: Float!
    marca: String!
    estado: String!
    usuarioRegistroID: ID
    clasificacionID: ID
    clasificacion: clasificacion
    activo: Boolean
    estatus: Boolean
  }

  input herramientaDatos {
    nombre: String!
    descripcion: String!
    precio: Float!
    marca: String!
    usuarioRegistroID: ID
    clasificacionID: ID
    estado: String!
    estatus: Boolean
  }
`;
