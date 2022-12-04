const MENSAJES = require('./mensajes');
const bd = require('../../models');
const { objectFilter, orderFormat } = require('../../helpers/general');
const mensajes = require('./mensajes');
const { sequelize: SequelizeModel } = require('../../models');

const resolvers = {
	Query: {
		getAllCotizaciones: async (
			root,
			{ limit = 25, offset, order = ['id'], txtBusqueda },
		) => {
			try {
				return await bd.Cotizaciones.findAndCountAll({
					where: {
						[bd.Sequelize.Op.and]: [
							{ activo: true },
							txtBusqueda && {
								[bd.Sequelize.Op.or]: [
									{
										'$cliente.nombre$': {
											[bd.Sequelize.Op.iLike]: `%${txtBusqueda}%`,
										},
									},
								],
							},
						],
					},
					include: [
						{
							model: bd.CotizacionDetalles,
							as: 'CotizacionDetalles',
							where: {
								activo: true,
							},
						},
						{
							required: false,
							model: bd.Clientes,
							as: 'cliente',
							where: {
								activo: true,
								estatus: true,
							},
						},
					],
					order: orderFormat(order),
					...objectFilter({
						offset: offset * limit,
						limit: limit > 0 ? limit : null,
					}),
				}).then((data) => {
					return {
						count: data.count,
						rows: data.rows,
					};
				});
			} catch (error) {
				return error;
			}
		},
		getCotizaciones: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const exist = await bd.Cotizaciones.count({ where: { id } });
				if (!exist) throw MENSAJES.existeCotizacion;
				const response = await bd.Cotizaciones.findOne({
					where: {
						id,
					},
					include: [
						{
							model: bd.CotizacionDetalles,
							as: 'CotizacionDetalles',
							where: {
								activo: true,
							},
						},
					],
				});
				return { ...response.dataValues };
			} catch (error) {
				return error;
			}
		},
		getCotizacionCliente: async (_, { clienteID }, {}) => {
			try {
				const response = await bd.Cotizaciones.findAll({
					where: {
						clienteID,
						proceso: 3
					},
				});
				return response;
			} catch (error) {
				return error;
			}
		},
	},
	Mutation: {
		createCotizaciones: async (_, { input }, {}) => {
			try {
				return await SequelizeModel.transaction(async (t) => {
					let cotizacionDetalle = [];
					const {
						CapturaCotizacionesDetalles: datosCapturaDetalleCotizaciones,
					} = input;

					const cotizacionCreated = await bd.Cotizaciones.create({
						...input,
						usuarioRegistroID: 1,
					});

					await Promise.all(
						datosCapturaDetalleCotizaciones.map(async (captura) => {
							const { id } = cotizacionCreated.dataValues;
							const dataCaptura = await bd.CotizacionDetalles.create(
								{
									cotizacionID: id,
									descripcion: captura.descripcion,
									unidad: captura.unidad,
									precio: captura.precio,
									cantidad: captura.cantidad,
									importe: captura.importe,
									activo: captura.activo,
								},
								{ transaction: t },
							);
							cotizacionDetalle.push(dataCaptura?.dataValues);
						}),
					);

					const { dataValues } = await bd.Cotizaciones.findOne({
						where: {
							id: cotizacionCreated.dataValues.id,
						},
						include: [
							{
								required: false,
								model: bd.Clientes,
								as: 'cliente',
								where: {
									activo: true,
									estatus: true,
								},
							},
						],
					});

					return {
						mensaje: mensajes.successCreate,
						respuesta: {
							...dataValues,
							CotizacionDetalles: cotizacionDetalle,
						},
					};
				});
			} catch (error) {
				console.log(error);
				return error;
			}
		},
		updateCotizaciones: async (_, { id, input }, {}) => {
			try {
				return await SequelizeModel.transaction(async (t) => {
					let cotizacionDetalle = [];
					const {
						CapturaCotizacionesDetalles: datosCapturaDetalleCotizaciones,
					} = input;

					await bd.Cotizaciones.update(
						{ ...input, usuarioRegistroID: 1 },
						{ where: { id }, returning: true, plain: true },
					);

					await Promise.all(
						datosCapturaDetalleCotizaciones.map(async (captura) => {
							const { id: detalleCotizacionID, cotizacionID } = captura;
							if (cotizacionID) {
								const dataCaptura = await bd.CotizacionDetalles.update(
									{
										...captura,
									},
									{
										where: { id: detalleCotizacionID },
										returning: true,
										plain: true,
									},
									{ transaction: t },
								);
								cotizacionDetalle.push(dataCaptura[1].dataValues);
							} else {
								const dataCaptura = await bd.CotizacionDetalles.create(
									{
										cotizacionID: id,
										descripcion: captura.descripcion,
										unidad: captura.unidad,
										precio: captura.precio,
										cantidad: captura.cantidad,
										importe: captura.importe,
										activo: captura.activo,
									},
									{ transaction: t },
								);
								cotizacionDetalle.push(dataCaptura.dataValues);
							}
						}),
					);

					const { dataValues } = await bd.Cotizaciones.findOne({
						where: {
							id,
						},
						include: [
							{
								required: false,
								model: bd.Clientes,
								as: 'cliente',
								where: {
									activo: true,
									estatus: true,
								},
							},
						],
					});

					return {
						mensaje: mensajes.successUpdate,
						respuesta: {
							...dataValues,
							CotizacionDetalles: cotizacionDetalle,
						},
					};
				});
			} catch (error) {
				console.log(error);
				return error;
			}
		},
		deleteCotizaciones: async (_, { id }, {}) => {
			try {
				const existeGasto = await bd.Cotizaciones.count({
					where: { id, estatus: true, activo: true },
				});
				if (!existeGasto) throw mensajes.existeGasto;

				await bd.Cotizaciones.update(
					{ activo: false },
					{
						where: { id },
						returning: true,
						plain: true,
					},
				);

				const response = await bd.Cotizaciones.findOne({
					where: {
						id,
					},
					include: [
						{
							model: bd.CotizacionDetalles,
							as: 'CotizacionDetalles',
						},
						{
							model: bd.Clientes,
							as: 'cliente',
							where: {
								activo: true,
								estatus: true,
							},
						},
					],
				});

				return {
					mensaje: mensajes.successDelete,
					respuesta: response,
				};
			} catch (error) {
				return error;
			}
		},
	},
};

module.exports = resolvers;
