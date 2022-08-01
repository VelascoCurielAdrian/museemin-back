const validator = require('./validator');
const MENSAJES = require('./mensajes');
const { Clasificaciones } = require('../../models');
const { UserInputError } = require('apollo-server');
const { objectFilter, orderFormat } = require('../../helpers/general');
const mensajes = require('./mensajes');

const resolvers = {
	Query: {
		getAllClasificacion: async (root, { limit = 25, offset, order = ['id'] }) => {
			try {
				return await Clasificaciones.findAndCountAll({
					where: {
						activo: true,
						estatus: true,
					},
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
		getClasificacion: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const exist = await Clasificaciones.count({ where: { id } });
				if (!exist) throw MENSAJES.existeClasificacion;
				return await Clasificaciones.findOne({
					where: {
						id,
						activo: true,
						estatus: true,
					},
				});
			} catch (error) {
				return error;
			}
		},
	},
	Mutation: {
		createClasificacion: async (_, { input }, {}) => {
			try {
				const { isValid, fields, paths } = validator(input);
				if (!isValid)
					throw new UserInputError('Input Error', { fields, paths });
				const response = await Clasificaciones.create({ ...input });
				return {
					mensaje: mensajes.successCreate,
					respuesta: response.dataValues,
				};
			} catch (error) {
				return error;
			}
		},
		updateClasificacion: async (_, { id, input }, {}) => {
			try {
				const { isValid, fields, paths } = validator(input);
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const existe = await Clasificaciones.count({ where: { id } });
				if (!existe) throw MENSAJES.existeClasificacion;
				if (!isValid)
					throw new UserInputError('Input Error', { fields, paths });
				const response = await Clasificaciones.update(input, {
					where: { id },
					returning: true,
					plain: true,
				});
				return {
					mensaje: mensajes.successUpdate,
					respuesta: response[1].dataValues,
				};
			} catch (error) {
				return error;
			}
		},
		deleteClasificacion: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const existe = await Clasificaciones.count({ where: { id: id } });
				if (!existe) throw MENSAJES.existeClasificacion;

				const response = await Clasificaciones.update(
					{ activo: false },
					{
						where: { id },
						returning: true,
						plain: true,
					},
				);
				return {
					mensaje: mensajes.successDelete,
					respuesta: response[1].dataValues,
				};
			} catch (error) {
				return error;
			}
		},
	},
};

module.exports = resolvers;
