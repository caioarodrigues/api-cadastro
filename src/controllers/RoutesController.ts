import { Router, Request, Response } from "express";
import BD from "../models/BD";
import { Usuario } from "../types/usuario";
import { AdicionaUsuarioException } from "../exceptions/AdicionaUsuarioException";
import { GetUsuarioException } from "../exceptions/GetUsuarioException";

const router = Router();
const bd = BD.criaBD();

export default class RoutesController {
    private constructor(){};
    private static _routesController = new RoutesController();
    public static criaRoutesController(): RoutesController{
        return this._routesController;
    }
    getIndex = router.get('/', (req: Request, res: Response) => {
        const msg: {} = {
            conteudo: 'Olá, mundo!'
        }
    
        res.json(msg);
    });
    postCadastro = router.post('/cadastro', async (req: Request, res: Response) => {
        const { nome, email, senha } = req.body;
        const usuario: Usuario = {
            nome, 
            email,
            senha
        };
        console.log('usuario = ', usuario);

        const resposta = await bd.adicionaUsuario(usuario);
    
        if(resposta instanceof AdicionaUsuarioException){

            res.sendStatus(409);
        }
        else {
            console.log('sucesso ao cadastrar!');
            console.log(usuario);
        
            res.sendStatus(200);
        }
    });
    putEditaUsuario = router.put('/edita', async (req: Request, res: Response) => {
        const { nome, email, senha, id } = req.body;
        const _: number = parseInt(id);
        const usuario: Usuario = { nome, email, senha }
    
        try{
            await bd.editaUsuario(usuario, _);
    
            console.log('usuário editado com sucesso!');
            res.json(usuario);
        }
        catch(err){
            console.log('erro ao editar o usuário: ');
            console.error(err);
    
            res.sendStatus(404);
        }
    });
    getListaUsuarios = router.get('/lista-usuarios', async (req: Request, res: Response) => {
        const usuarios = await bd.getUsuarios();
    
        res.json(usuarios);
    });
    getProcuraUsuario = router.get('/:id', async (req: Request, res: Response) => {
        const id = req.params.id;
    
        try{
            const _: number = parseInt(id);
        
            const usuario = await bd.getUsuario(_);
        
            if(usuario instanceof GetUsuarioException){
                const { message } = usuario;
        
                console.log('erro ao buscar usuário: ');
                console.error(message);
        
                res.sendStatus(404);
            }
            else { 
                res.json(usuario);
            }
        }
        catch(err){
            const conteudo = {
                msg: 'erro ao buscar este usuário'
            };
    
            res.json(conteudo);
        }
    });
    deleteRemoveUsuario = router.delete('/remove', async (req: Request, res: Response) => {
        const id = parseInt(req.body.id);
    
        try{
            await bd.removeUsuario(id);
    
            console.log('sucesso ao remover usuário');
            res.sendStatus(200);
        }
        catch(err){
            console.log('erro ao remover usuário: ');
            console.error(err);
    
            res.sendStatus(409);
        }
    })
}
