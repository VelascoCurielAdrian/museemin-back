const validator = require('./validator');
const MENSAJES = require('./mensajes');
const bd = require('../../models');
const { UserInputError } = require('apollo-server');
const { objectFilter, orderFormat } = require('../../helpers/general');
const mensajes = require('./mensajes');
const { sequelize: SequelizeModel } = require('../../models');

const resolvers = {
	Query: {
		getAllPrestamo: async (root, { limit = 25, offset, order = ['id'] }) => {
			try {
				return await bd.Prestamos.findAndCountAll({
					where: {
						activo: true,
						estatus: true,
					},
					include: [
						{
							model: bd.Trabajadores,
							as: 'trabajador',
							where: { activo: true, estatus: true },
						},
						{
							model: bd.CapturaPrestamosHerramientas,
							include: [
								{
									model: bd.Herramientas,
									as: 'herramienta',
								},
							],
						},
						{
							model: bd.CapturaPrestamosPaqueteHerramientas,
							include: [
								{
									model: bd.PaqueteHerramientas,
									as: 'paqueteHerramienta',
								},
							],
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
		getPrestamo: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const exist = await bd.PaqueteHerramientas.count({ where: { id } });
				if (!exist) throw MENSAJES.existePaqueteHerramienta;
				const response = await bd.PaqueteHerramientas.findOne({
					where: {
						id,
						activo: true,
						estatus: true,
					},
					include: [
						{
							model: bd.CapturaPaqueteHerramientas,
							where: { activo: true, estatus: true },
							include: [
								{
									model: bd.Herramientas,
									as: 'herramienta',
									where: { activo: true, estatus: true },
								},
							],
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
		createPrestamo: async (_, { input }, {}) => {
			try {
				return await SequelizeModel.transaction(async (t) => {
					let herramientasPrestadas = [];
					let paquetesPrestados = [];
					const {
						descripcion,
						estado,
						semana,
						fechaEntrega,
						fechaSalida,
						estatus,
						usuarioRegistroID,
						trabajadorID,
						CapturaPrestamosHerramientas: datosCapturaPrestamoHerramienta,
						CapturaPrestamosPaqueteHerramientas: datosCapturaPrestamoPaquete,
					} = input;

					const { dataValues } = await bd.Prestamos.create({
						descripcion,
						estado,
						semana,
						fechaEntrega,
						fechaSalida,
						estatus,
						usuarioRegistroID,
						trabajadorID,
					});

					await Promise.all(
						datosCapturaPrestamoHerramienta.map(async (captura) => {
							const { id } = dataValues;

							const existeHerramienta = await bd.Herramientas.count({
								where: {
									id: captura.herramientaID,
									estatus: true,
									activo: true,
								},
							});
							if (!existeHerramienta) throw mensajes.existeHerramienta;
							const herramienta = await bd.Herramientas.findOne({
								where: { id: captura.herramientaID },
								transaction: t,
							});

							const dataCaptura = await bd.CapturaPrestamosHerramientas.create(
								{
									prestamoID: id,
									...captura,
								},
								{ transaction: t },
							);

							const herramientas = { herramienta };
							const detallesCaptura = Object.assign(
								dataCaptura.dataValues,
								herramientas,
							);
							herramientasPrestadas.push(detallesCaptura);
						}),

						datosCapturaPrestamoPaquete.map(async (captura) => {
							const { id } = dataValues;

							const existeHerramienta = await bd.PaqueteHerramientas.count({
								where: {
									id: captura.paqueteHerramientaID,
									estatus: true,
									activo: true,
								},
							});
							if (!existeHerramienta) throw mensajes.existeHerramienta;
							const paqueteHerramienta = await bd.PaqueteHerramientas.findOne({
								where: { id: captura.paqueteHerramientaID },
								transaction: t,
							});

							const dataCaptura =
								await bd.CapturaPrestamosPaqueteHerramientas.create(
									{
										prestamoID: id,
										...captura,
									},
									{ transaction: t },
								);

							const paqueteHerramientas = { paqueteHerramienta };
							const detallesCaptura = Object.assign(
								dataCaptura.dataValues,
								paqueteHerramientas,
							);
							paquetesPrestados.push(detallesCaptura);
						}),
					);
					return {
						mensaje: mensajes.successCreate,
						respuesta: {
							...dataValues,
							CapturaPrestamosHerramientas: herramientasPrestadas,
							CapturaPrestamosPaqueteHerramientas: paquetesPrestados,
						},
					};
				});
			} catch (error) {
				return error;
			}
		},
		updatePrestamo: async (_, { id, input }, {}) => {
			try {
				const existePaquete = await bd.PaqueteHerramientas.count({
					where: { id, estatus: true, activo: true },
				});
				if (!existePaquete) throw mensajes.existePaqueteHerramienta;
				return await SequelizeModel.transaction(async (t) => {
					let paquetes = [];
					const {
						descripcion,
						usuarioRegistroID,
						estatus,
						CapturaPaqueteHerramientas: datosCapturaPaqueteHerramientas,
					} = input;

					const response = await bd.PaqueteHerramientas.update(
						{ descripcion, usuarioRegistroID, estatus },
						{ where: { id }, returning: true, plain: true },
					);
					await Promise.all(
						datosCapturaPaqueteHerramientas.map(async (captura) => {
							const { id: idPaquete } = response[1].dataValues;

							const existeHerramienta = await bd.Herramientas.count({
								where: {
									id: captura.herramientaID,
									estatus: true,
									activo: true,
								},
							});
							if (!existeHerramienta) throw mensajes.existeHerramienta;
							const herramienta = await bd.Herramientas.findOne({
								where: { id: captura.herramientaID },
								include: [{ model: bd.Clasificaciones, as: 'clasificacion' }],
								transaction: t,
							});

							const dataCaptura = await bd.CapturaPaqueteHerramientas.create(
								{
									paqueteHerramientaID: idPaquete,
									...captura,
								},
								{ transaction: t },
							);

							const herramientas = { herramienta };
							const detallesCaptura = Object.assign(
								dataCaptura.dataValues,
								herramientas,
							);
							paquetes.push(detallesCaptura);
						}),
					);
					return {
						mensaje: mensajes.successUpdate,
						respuesta: {
							...response[1].dataValues,
							CapturaPaqueteHerramientas: paquetes,
						},
					};
				});
			} catch (error) {
				return error;
			}
		},
		deletePrestamo: async (_, { id }, {}) => {
			try {
				const existePaquete = await bd.PaqueteHerramientas.count({
					where: { id, estatus: true, activo: true },
				});
				if (!existePaquete) throw mensajes.existePaqueteHerramienta;

				await bd.PaqueteHerramientas.update(
					{ activo: false },
					{
						where: { id },
						returning: true,
						plain: true,
					},
				);

				return {
					mensaje: mensajes.successDelete,
				};
			} catch (error) {
				return error;
			}
		},
	},
};

module.exports = resolvers;
