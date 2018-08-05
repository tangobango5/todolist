import DB from '../db';
import { badRequestError, unProcessableEntityError } from '../utils/errorTypes';

class ItemRepository {
	static addItem(item) {
		item = {
			name: item.name,
			status: 'added',
			estimatedEndOn: new Date(item.estimatedEndOn).getTime(),
			createdAt: Date.now()
		}
		return DB.add(item);
	}

	static get(id) {
		return DB.findOneById(id);
	}

	static getAll() {
		return DB.findAll();
	}

	static edit(id, item) {
		if (item.status === 'started') {
			item = {
				status: item.status,
				startedAt: Date.now()
			};

			return DB.findOneById(id)
				.then(oldItem => {
					if (oldItem.startedAt) throw unProcessableEntityError('Item already started');
					if (oldItem.endedAt) throw unProcessableEntityError('Item already ended');

					return DB.update(id, item);
				});
		} else if (item.status === 'ended') {
			const endTime = Date.now();
			item = {
				status: item.status,
				endedAt: endTime
			};

			return DB.findOneById(id)
				.then(oldItem => {
					if (!oldItem.startedAt) throw unProcessableEntityError('Item not started');
					if (new Date(oldItem.startedAt).getTime() > endTime) throw('End time cannot ne less than start time');

					return DB.update(id, item);
				});
		} else {
			throw badRequestError('Invalid Request');
		}
	}
}

export default ItemRepository;
