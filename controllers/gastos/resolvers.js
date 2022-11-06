const validator = require('./validator');
const MENSAJES = require('./mensajes');
const bd = require('../../models');
const { objectFilter, orderFormat } = require('../../helpers/general');
const mensajes = require('./mensajes');
const { sequelize: SequelizeModel } = require('../../models');

const resolvers = {
	Query: {
		getAllGastos: async (
			root,
			{ limit = 25, offset, order = ['id'], txtBusqueda },
		) => {
			try {
				return await bd.Gastos.findAndCountAll({
					where: {
						[bd.Sequelize.Op.and]: [
							{ activo: true },
							txtBusqueda && {
								[bd.Sequelize.Op.or]: [
									{
										'$trabajador.nombres$': {
											[bd.Sequelize.Op.iLike]: `%${txtBusqueda}%`,
										},
									},
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
							model: bd.DetalleGastos,
							as: 'DetalleGastos',
						},
						{
							model: bd.Trabajadores,
							as: 'trabajador',
							where: {
								activo: true,
								estatus: true,
							},
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
		getGastos: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const exist = await bd.Gastos.count({ where: { id } });
				if (!exist) throw MENSAJES.existeGasto;
				const response = await bd.Gastos.findOne({
					where: {
						id,
					},
					include: [
						{
							model: bd.DetalleGastos,
							as: 'DetalleGastos',
						},
						{
							model: bd.Trabajadores,
							as: 'trabajador',
							where: {
								activo: true,
								estatus: true,
							},
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
				return { ...response.dataValues };
			} catch (error) {
				return error;
			}
		},
	},
	Mutation: {
		createGastos: async (_, { input }, {}) => {
			try {
				return await SequelizeModel.transaction(async (t) => {
					let DetalleGastos = [];
					const {
						CapturaDetalleGastos: datosCapturaDetalleGastos,
						clienteID,
						trabajadorID,
					} = input;
				
					const { dataValues } = await bd.Gastos.create({
						...input,
					});

					const cliente = await bd.Clientes.findOne({
						where: {
							id: clienteID,
							activo: true,
							estatus: true,
						},
					});

					const trabajador = await bd.Trabajadores.findOne({
						where: {
							id: trabajadorID,
							activo: true,
							estatus: true,
						},
					});

					await Promise.all(
						datosCapturaDetalleGastos.map(async (captura) => {
							const { id } = dataValues;
							const dataCaptura = await bd.DetalleGastos.create(
								{
									gastoID: id,
									descripcion: captura.descripcion,
									precio: parseFloat(captura.precio),
									cantidad: parseInt(captura.cantidad),
									activo: captura.activo
								},
								{ transaction: t },
							);
							DetalleGastos.push(dataCaptura.dataValues);
						}),
					);

					return {
						mensaje: mensajes.successCreate,
						respuesta: {
							...dataValues,
							trabajador: trabajador.dataValues,
							cliente: cliente.dataValues,
							DetalleGastos,
						},
					};
				});
			} catch (error) {
				return error;
			}
		},
		updateGastos: async (_, { id, input }, {}) => {
			try {
				const existeGasto = await bd.Gastos.count({
					where: { id, estatus: true, activo: true },
				});
				if (!existeGasto) throw mensajes.existeGasto;
				return await SequelizeModel.transaction(async (t) => {
					let detalleGastos = [];
					const {
						CapturaDetalleGastos: datosCapturaDetalleGastos,
						clienteID,
						trabajadorID,
					} = input;

					const response = await bd.Gastos.update(
						{ ...input },
						{ where: { id }, returning: true, plain: true },
					);

					const cliente = await bd.Clientes.findOne({
						where: {
							id: clienteID,
							activo: true,
							estatus: true,
						},
					});

					const trabajador = await bd.Trabajadores.findOne({
						where: {
							id: trabajadorID,
							activo: true,
							estatus: true,
						},
					});
				
					await Promise.all(
						datosCapturaDetalleGastos.map(async (captura) => {
							const { id: gastoID } = response[1].dataValues;

							const dataCaptura = await bd.DetalleGastos.update(
								{
									gastoID: id,
									descripcion: captura.descripcion,
									precio: parseFloat(captura.precio),
									cantidad: parseInt(captura.cantidad),
									activo: true
								},
								{ where: { gastoID }, returning: true, plain: true },
								{ transaction: t },
							);
							
							detalleGastos.push(dataCaptura[1].dataValues,);
						}),
					);

					return {
						mensaje: mensajes.successUpdate,
						respuesta: {
							...response[1].dataValues,
							trabajador: trabajador.dataValues,
							cliente: cliente.dataValues,
							DetalleGastos: detalleGastos,
						},
					};
				});
			} catch (error) {
				return error;
			}
		},
		deleteGastos: async (_, { id }, {}) => {
			try {
				const existeGasto = await bd.Gastos.count({
					where: { id, estatus: true, activo: true },
				});
				if (!existeGasto) throw mensajes.existeGasto;

				await bd.Gastos.update(
					{ activo: false },
					{
						where: { id },
						returning: true,
						plain: true,
					},
				);

				const response = await bd.Gastos.findOne({
					where: {
						id,
					},
					include: [
						{
							model: bd.DetalleGastos,
							as: 'DetalleGastos',
						},
						{
							model: bd.Trabajadores,
							as: 'trabajador',
							where: {
								activo: true,
								estatus: true,
							},
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
