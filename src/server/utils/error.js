const genError = (err, res, status) => {
	const error = {
		success: false,
		status,
		error: true,
		message: err.message,
		stack: err
	};

	if (err.errors) {
		error.errors = err.errors;
		error.stack = { };
	}

	if (res) {
		return res.status(status).json(error);
	} else {
		return error;
	}
};

export const serverError = (err, res, status = 500) => {
	return genError(err, res, status);
};

export const validationError = (err, res, status = 400) => {
	return genError(err, res, status);
}

export const notFoundError = (res, status = 404) => {
	const err = {
		message: 'Sorry, resource you were looking on our server was not found!'
	};

	return genError(err, res, status);
}

export const unAuthorizedError = (err, res, status = 403) => {
	if (!err) {
		err = {
			message: 'Sorry, you are not authorized to access this resource!'
		};
	}

	return genError(err, res, status);
};

export const unAuthenticatedError = (err, res, status = 401) => {
	if (!err) {
		err = { message: 'Sorry, you are not authnticated to access this resource!' };
	}

	return genError(err, res, status);
}

export const badRequestError = (err, res, status = 400) => {
	if (!err) {
		err = {message: 'Bad Request, try again'};
	}

	return genError(err, res, status);
};

export const unprocessableEntityError = (err, res, status = 422) => {
	if (!err) {
		err = {message: 'Unprocessable Entity'};
	}

	if (err.errors) {
		if (err.errors.length) {
			const errors = err.errors[0];
			err = {
				...err,
				...errors,
				message: errors.msg
			};

			delete err.errors;
		} else {
			delete err.errors;
		}
	}

	return genError(err, res, status);
};
