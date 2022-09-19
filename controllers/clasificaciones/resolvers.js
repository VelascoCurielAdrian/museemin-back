const validator = require("./validator");
const MENSAJES = require("./mensajes");
const bd = require("../../models");
const { UserInputError } = require("apollo-server");
const { objectFilter, orderFormat } = require("../../helpers/general");

const resolvers = {
	Query: {
		getAllCountClasificacion: async (
			root,
			{ limit = 25, offset, order = ["id"] },
		) => {
			try {
				return await bd.Clasificaciones.findAndCountAll({
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
				const exist = await bd.Clasificaciones.count({ where: { id } });
				if (!exist) throw MENSAJES.existeClasificacion;
				return await bd.Clasificaciones.findOne({
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
		getAllClasificaciones: async (_, { id }, {}) => {
			try {
				const response = await bd.Clasificaciones.findAll({
					where: {
						activo: true,
						estatus: true,
					},
				});
				return response;
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
					throw new UserInputError("Input Error", { fields, paths });
				const Existe = await bd.Clasificaciones.count({
					where: { descripcion: input.descripcion },
				});
				if (Existe > 0) throw MENSAJES.existe;
				const response = await bd.Clasificaciones.create({ ...input });
				return {
					mensaje: MENSAJES.successCreate,
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
				const existe = await bd.Clasificaciones.count({ where: { id } });
				if (!existe) throw MENSAJES.existeClasificacion;
				if (!isValid)
					throw new UserInputError("Input Error", { fields, paths });
				const response = await bd.Clasificaciones.update(input, {
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
		deleteClasificacion: async (_, { id }, {}) => {
			try {
				if (isNaN(parseInt(id))) throw MENSAJES.id;
				const existe = await bd.Clasificaciones.count({ where: { id: id } });
				if (!existe) throw MENSAJES.existeClasificacion;

				const response = await bd.Clasificaciones.update(
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
