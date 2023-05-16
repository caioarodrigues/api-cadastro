import { Router } from 'express';
import RoutesController from '../controllers/RoutesController';

const cadastroRouter = Router();
const routesController = RoutesController.criaRoutesController();

cadastroRouter.post('/cadastro', routesController.postCadastro);

export default cadastroRouter;