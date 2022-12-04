module.exports = `
  type CotizacionesResponse {
    count: Int
    rows: [cotizacion]
  }

  type responseCotizaciones {
    mensaje: String!
    respuesta: cotizacion!
  }

  type cotizacion {
    id: ID
    clienteID: ID
    descripcion: String
    fecha: Date
    proceso: Int
    subTotal: Float
    usuarioRegistroID: ID
    cliente: cliente
    CotizacionDetalles: [cotizacionDetalles]
    activo: Boolean
    estatus: Boolean
  }

  type cotizacionDetalles {
    id: ID
    cotizacionID: ID
    descripcion: String
    unidad: Int
    precio: Float
    cantidad: Int
    importe: Float
    activo: Boolean
  }

  input datosCotizaciones {
    clienteID: ID
    descripcion: String
    fecha: Date
    proceso: Int
    subTotal: Float
    usuarioRegistroID: ID
    CapturaCotizacionesDetalles: [datosCapturaDetalleCotizaciones]
  }
  
  input datosCapturaDetalleCotizaciones {
    id: ID
    cotizacionID: ID
    descripcion: String
    unidad: Int
    precio: Float
    cantidad: Int
    importe: Float
    activo: Boolean
  }
`;
