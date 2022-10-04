const validator = require('./validator');
const MENSAJES = require('./mensajes');
const bd = require('../../models');
const { UserInputError } = require('apollo-server');
const { objectFilter, orderFormat } = require('../../helpers/general');

const resolvers = {
	Query: {
		getAllTipoServicios: async (
			root,
			{ limit = 25, offset, order = ['id'] },
		) => {
			try {
				return await bd.TipoServicios.findAndCountAll({
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
		getTipoServicio: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const exist = await bd.TipoServicios.count({ where: { id } });
				if (!exist) throw MENSAJES.existeTipoServicio;
				return await bd.TipoServicios.findOne({
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
		createTipoServicio: async (_, { input }, {}) => {
			try {
				const { isValid, fields, paths } = validator(input);
				if (!isValid)
					throw new UserInputError('Input Error', { fields, paths });
				const Existe = await bd.TipoServicios.count({
					where: {
						descripcion: input.descripcion,
						estatus: true,
						activo: true,
					},
				});
				if (Existe > 0) throw MENSAJES.existe;
				const response = await bd.TipoServicios.create({ ...input });
				return {
					mensaje: MENSAJES.successCreate,
					respuesta: response.dataValues,
				};
			} catch (error) {
				return error;
			}
		},
		updateTipoServicio: async (_, { id, input }, {}) => {
			try {
				const { isValid, fields, paths } = validator(input);
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const existe = await bd.TipoServicios.count({ where: { id } });
				if (!existe) throw MENSAJES.existeTipoServicio;
				if (!isValid)
					throw new UserInputError('Input Error', { fields, paths });
				const response = await bd.TipoServicios.update(input, {
					where: { id },
					returning: true,
					plain: true,
				});
				return {
					mensaje: MENSAJES.successUpdate,
					respuesta: response[1].dataValues,
				};
			} catch (error) {
				return error;
			}
		},
		deleteTipoServicio: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const existe = await bd.TipoServicios.count({ where: { id: id } });
				if (!existe) throw MENSAJES.existeTipoServicio;

				const response = await bd.TipoServicios.update(
					{ activo: false },
					{
						where: { id },
						returning: true,
						plain: true,
					},
				);
				return {
					mensaje: MENSAJES.successDelete,
					respuesta: response[1].dataValues,
				};
			} catch (error) {
				return error;
			}
		},
	},
};

module.exports = resolvers;
