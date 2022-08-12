const { UserInputError } = require('apollo-server');
const { formatError } = require('../../helpers/general');

module.exports = {
	id: new UserInputError('Input Error.', formatError('ID invalido.', 'id')),
	existe: new UserInputError(
		'Input Error.',
		formatError('El cliente ya existe.', 'nombre'),
	),
	noExiste: new UserInputError(
		'Input Error.',
		formatError('El cliente no existe.', 'id'),
	),
	successCreate: 'Cliente almacenado correctamente.',
	successUpdate: 'Cliente actualizado correctamente.',
	successDelete: 'Cliente eliminado correctamente.',
};
