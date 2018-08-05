import express from 'express';
import * as Item from '../controller/Item';
import validate from '../validator';
import NotFoundController from '../controller/NotFoundController';
import { bindResponse } from '../repository';

const router = express.Router();

router.use(bindResponse);
router.post('/item', validate(Item.validator.post), Item.controller.post);
router.get('/item', Item.controller.getAll);
router.get('/item/:id', Item.controller.get);
router.patch('/item/:id', validate(Item.validator.patch), Item.controller.patch);

router.use('*', NotFoundController.json);

export default router;
