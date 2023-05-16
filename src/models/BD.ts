import BDController from '../controllers/BDController';
import { AdicionaUsuarioException } from '../exceptions/AdicionaUsuarioException';
import { EditaUsuarioException } from '../exceptions/EditaUsuarioException';
import { GetUsuarioException } from '../exceptions/GetUsuarioException';
import { RemoveUsuarioException } from '../exceptions/RemoveUsuarioException';
import { Usuario } from '../types/usuario';
import { usuarioGlobal } from '../types/usuarioGlobal';

export default class BD {
    private constructor(){}
    private static _bd = new BD();
    private bdController = BDController.criaDBController();
    public static criaBD(){
        return this._bd;
    }

    async adicionaUsuario(usuario: Usuario): Promise<void | AdicionaUsuarioException>{
        const err = await this.bdController.adicionaUsuario(usuario);

        if(err instanceof AdicionaUsuarioException){
            console.log('um erro aconteceu ao tentar adicionar um novo usuário: ');
            console.error(err.message);
        }

        return err;
    }
    async removeUsuario(id: number): Promise<void | RemoveUsuarioException>{
        const err = await this.bdController.removeUsuario(id);

        if(err instanceof RemoveUsuarioException){
            console.log('um erro aconteceu ao tentar remover um usuário: ');
            console.error(err.message);
        }

        return err;
    }
    async getUsuario(id: number): Promise<usuarioGlobal | GetUsuarioException>{
        const resultado = await this.bdController.getUsuario(id);

        if(resultado instanceof GetUsuarioException){
            console.log('erro ao tentar obter o usuário: ');
            console.error(resultado.message);
        }

        return resultado;
    }
    async getUsuarios(): Promise<usuarioGlobal[]>{
        const resultado = await this.bdController.getUsuarios();

        return resultado;
    }
    async editaUsuario(usuario: Usuario, id: number): Promise<void | EditaUsuarioException>{
        const resultado = await this.bdController.editaUsuario(usuario, id);

        if(resultado instanceof EditaUsuarioException){
            console.log('erro ao tentar editar o usuário: ');
            console.error(resultado.message);
        }

        return resultado;
    }
}