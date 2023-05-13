import { Router, Request, Response } from "express";
import DBController from "../controllers/BDController";

const listaUsuariosRouter = Router();
const dbController = DBController.criaDBController();

listaUsuariosRouter.get('/lista-usuarios', async (req: Request, res: Response) => {
    const usuarios = await dbController.getUsuarios();

    res.json(usuarios);
});

export default listaUsuariosRouter;