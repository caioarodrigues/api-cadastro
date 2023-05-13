import { Router, Request, Response } from 'express';
import DBController from '../controllers/BDController';
import { GetUsuarioException } from '../exceptions/GetUsuarioException';

const procuraUsuarioRouter = Router();
const dbController = DBController.criaDBController();

procuraUsuarioRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const _: number = parseInt(id);

    const usuario = await dbController.getUsuario(_);

    if(usuario instanceof GetUsuarioException){
        const { message } = usuario;

        console.log('erro ao buscar usuário: ');
        console.error(message);

        res.sendStatus(404);
    }
    else { 
        res.json(usuario);
    }
});

export default procuraUsuarioRouter;