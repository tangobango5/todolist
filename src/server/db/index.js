// dummy store
import { serverError } from '../utils/errorTypes';
import { ISODateString } from '../utils/date';

class DB {
	static index = 0;
	static store = { };

	static add(item) {
		return DB.findOneByName(item.name)
			.then(itemWithSameName => {
				if (itemWithSameName) throw serverError(`Duplicate entry for name: ${itemWithSameName.name}`);
				
				const index = ++DB.index;

				item = {...item, id: index};
				DB.store[index] = item;
				return DB.findOneById(index);
			});
	}

	static findOneByName(name) {
		for (const id in DB.store) {
			const item = DB.store[id];
			if (item.name === name)
				return Promise.resolve(DB.sanitize(item));
		}

		return Promise.resolve(null);
	}

	static findByName(name) {
		const result = [];
		for (const id in DB.store) {
			const item = DB.store[id];
			if (item.name === name)
				result.push(item);
		}

		return Promise.resolve(DB.sanitize(result));
	}

	static remove(id) {
		return DB.findOneById(id)
			.then(item => {
				if (item === undefined) {
					throw serverError('Item to be deleted not found');
				}

				delete DB.store[id];
				DB.store = {...DB.store};
				return Promise.resolve(true);
			});
	}

	static sanitize(item) {
		if (Array.isArray(item)) {
			return item.map(it => DB.sanitize(it));
		}

		if (item.estimatedEndOn)
			item.estimatedEndOn = ISODateString(item.estimatedEndOn);
		if (item.createdAt)
			item.createdAt = ISODateString(item.createdAt);
		if (item.startedAt)
			item.startedAt = ISODateString(item.startedAt);
		if (item.endedAt)
			item.endedAt = ISODateString(item.endedAt);
		return item;
	}

	static findOneById(id) {
		const item = this.store[id];
		if (item !== undefined) {
			return Promise.resolve(DB.sanitize(item));
		}

		return Promise.resolve(null);
	}

	static findAll() {
		const store = [];
		for (const id in DB.store) {
			store.push(DB.store[id]);
		}

		return Promise.resolve(DB.sanitize(store));
	}

	static update(id, item) {
		const oldItem = DB.store[id];
		if (oldItem === undefined) {
			throw serverError(`Item with id: ${id} not found`);
		}

		return DB.findByName(item.name)
			.then(items => {
				if (items.length > 1 || (items.length === 1 && items[0].id != id)) {
					throw serverError(`Duplicate entry for name: ${item.name}`);
				}

				const newItem = {
					...oldItem,
					...item,
					id
				};

				DB.store[id] = newItem;
				return DB.sanitize(newItem);
			});
	}
}

export default DB;
