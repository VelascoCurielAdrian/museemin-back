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
    id: ID
    trabajadorID: ID
    clienteID: ID
    descripcion: String
    compania: String
    fecha: Date
    metodoPago: Int
    tipoGasto: Int
    importe: Float
    diferencia: Float
    subTotal: Float
    total: Float
    usuarioRegistroID: ID
    trabajador: trabajador
    cliente: cliente
    DetalleGastos: [detalleGastos]
    activo: Boolean
    estatus: Boolean
  }

  type detalleGastos {
    id: ID
    gastoID: ID
    descripcion: String
    unidad: Int
    precio: Float
    cantidad: Int
    importe: Float
    activo: Boolean
  }

  input datosGastos {
    trabajadorID: ID
    clienteID: ID
    descripcion: String
    compania: String
    fecha: Date
    metodoPago: Int
    tipoGasto: Int
    importe: Float
    diferencia: Float
    subTotal: Float
    total: Float
    usuarioRegistroID: ID
    CapturaDetalleGastos: [datosCapturaDetalleGastos]
  }
  
  input datosCapturaDetalleGastos {
    id: ID
    gastoID: ID
    descripcion: String
    unidad: Int
    precio: Float
    cantidad: Int
    importe: Float
    activo: Boolean
  }
`;
