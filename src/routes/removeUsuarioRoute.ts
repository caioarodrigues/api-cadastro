import { Router, Request, Response } from "express";
import DBController from "../controllers/BDController";

const dbController = DBController.criaDBController();
const removeUsuarioRouter = Router();

removeUsuarioRouter.delete('/remove', async (req: Request, res: Response) => {
    const id = parseInt(req.body.id);

    try{
        await dbController.removeUsuario(id);

        console.log('sucesso ao remover usuário');
        res.sendStatus(200);
    }
    catch(err){
        console.log('erro ao remover usuário: ');
        console.error(err);

        res.sendStatus(409);
    }
});

export default removeUsuarioRouter;