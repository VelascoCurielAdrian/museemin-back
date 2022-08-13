const { UserInputError } = require('apollo-server');
const { formatError } = require('../../helpers/general');

module.exports = {
	id: new UserInputError('Input Error.', formatError('ID invalido.', 'id')),
	existe: new UserInputError(
		'Input Error.',
		formatError('EL paquete de herramientas ya existe.', 'id'),
	),
	existeHerramienta: new UserInputError(
		'Input Error.',
		formatError('La Herramienta no existe.', 'id'),
	),
	existePaqueteHerramienta: new UserInputError(
		'Input Error.',
		formatError('El paquete no existe.', 'id'),
	),
	successCreate: 'Prestamo almacenado correctamente.',
	successUpdate: 'Prestamo actualizada correctamente.',
	successDelete: 'Prestamo eliminada correctamente.',
};
