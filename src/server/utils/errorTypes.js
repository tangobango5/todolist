export const INTERNAL_SERVER_ERROR = 500;
export const UNAUTHORIZED_ERROR = 403;
export const UNAUTHENTICATED_ERROR = 401;
export const BADREQUEST_ERROR = 400;
export const UNPROCESSABLE_ERROR = 422;

const genError = (err, type) => {
	if (err === undefined) {
		err = '';
	}

	if (typeof err === 'string') return {message: err, type};
	return {...err, type};
};

export const serverError = err => genError(err, INTERNAL_SERVER_ERROR);
export const unAuthorizedError = err => genError(err, UNAUTHORIZED_ERROR);
export const unauthenticatedError = err => genError(err, UNAUTHENTICATED_ERROR);
export const badRequestError = err => genError(err, BADREQUEST_ERROR);
export const unProcessableEntityError = err => genError(err, UNPROCESSABLE_ERROR);
