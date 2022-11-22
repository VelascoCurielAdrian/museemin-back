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
							where: {
								activo: true,
							},
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
	},
	Mutation: {
		createGastos: async (_, { input }, {}) => {
			try {
				return await SequelizeModel.transaction(async (t) => {
					let DetalleGastos = [];
					const { CapturaDetalleGastos: datosCapturaDetalleGastos } = input;

					const gastoCreated = await bd.Gastos.create({
						...input,
						usuarioRegistroID: 1,
					});

					await Promise.all(
						datosCapturaDetalleGastos.map(async (captura) => {
							const { id } = gastoCreated.dataValues;
							const dataCaptura = await bd.DetalleGastos.create(
								{
									gastoID: id,
									descripcion: captura.descripcion,
									unidad: captura.unidad,
									precio: captura.precio,
									cantidad: captura.cantidad,
									importe: captura.importe,
									activo: captura.activo,
								},
								{ transaction: t },
							);
							DetalleGastos.push(dataCaptura?.dataValues);
						}),
					);

					const { dataValues } = await bd.Gastos.findOne({
						where: {
							id: gastoCreated.dataValues.id,
						},
						include: [
							{
								model: bd.Trabajadores,
								as: 'trabajador',
								where: {
									activo: true,
									estatus: true,
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
					});

					return {
						mensaje: mensajes.successCreate,
						respuesta: {
							...dataValues,
							DetalleGastos,
						},
					};
				});
			} catch (error) {
				console.log(error);
				return error;
			}
		},
		updateGastos: async (_, { id, input }, {}) => {
			try {
				return await SequelizeModel.transaction(async (t) => {
					let detalleGastos = [];
					const { CapturaDetalleGastos: datosCapturaDetalleGastos } = input;

					await bd.Gastos.update(
						{ ...input, usuarioRegistroID: 1 },
						{ where: { id }, returning: true, plain: true },
					);

					await Promise.all(
						datosCapturaDetalleGastos.map(async (captura) => {
							const { id: detalleGastoID, gastoID } = captura;
							if (gastoID) {
								const dataCaptura = await bd.DetalleGastos.update(
									{
										...captura,
									},
									{
										where: { id: detalleGastoID },
										returning: true,
										plain: true,
									},
									{ transaction: t },
								);
								detalleGastos.push(dataCaptura[1].dataValues);
							} else {
								const dataCaptura = await bd.DetalleGastos.create(
									{
										gastoID: id,
										descripcion: captura.descripcion,
										unidad: captura.unidad,
										precio: captura.precio,
										cantidad: captura.cantidad,
										importe: captura.importe,
										activo: captura.activo,
									},
									{ transaction: t },
								);
								detalleGastos.push(dataCaptura.dataValues);
							}
						}),
					);

					const { dataValues } = await bd.Gastos.findOne({
						where: {
							id,
						},
						include: [
							{
								model: bd.Trabajadores,
								as: 'trabajador',
								where: {
									activo: true,
									estatus: true,
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
					});

					return {
						mensaje: mensajes.successUpdate,
						respuesta: {
							...dataValues,
							DetalleGastos: detalleGastos,
						},
					};
				});
			} catch (error) {
				console.log(error);
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
