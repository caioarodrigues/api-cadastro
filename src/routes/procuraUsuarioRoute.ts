import { Router } from 'express';
import RoutesController from '../controllers/RoutesController';

const procuraUsuarioRoute = Router();
const routesController = RoutesController.criaRoutesController();

procuraUsuarioRoute.get('/:id', routesController.getProcuraUsuario);

export default procuraUsuarioRoute;