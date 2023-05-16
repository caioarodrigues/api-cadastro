import { Router } from "express";
import RoutesController from "../controllers/RoutesController";

const editaUsuarioRouter = Router();
const routesController = RoutesController.criaRoutesController();

editaUsuarioRouter.put('/edita', routesController.putEditaUsuario);

export default editaUsuarioRouter;