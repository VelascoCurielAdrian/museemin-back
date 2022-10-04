const validator = require('./validator');
const MENSAJES = require('./mensajes');
const bd = require('../../models');
const { UserInputError } = require('apollo-server');
const { objectFilter, orderFormat } = require('../../helpers/general');
const mensajes = require('./mensajes');

const resolvers = {
	Query: {
		getAllTrabajador: async (
			root,
			{ limit, offset, order = ['id'], txtBusqueda },
		) => {
			try {
				return await bd.Trabajadores.findAndCountAll({
					where: {
						[bd.Sequelize.Op.and]: [
							{ activo: true },
							txtBusqueda && {
								[bd.Sequelize.Op.or]: [
									{
										nombres: {
											[bd.Sequelize.Op.iLike]: `%${txtBusqueda}%`,
										},
									},
									{
										primerApellido: {
											[bd.Sequelize.Op.iLike]: `%${txtBusqueda}%`,
										},
									},
									{
										segundoApellido: {
											[bd.Sequelize.Op.iLike]: `%${txtBusqueda}%`,
										},
									},
								],
							},
						],
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
		getTrabajador: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const exist = await bd.Trabajadores.count({ where: { id } });
				if (!exist) throw MENSAJES.existeTrabajador;
				return await bd.Trabajadores.findOne({
					where: {
						id,
						activo: true,
					},
				});
			} catch (error) {
				return error;
			}
		},
	},
	Mutation: {
		createTrabajador: async (_, { input }, {}) => {
			try {
				const { isValid, fields, paths } = validator(input);
				if (!isValid)
					throw new UserInputError('Input Error', { fields, paths });
				if (input.telefono && input.telefono.length !== 10)
					throw MENSAJES.telefono;
				const response = await bd.Trabajadores.create({ ...input });
				return {
					mensaje: mensajes.successCreate,
					respuesta: response.dataValues,
				};
			} catch (error) {
				return error;
			}
		},
		updateTrabajador: async (_, { id, input }, {}) => {
			try {
				const { isValid, fields, paths } = validator(input);
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const existe = await bd.Trabajadores.count({ where: { id } });
				if (!existe) throw MENSAJES.existeTrabajador;
				if (!isValid)
					throw new UserInputError('Input Error', { fields, paths });
				if (input.telefono && input.telefono.length !== 10)
					throw MENSAJES.telefono;
				const response = await bd.Trabajadores.update(input, {
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
		deleteTrabajador: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const existe = await bd.Trabajadores.count({ where: { id: id } });
				if (!existe) throw MENSAJES.existeTrabajador;
				const response = await bd.Trabajadores.update(
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
