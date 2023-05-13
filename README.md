### Projeto simples de uma api para cadastramento 

### Tecnologias
<div>
    <ul>
        <li>
            <h3> Backend </h3>
            <ul>
                <li>TypeScript</li>
                <li>Express</li>
                <li>Prisma</li>
                <li>
                    <s>Multer</s>
                </li>
            </ul>
        </li>
        <li>
            <h3> Frontend </h3>
            <ul>
                <li> Em andamento </li>
            </ul>
        </li>
    </ul>
</div>

## Para rodar a aplicação: 
    $ npm i 
    $ npx prisma migrate dev --name init
    $ npm run start

## Servidor
<a href='http://localhost:3000'> porta 3000</a>

## Rotas

    (GET) / -> retorna a página principal
    (GET) /id -> retorna o perfil do id correspondente
    (GET) /lista-usuarios -> retorna todos os perfis de todos os usuários 
    (POST) /cadastro -> adiciona ao banco de dados o novo perfil (contendo nome, email e senha). Retorna 409 se já existir.
