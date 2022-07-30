const { UserInputError } = require('apollo-server');
const { formatError } = require('../../helpers/general');

module.exports = {
	id: new UserInputError('Input Error.', formatError('ID invalido.','id')),
	existeTrabajador: new UserInputError('Input Error.', formatError('El trabajador no existe.','id')),
	existeTelefono: new UserInputError('Input Error.', formatError('Teléfono ya existente.','phone')),
  telefono: new UserInputError('Input Error.', formatError('El teléfono debe de contener 10 digitos.','phone'))
};