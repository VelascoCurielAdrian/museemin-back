module.exports = `
  type TipoServicioResponse {
    count: Int
    rows: [TipoServicio]
  }

  type responseTipoServicio {
    mensaje: String!
    respuesta: TipoServicio!
  }

  type TipoServicio {
    id: ID!
    descripcion: String!
    usuarioRegistroID: ID!
    activo: Boolean
    estatus: Boolean
  }

  input TipoServicioDatos {
    descripcion: String!
    usuarioRegistroID: ID,
    estatus: Boolean!
  }
`;
