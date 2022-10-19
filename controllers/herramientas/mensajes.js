const { UserInputError } = require('apollo-server-express');
const { formatError } = require('../../helpers/general');

module.exports = {
	id: new UserInputError('Input Error.', formatError('ID invalido.', 'id')),
	existeClasificacion: new UserInputError(
		'Input Error.',
		formatError('La clasificacion no existe.', 'id'),
	),
	existeHerramienta: new UserInputError(
		'Input Error.',
		formatError('La Herramienta no existe.', 'id'),
	),
	successCreate: 'Herramienta almacenada correctamente.',
	successUpdate: 'Herramienta actualizada correctamente.',
	successDelete: 'Herramienta eliminada correctamente.',
};
