import ItemRepository from '../../repository/ItemRepository';
import { response } from '../../repository';

class ItemController {
	static post(req) {
		const { item } = req.body;
		return response(ItemRepository.addItem, [item]);
	}

	static get(req) {
		const {id} = req.params;
		return response(ItemRepository.get, [id]);
	}

	static getAll() {
		return response(ItemRepository.getAll);
	}

	static patch(req) {
		const { item } = req.body;
		const { id } = req.params;
		return response(ItemRepository.edit, [id, item]);
	}
}

export default ItemController;
