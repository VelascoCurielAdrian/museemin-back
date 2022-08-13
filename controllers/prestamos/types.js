module.exports = `
  type PrestamoResponse {
    count: Int
    rows: [prestamo]
  }

  type responsePrestamo {
    mensaje: String!
    respuesta: prestamo!
  }

  type prestamo {
    id: ID!
    descripcion: String!
    estado: String!
    semana: String!
    fechaEntrega: Date
    fechaSalida: Date
    estatus: Boolean
    activo: Boolean
    usuarioRegistroID: ID!
    trabajadorID: ID!
    trabajador: trabajador!
    CapturaPrestamosHerramientas: [capturaPrestamosHerramienta]
    CapturaPrestamosPaqueteHerramientas: [capturaPrestamosPaqueteHerramienta]
  }

  type capturaPrestamosHerramienta {
    id: ID!
    prestamoID: ID!
    herramientaID: ID!
    herramienta: herramienta!
    usuarioRegistroID: ID!
  }

  type capturaPrestamosPaqueteHerramienta {
    id: ID!
    prestamoID: ID!
    paqueteHerramientaID: ID!
    paqueteHerramienta: paqueteHerramienta!
    usuarioRegistroID: ID!
  }

  
  input datosPrestamo {
    descripcion: String!
    estado: String!
    semana: String!
    fechaEntrega: Date
    fechaSalida: Date
    estatus: Boolean
    usuarioRegistroID: ID!
    trabajadorID: ID!
    CapturaPrestamosHerramientas: [datosCapturaPrestamoHerramienta]
    CapturaPrestamosPaqueteHerramientas: [datosCapturaPrestamoPaquete]
  }
  
  input datosCapturaPrestamoHerramienta {
    herramientaID: ID!
    usuarioRegistroID: ID!
  }

  input datosCapturaPrestamoPaquete {
    paqueteHerramientaID: ID!
    usuarioRegistroID: ID!
  }
`;
