const validator = require('./validator');
const MENSAJES = require('./mensajes');
const bd = require('../../models');
const { UserInputError } = require('apollo-server-express');
const { objectFilter, orderFormat } = require('../../helpers/general');
const mensajes = require('./mensajes');

const resolvers = {
	Query: {
		getAllCliente: async (
			root,
			{ limit = 25, offset, order = ['id'], txtBusqueda },
		) => {
			try {
				return await bd.Clientes.findAndCountAll({
					where: {
						[bd.Sequelize.Op.and]: [
							{ activo: true },
							txtBusqueda && {
								[bd.Sequelize.Op.or]: [
									{
										nombre: {
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
		getCliente: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const exist = await bd.Clientes.count({
					where: { id, activo: true },
				});
				if (!exist) throw MENSAJES.noExiste;
				return await bd.Clientes.findOne({
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
		createCliente: async (_, { input }, {}) => {
			try {
				const { isValid, fields, paths } = validator(input);
				if (!isValid)
					throw new UserInputError('Input Error', { fields, paths });
				const Existe = await bd.Clientes.count({
					where: { nombre: input.nombre, activo: true, estatus: true },
				});
				if (Existe > 0) throw mensajes.existe;
				const response = await bd.Clientes.create({
					...input,
					usuarioRegistroID: 1,
				});
				return {
					mensaje: mensajes.successCreate,
					respuesta: response.dataValues,
				};
			} catch (error) {
				return error;
			}
		},
		updateCliente: async (_, { id, input }, {}) => {
			try {
				const { isValid, fields, paths } = validator(input);
				if (!isValid)
					throw new UserInputError('Input Error', { fields, paths });
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const existe = await bd.Clientes.count({ where: { id } });
				if (!existe) throw MENSAJES.noExiste;
				const response = await bd.Clientes.update(
					{ ...input, usuarioRegistroID: 1 },
					{
						where: { id },
						returning: true,
						plain: true,
					},
				);
				return {
					mensaje: mensajes.successUpdate,
					respuesta: response[1].dataValues,
				};
			} catch (error) {
				return error;
			}
		},
		deleteCliente: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const existe = await bd.Clientes.count({ where: { id: id } });
				if (!existe) throw MENSAJES.noExiste;
				const response = await bd.Clientes.update(
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
