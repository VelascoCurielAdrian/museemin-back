const { UserInputError } = require('apollo-server-express');
const { formatError } = require('../../helpers/general');

module.exports = {
	id: new UserInputError('Input Error.', formatError('ID invalido.', 'id')),
	existeCotizacion: new UserInputError(
		'Input Error.',
		formatError('El gasto no existe.', 'id'),
	),
	successCreate: 'La cotización fue almacenada correctamente.',
	successUpdate: 'La cotización fue actualizada correctamente.',
	successDelete: 'La cotización fue eliminada correctamente.',
};
