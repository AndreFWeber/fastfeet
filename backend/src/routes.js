import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import SessionController from './app/controllers/sessionController';
import AuthConfig from './app/middlewares/auth';
import UserController from './app/controllers/userController';
import RecipientController from './app/controllers/recipientController';
import FileController from './app/controllers/fileController';
import DeliveryPersonController from './app/controllers/deliveryPersonController';
import DeliveryPacksController from './app/controllers/deliveryPacksController';
import DeliveryProblemsController from './app/controllers/deliveryProblemsController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', SessionController.store);

// Get started and ended deliveries
routes.get(
	'/deliveryperson/:id/deliveries',
	DeliveryPersonController.deliveries
);
// Start and End deliveries
routes.put('/deliverypackage/deliveries', DeliveryPacksController.status);
// Report a problem
routes.post('/deliverypackage/:id/problems', DeliveryProblemsController.store);
// delyery person log in
routes.get('/deliveryperson/:id', DeliveryPersonController.signin);

routes.get(
	'/deliverypackage/:id/problems',
	DeliveryProblemsController.indexById
);
routes.post('/files', upload.single('file'), FileController.store);

routes.use(AuthConfig); // JWT token verifier

routes.post('/user', UserController.store);
routes.put('/user', UserController.update);
routes.get('/user', UserController.index);
routes.delete('/user', UserController.delete);

routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);
routes.get('/recipient', RecipientController.index);
routes.delete('/recipient', RecipientController.delete);

routes.post('/deliveryperson', DeliveryPersonController.store);
routes.put('/deliveryperson', DeliveryPersonController.update);
routes.get('/deliveryperson', DeliveryPersonController.index);
routes.delete('/deliveryperson', DeliveryPersonController.delete);

routes.post('/deliverypackage', DeliveryPacksController.store);
routes.get('/deliverypackage', DeliveryPacksController.index);
routes.get('/deliverypackage/:id/seek', DeliveryPacksController.indexOne);
routes.put('/deliverypackage', DeliveryPacksController.update);
routes.delete('/deliverypackage', DeliveryPacksController.delete);
routes.get('/deliverypackage/problems', DeliveryProblemsController.index);

routes.delete(
	'/deliverypackage/:id/cancel-delivery',
	DeliveryProblemsController.delete
);

export default routes;
