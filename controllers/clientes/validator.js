'use strict';

const { checkEmptyOrRequired } = require('./../../helpers/general');

const Validator = (input) => {
	const fields = {
		descripcion: { empty: false },
		nombre: { empty: false },
    telefono: { empty: false },
    primerTelefono: { empty: false },
    segundoTelefono: { empty: false },
    correo: { empty: false },
	};

	const response = checkEmptyOrRequired(fields, input);

	if (response.fields.length === 0) return { isValid: true };
	return response;
};

module.exports = Validator;
