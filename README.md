# myRead-backend

# <p align = "center"> myRead </p>

<p align = "center">
   <img src="https://github.com/LucasBrandaoGomes/myRead-app/blob/30a71a5a4ca7a076ed2f33c99bc31b747f1bde57/src/img/myRead.png" />
</p>

##  :clipboard: Descrição

Back-end da aplicação myRead. My read é uma aplicação onde o usuário poder fazer seu controle de leitura. Para isso o backend conta com as rotas necessárias para cada funcionalidade, promove a persistencia do login do usuário durante o uso do app. A construção segue a arquitetura de camadas e suas integrações são testadas utilizando jest e supertet.

Feramentas e tecnologias utilizadas: Heroku, PostgresSQL, TypeScript, Prisma, Node JS, EXPRESS, JWT
***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- JWTs/bcrypt
- Node.js
- TypeScript
- Postgres SQL
- Prisma
- Jest
- Supertest

***

## :rocket: Rotas

### :man: Usuário

```yml
POST /sign-up
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body:{
        "email": "Lorem ipsum",
        "password": "1234",
        "passwordConfirmation": "1234"
}
```
    
```yml 
POST /sign-in
    - Rota para fazer login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "senha": "1234"
    }
```
### :book: Livros

```yml 
GET /books (autenticada)
    - Rota para trazer lista de livros disponíveis
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
```yml 
GET /books?seacrh= (autenticada)
    - Rota para buscar livros disponíveis pr meio de busca(search)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml 
GET /books/:id (autenticada)
    - Rota para trazer as informações a cerca de um livro selecionado
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
### :bookmark: Leituras

```yml 
GET /books/reads (autenticada)
    - Rota para listar livros que o usuário esteja fazendo a leitura e acompanhando sua evolução
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
```yml 
POST /books/reads/:id (autenticada)
    - Rota para usuário adicionar o livro selecionado para leitura
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml 
PUT /books/reads/:id (autenticada)
    - Rota para usuário atualizar a página de leitura do livro selecionado
    - headers: { "Authorization": "Bearer $token" }
    - body: {readPages: "valor(número)"}
```

```yml 
DELETE /books/reads/:id (autenticada)
    - Rota para usuário remover o livro selecionados de suas leituras
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

## 🏁 Rodando a aplicação

Primeiro, faça o clone desse repositório na sua maquina:

```
https://github.com/LucasBrandaoGomes/RepoProvas-API.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Crie um arquivo .env e garanta que as variáveis de ambiente sigam o exemplo do arquivo .env.example


Finalizado o processo, é só inicializar o servidor
```
npm start
```
ou 

```
npm run dev
```
