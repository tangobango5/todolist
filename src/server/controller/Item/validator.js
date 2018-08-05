import { check, oneOf } from 'express-validator/check';

class ItemValidator {
	static post = [
		check('item.name', 'Name should be atleast 5 characters long.')
			.isLength({ min: 5 }),
		check('item.estimatedEndOn', `Time is not in valid RFC3339 datetime format. Example of a correct datetmie (2018-01-29T20:36:30+00:00).`)
			.isRFC3339()
			.toDate()
	]

	static patch = [
		check('id', 'Not a valid id')
			.isInt().toInt(),
		check('item.status', `Not a valid status. Should be one of ${['added', 'started', 'ended', 'rejected'].join(',')}`)
			.isIn(['added', 'started', 'ended', 'rejected'])
	]
}

export default ItemValidator;
