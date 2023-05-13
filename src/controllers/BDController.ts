import { Prisma, PrismaClient, User } from "@prisma/client";
import { Usuario } from "../routes/types/usuario";
import { AdicionaUsuarioException } from "../exceptions/AdicionaUsuarioException";
import { RemoveUsuarioException } from "../exceptions/RemoveUsuarioException";
import { GetUsuarioException } from "../exceptions/GetUsuarioException";
import { usuarioGlobal } from "../routes/types/usuarioGlobal";


export default class DBController {
    prisma = new PrismaClient();
    private constructor(){}
    
    public static criaDBController(){
        return new DBController();
    }

    async adicionaUsuario(usuario: Usuario): Promise<void | AdicionaUsuarioException>{
        await this.prisma.$connect();
        
        const { nome, email, senha } = usuario;
        const ehRepetido: boolean = !!await this.prisma.user.findFirst({
            where: {
                name: nome
            },
        });

        if(ehRepetido)
            return new AdicionaUsuarioException('Usuário repetido!');

        await this.prisma.user.create({
            data: {
                name: nome,
                email: email,
                password: senha
            }
        });
    }
    async removeUsuario(id: number): Promise<void | RemoveUsuarioException>{
        const ehExistente: boolean = !!await this.prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if(!ehExistente)
            return new RemoveUsuarioException('Este usuário não exite!');

        await this.prisma.user.delete({
            where: {
                id: id
            }
        });
    }
    async getUsuario(id: number): Promise<usuarioGlobal | GetUsuarioException>{
        const usuario = await this.prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if(!usuario)
            return new GetUsuarioException('Usuário não encontrado!');
        
        const { id: _id, email, name } = usuario;

        return {
            id: _id,
            email: email,
            nome: name
        };
    } 
    async getUsuarios(): Promise<usuarioGlobal[]>{
        const users = (await this.prisma.user.findMany({})).map(u => {
            const { email, id, name } = u;

            return { email, id, nome: name };
        });

        return users;
    }
}