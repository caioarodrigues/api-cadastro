import { Prisma, PrismaClient, User } from "@prisma/client";
import { Usuario } from "../types/usuario";
import { AdicionaUsuarioException } from "../exceptions/AdicionaUsuarioException";
import { RemoveUsuarioException } from "../exceptions/RemoveUsuarioException";
import { GetUsuarioException } from "../exceptions/GetUsuarioException";
import { usuarioGlobal } from "../types/usuarioGlobal";
import { EditaUsuarioException } from "../exceptions/EditaUsuarioException";


export default class DBController {
    prisma = new PrismaClient();
    private constructor(){}
    private static _instancia = new DBController();

    public static criaDBController(){
        return this._instancia;
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

        await this.prisma.$disconnect();
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

        console.log('sucesso ao remover usuário!');
        await this.prisma.$disconnect();
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
        
        await this.prisma.$disconnect();

        return {
            id: _id,
            email: email,
            nome: name
        };
    } 
    async getUsuarios(): Promise<usuarioGlobal[]>{
        const users = await this.prisma.user.findMany({});
        const usuariosFiltrados = users.map(({ name, email, id }) => {
            return { nome: name, email, id};
        });

        await this.prisma.$disconnect();

        return usuariosFiltrados;
    }
    async editaUsuario(usuario: Usuario, id: number): Promise<void | EditaUsuarioException>{
        const { nome, email, senha } = usuario;

        try{
            //aparentemente ele está enviando o id como string, ao invés de int
            await this.prisma.user.update({
                where: { id: id },
                data: {
                    name: nome,
                    email: email,
                    password: senha
                }
            });
        }
        catch(err){
            return new EditaUsuarioException('Este usuário não existe!');
        }
        finally{
            await this.prisma.$disconnect();
        }
    }
}