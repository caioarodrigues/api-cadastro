import { Router, Request, Response } from "express";
import RoutesController from "../controllers/RoutesController";

const indexRouter = Router();
const routesController = RoutesController.criaRoutesController();

indexRouter.get('/', routesController.getIndex);

export default indexRouter;