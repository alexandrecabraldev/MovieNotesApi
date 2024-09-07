# Projeto MovieNoteApi

### Esse é um projeto de uma api de cadastro de de filmes, no qual o usuário pode se cadastrar na api, uma vez cadastrado, ele poderá adicionar filmes para se lembrar de assistir depois, além disso cada filme tem informações adicionais sobre ele como por exemplo: Título do filme, descrição ou resenha do filme além das tags de categoria dos filmes.

## Essa api da suporte ao front-end dessa aplicação de mesmo nome. Juntos eles criam uma aplicação completa full-stack para poder guardar indicações de filmes que deseja assistir depois, quase como um lembrete mas de uma maneira bem mais completa.

## Rotas da aplicação

### /api/create -> Rota para criação de um Usuário, recebe o padrão Json com as informações name, email, password, o email será usado no login.
### /auth -> rota de login, todas as rotas são fechadas excerto a de criação de usuário, será será possivel apenas ter acesso a elas através do login na aplicação.
### /api/cards -> Rota para ter acesso a todos oos cards de filmes cadastrados, retorna uma array com todos so cards.
