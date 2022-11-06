const { UserInputError } = require('apollo-server-express');
const { formatError } = require('../../helpers/general');

module.exports = {
	id: new UserInputError('Input Error.', formatError('ID invalido.', 'id')),
	existe: new UserInputError(
		'Input Error.',
		formatError('EL Gasto ya existe.', 'id'),
	),
	existeHerramienta: new UserInputError(
		'Input Error.',
		formatError('La Herramienta no existe.', 'id'),
	),
	existeGasto: new UserInputError(
		'Input Error.',
		formatError('El gasto no existe.', 'id'),
	),
	successCreate: 'El gasto fue almacenado correctamente.',
	successUpdate: 'El gasto fue actualizado correctamente.',
	successDelete: 'El gasto fue eliminado correctamente.',
};
