import { Router, Request, Response } from 'express';
import DBController from '../controllers/BDController';
import { Usuario } from '../types/usuario';
import { AdicionaUsuarioException } from '../exceptions/AdicionaUsuarioException';

const cadastroRouter = Router();
const dbController = DBController.criaDBController();

cadastroRouter.post('/cadastro', async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;
    const usuario: Usuario = {
        nome, 
        email,
        senha
    };
    const resposta = await dbController.adicionaUsuario(usuario);

    if(resposta instanceof AdicionaUsuarioException){
        const { message } = resposta;
        console.log('aconteceu um erro ao tentar cadastrar: ');
        console.error(message);

        res.sendStatus(409);
    }
    else {
        console.log('sucesso ao cadastrar!');
        console.log(usuario);
    
        res.sendStatus(200);
    }
});

export default cadastroRouter;