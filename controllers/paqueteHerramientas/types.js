module.exports = `
  type PaqueteHerramientaResponse {
    count: Int
    rows: [paqueteHerramienta]
  }

  type responsePaqueteHerramienta {
    mensaje: String!
    respuesta: paqueteHerramienta!
  }

  type paqueteHerramienta {
    id: ID!
    descripcion: String!
    usuarioRegistroID: ID
    CapturaPaqueteHerramientas: [CapturaPaqueteHerramientas]!
    activo: Boolean
    estatus: Boolean
  }

  type CapturaPaqueteHerramientas {
    id: ID!
    descripcion: String!
    herramientaID: ID!
    herramienta: herramienta!
    usuarioRegistroID: ID
    activo: Boolean
    estatus: Boolean
  }

  input datosPaqueteHerramienta {
    descripcion: String!
    CapturaPaqueteHerramientas: [datosCapturaPaqueteHerramientas]!
    usuarioRegistroID: ID
    estatus: Boolean
  }
  
  input datosCapturaPaqueteHerramientas {
    descripcion: String!
    usuarioRegistroID: ID
    herramientaID: ID!
    estatus: Boolean
  }
`;
