'use strict';

const { checkEmptyOrRequired } = require('./../../helpers/general');

const Validator = (input) => {
	const fields = {
		nombre: { empty: false },
		descripcion: { empty: false },
		precio: { empty: false },
		marca: { empty: false },
		estado: { empty: false },
		usuarioRegistroID: { empty: false },
		clasificacionID: { empty: false },
		estatus: { empty: false },
	};

	const response = checkEmptyOrRequired(fields, input);

	if (response.fields.length === 0) return { isValid: true };
	return response;
};

module.exports = Validator;
