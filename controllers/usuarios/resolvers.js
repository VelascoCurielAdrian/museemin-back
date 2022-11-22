const bd = require('../../models');
const validator = require('./validator');
const MESSAGES = require('./error.message');
const { UserInputError } = require('apollo-server-express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config({ path: '.env' });

const createToken = (UserData, secret, expiresIn) => {
	const { id, nombre, correo, usuario, perfil } = UserData;
	return jwt.sign({ id, nombre, correo, usuario, perfil }, secret, {
		expiresIn,
	});
};

const resolvers = {
	Query: {
		getUsuarioAuth: async (_, {}, ctx) => {
			return ctx.UserData;
		},
		getModulos: async (root, {}, {}) => {
			try {
				const response = await bd.Modulos.findAll({});
				console.log(response);
				return response;
			} catch (error) {
				console.log(error);
				return error;
			}
		},
	},
	Mutation: {
		crearUsuario: async (_, { input }, {}) => {
			try {
				const { isValid, fields, paths } = validator(input);
				if (!isValid)
					throw new UserInputError('Input Error', { fields, paths });
				const usuarioExiste = await bd.Usuarios.count({
					where: { usuario: input.usuario },
				});
				if (usuarioExiste > 0) throw MESSAGES.existeUsuario;
				await bd.Usuarios.create({ ...input });
				return { status: 'Usuario almacenado correctamente' };
			} catch (error) {
				return error;
			}
		},
		authenticarUsuario: async (_, { input }, {}) => {
			try {
				const { usuario, password } = input;
				const { isValid, fields, paths } = validator(input);
				if (!isValid)
					throw new UserInputError('Input Error', { fields, paths });
				const usernameAvailability = await bd.Usuarios.findOne({
					where: { usuario },
					include: [
						{
							model: bd.TipoPerfiles,
							as: 'perfil',
						},
					],
				});
				if (!usernameAvailability) throw MESSAGES.existe;
				const suuccesPassword = await bcrypt.compare(
					password,
					usernameAvailability.password,
				);
				if (!suuccesPassword) throw MESSAGES.password;
				return {
					mensaje: `Bienvenido ${usernameAvailability.dataValues.nombre}`,
					token: createToken(usernameAvailability, process.env.SECRET, '30day'),
				};
			} catch (error) {
				return error;
			}
		},
	},
};

module.exports = resolvers;
