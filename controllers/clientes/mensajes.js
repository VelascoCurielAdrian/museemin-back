const { UserInputError } = require('apollo-server');
const { formatError } = require('../../helpers/general');

module.exports = {
	id: new UserInputError('Input Error.', formatError('ID invalido.', 'id')),
	existeClasificacion: new UserInputError(
		'Input Error.',
		formatError('La clasificacion no existe.', 'id'),
	),
	existe: new UserInputError(
		'Input Error.',
		formatError('La clasificacion ya existe.', 'descripcion'),
	),
	successCreate: 'Clasificacion almacenada correctamente.',
	successUpdate: 'Clasificacion actualizada correctamente.',
	successDelete: 'Clasificacion eliminada correctamente.',
};
