import { validationResult } from 'express-validator/check';
import { unprocessableEntityError } from '../utils/error';

function errorHandler(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return unprocessableEntityError({errors: errors.array()}, res);
	}

	next();
}

function callNext(req, res, next) {
	next();
}

function validate(checks) {
	if (checks && Array.isArray(checks)) {
		return checks.concat(errorHandler);
	}

	return callNext;
}

export default validate;
