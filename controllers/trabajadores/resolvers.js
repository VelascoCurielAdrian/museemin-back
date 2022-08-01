const validator = require('./validator');
const MENSAJES = require('./mensajes');
const { Trabajadores } = require('../../models');
const { UserInputError } = require('apollo-server');
const { objectFilter, orderFormat } = require('../../helpers/general');
const mensajes = require('./mensajes');

const resolvers = {
	Query: {
		getAll: async (root, { limit = 25, offset, order = ['id'] }) => {
			try {
				return await Trabajadores.findAndCountAll({
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
		get: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const exist = await Trabajadores.count({ where: { id } });
				if (!exist) throw MENSAJES.existeTrabajador;
				return await Trabajadores.findOne({
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
		create: async (_, { input }, {}) => {
			try {
				const { isValid, fields, paths } = validator(input);
				if (!isValid)
					throw new UserInputError('Input Error', { fields, paths });
				if (input.telefono && input.telefono.length !== 10)
					throw MENSAJES.telefono;
				const response = await Trabajadores.create({ ...input });
				return {
					mensaje: mensajes.successCreate,
					respuesta: response.dataValues,
				};
			} catch (error) {
				return error;
			}
		},
		update: async (_, { id, input }, {}) => {
			try {
				const { isValid, fields, paths } = validator(input);
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const existe = await Trabajadores.count({ where: { id } });
				if (!existe) throw MENSAJES.existeTrabajador;
				if (!isValid)
					throw new UserInputError('Input Error', { fields, paths });
				if (input.telefono && input.telefono.length !== 10)
					throw MENSAJES.telefono;
				const response = await Trabajadores.update(input, {
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
		delete: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const existe = await Trabajadores.count({ where: { id: id } });
				if (!existe) throw MENSAJES.existeTrabajador;

				const response = await Trabajadores.update(
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
