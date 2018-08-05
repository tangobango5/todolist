import * as ERRORTYPES from '../utils/errorTypes';
import * as ERROR from '../utils/error';

function response(_repository, params) {
	try{
		const req = response.req;
		const res = response.res;

		if (!_repository) {
			return ERROR.serverError({message: `${_repository} not found`}, res);
		}

		if (!params) params = [];
		params = params.concat([req, res]);

		return _repository.apply({req, res}, params)
			.then(response => res.json(response))
			.catch(error => {
				switch (error.type) {
					case ERRORTYPES.UNAUTHORIZED_ERROR:
						return ERROR.unAuthorizedError(error, res);

					case ERRORTYPES.UNAUTHENTICATED_ERROR:
						return ERROR.unAuthenticatedError(error, res);

					case ERRORTYPES.BADREQUEST_ERROR:
						return ERROR.badRequestError(error, res);

					case ERRORTYPES.UNPROCESSABLE_ERROR:
						return ERROR.unprocessableEntityError(error, res);

					case ERRORTYPES.INTERNAL_SERVER_ERROR:
					default:
						return ERROR.serverError(error, res);
				}
			});
	} catch(err) {
		return ERROR.serverError(err, response.res);
	}
};

const bindResponse = (req, res, next) => {
	response.req = req;
	response.res = res;

	return setTimeout(function(){
		return next(null);
	}, Math.round(Math.random() * 2000));
};

export { response, bindResponse };
