const { UserInputError } = require('apollo-server');
const { formatError } = require('../../helpers/general');

module.exports = {
	id: new UserInputError('Input Error.', formatError('ID invalido.', 'id')),
	existeTipoServicio: new UserInputError(
		'Input Error.',
		formatError('El servicio no existe.', 'id'),
	),
	existe: new UserInputError(
		'Input Error.',
		formatError('La servicio ya existe.', 'descripcion'),
	),
	successCreate: 'Tipo de servicio almacenado correctamente.',
	successUpdate: 'Tipo de servicio actualizado correctamente.',
	successDelete: 'Tipo de servicio eliminado correctamente.',
};
