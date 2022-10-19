const validator = require('./validator');
const MENSAJES = require('./mensajes');
const bd = require('../../models');
const { UserInputError } = require('apollo-server-express');
const { objectFilter, orderFormat } = require('../../helpers/general');
const mensajes = require('./mensajes');

const resolvers = {
	Query: {
		getAllHerramientas: async (
			root,
			{ limit = 25, offset, order = ['id'], txtBusqueda },
		) => {
			try {
				return await bd.Herramientas.findAndCountAll({
					where: {
						[bd.Sequelize.Op.and]: [
							{ activo: true },
							txtBusqueda && {
								[bd.Sequelize.Op.or]: [
									{ nombre: { [bd.Sequelize.Op.iLike]: `%${txtBusqueda}%` } },
									{
										'$clasificacion.descripcion$': {
											[bd.Sequelize.Op.iLike]: `%${txtBusqueda}%`,
										},
									},
								],
							},
						],
					},
					include: [
						{
							model: bd.Clasificaciones,
							as: 'clasificacion',
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
		getHerramienta: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const exist = await bd.Herramientas.count({ where: { id } });
				if (!exist) throw MENSAJES.existeHerramienta;
				return await bd.Herramientas.findOne({
					where: {
						id,
						activo: true,
					},
					include: [
						{
							model: bd.Clasificaciones,
							as: 'clasificacion',
							where: {
								activo: true,
								estatus: true,
							},
						},
					],
				});
			} catch (error) {
				return error;
			}
		},
	},
	Mutation: {
		createHerramienta: async (_, { input }, {}) => {
			try {
				const { clasificacionID } = input;
				const { isValid, fields, paths } = validator(input);
				if (!isValid)
					throw new UserInputError('Input Error', { fields, paths });
				const existeClasificacion = await bd.Clasificaciones.count({
					where: { id: clasificacionID },
				});
				if (!existeClasificacion) throw mensajes.existeClasificacion;
				const dataClasificacion = await bd.Clasificaciones.findOne({
					where: { id: clasificacionID },
				});
				const response = await bd.Herramientas.create({
					...input,
					usuarioRegistroID: 1,
				});

				return {
					mensaje: mensajes.successCreate,
					respuesta: {
						...response.dataValues,
						clasificacion: dataClasificacion.dataValues,
					},
				};
			} catch (error) {
				return error;
			}
		},
		updateHerramienta: async (_, { id, input }, {}) => {
			try {
				const { clasificacionID } = input;
				const { isValid, fields, paths } = validator(input);
				if (!isValid)
					throw new UserInputError('Input Error', { fields, paths });

				const existeHerramienta = await bd.Herramientas.count({
					where: { id, activo: true },
				});
				if (!existeHerramienta) throw mensajes.existeHerramienta;

				const existeClasificacion = await bd.Clasificaciones.count({
					where: { id: clasificacionID, estatus: true, activo: true },
				});
				if (!existeClasificacion) throw mensajes.existeClasificacion;

				const dataClasificacion = await bd.Clasificaciones.findOne({
					where: { id: clasificacionID },
				});

				const response = await bd.Herramientas.update(
					{ ...input, usuarioRegistroID: 1 },
					{
						where: { id },
						returning: true,
						plain: true,
					},
				);

				return {
					mensaje: mensajes.successUpdate,
					respuesta: {
						...response[1].dataValues,
						clasificacion: dataClasificacion.dataValues,
					},
				};
			} catch (error) {
				return error;
			}
		},
		deleteHerramienta: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const existe = await bd.Herramientas.count({ where: { id: id } });
				if (!existe) throw MENSAJES.existeHerramienta;

				await bd.Herramientas.update(
					{ activo: false },
					{
						where: { id },
						returning: true,
						plain: true,
					},
				);

				const response = await bd.Herramientas.findOne({
					where: { id },
					include: [
						{
							model: bd.Clasificaciones,
							as: 'clasificacion',
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
