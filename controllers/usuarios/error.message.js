const { UserInputError } = require('apollo-server');
const { formatError } = require('../../helpers/general');

module.exports = {
	id: new UserInputError('Input Error.', formatError('ID invalido.', 'id')),
	existe: new UserInputError(
		'Input Error.',
		formatError('El usuario no existe.', 'usuario'),
	),
	password: new UserInputError(
		'Input Error.',
		formatError('Contraseña Incorrecta.', 'password'),
	),
	existeUsuario: new UserInputError(
		'Input Error.',
		formatError('El usuario ya existente.', 'usuario'),
	),
};
