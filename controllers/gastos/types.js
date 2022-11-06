module.exports = `
  type GastosResponse {
    count: Int
    rows: [gastos]
  }

  type responseGastos {
    mensaje: String!
    respuesta: gastos!
  }

  type gastos {
    id: ID!
    trabajadorID: ID!
    clienteID: ID!
    descripcion: String
    compania: String
    fecha: Date
    metodoPago: Int
    importe: Float
    diferencia: Float
    subtotal: Float
    total: Float
    usuarioRegistroID: ID
    trabajador: trabajador!
    cliente: cliente!
    DetalleGastos: [detalleGastos]!
    activo: Boolean
    estatus: Boolean
  }

  type detalleGastos {
    id: ID!
    gastoID: ID
    descripcion: String
    precio: Float!
    cantidad: Int!
    activo: Boolean
  }

  input datosGastos {
    trabajadorID: ID!
    clienteID: ID!
    descripcion: String
    compania: String
    fecha: Date
    metodoPago: Int
    importe: Float
    diferencia: Float
    subtotal: Float
    total: Float
    usuarioRegistroID: ID
    CapturaDetalleGastos: [datosCapturaDetalleGastos]
  }
  
  input datosCapturaDetalleGastos {
    id: ID
    gastoID: ID
    descripcion: String!
    precio: Float!
    cantidad: Int!
    activo: Boolean
  }
`;
