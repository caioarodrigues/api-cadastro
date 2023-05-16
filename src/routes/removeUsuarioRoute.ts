import { Router } from "express";
import RoutesController from "../controllers/RoutesController";

const removeUsuarioRouter = Router();
const routesController = RoutesController.criaRoutesController();

removeUsuarioRouter.delete('/remove', routesController.deleteRemoveUsuario);

export default removeUsuarioRouter;