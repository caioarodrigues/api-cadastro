import { Router, Request, Response } from "express";
import DBController from "../controllers/BDController";
import { Usuario } from "../types/usuario";

const editaUsuarioRouter = Router();
const dbController = DBController.criaDBController();

editaUsuarioRouter.put('/edita', async (req: Request, res: Response) => {
    const { nome, email, senha, id } = req.body;
    const _: number = parseInt(id);
    const usuario: Usuario = { nome, email, senha }

    try{
        await dbController.editaUsuario(usuario, _);

        console.log('usuário editado com sucesso!');
        res.json(usuario);
    }
    catch(err){
        console.log('erro ao editar o usuário: ');
        console.error(err);

        res.sendStatus(404);
    }
});

export default editaUsuarioRouter;