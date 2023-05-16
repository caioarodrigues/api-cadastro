import { Router } from "express";
import RoutesController from "../controllers/RoutesController";

const listaUsuariosRouter = Router();
const routesController = RoutesController.criaRoutesController();

listaUsuariosRouter.get('/lista-usuarios', routesController.getListaUsuarios);

export default listaUsuariosRouter;