import express from 'express';
import routes from './routes';
import { startServer } from './engine';
import NotFoundController from './controller/NotFoundController';

const server = express();

server
.disable('x-powered-by')
.use(express.urlencoded({ extended: true }))
.use(express.json())
.use('/api/v1', routes)
.use('*', NotFoundController.json);

startServer(server);
