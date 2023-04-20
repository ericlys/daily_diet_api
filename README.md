
# Daily Diet API

A Daily Diet API é uma API de registro de refeições que permite aos usuários criar uma conta e registrar suas refeições. Esta API foi desenvolvida com as tecnologias Zod, Fastify, Jest, Prisma, Supertest, TypeScript e Prettier e possui testes unitários em todos os casos de uso e testes end-to-end em todos os controllers.


## Tech Stack

**Server:** Zod, Fastify, Jest, Prisma, Supertest, TypeScript e Prettier 


## Requisitos Funcionais

[x] Deve ser possível criar um usuário  
[x] Deve ser possível identificar o usuário entre as requisições  
[x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
 (As refeições devem ser relacionadas a um usuário.)
- Nome
- Descrição
- Data e Hora
- Está dentro ou não da dieta  
[x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima  
[x] Deve ser possível apagar uma refeição  
[x] Deve ser possível listar todas as refeições de um usuário  
[x] Deve ser possível visualizar uma única refeição  
[x] Deve ser possível recuperar as métricas de um usuário  
- Quantidade total de refeições registradas  
- Quantidade total de refeições dentro da dieta  
- Quantidade total de refeições fora da dieta  
- Melhor sequência por dia de refeições dentro da dieta   
[x] O usuário deve estar autenticado para acessar os endpoints protegidos da API.  
[x] Ao fazer login, um token de acesso e um token de atualização (refresh token) devem ser gerados e enviados ao cliente.  
[x] O token de acesso deve ser usado para autenticar todas as solicitações subsequentes do usuário.  
[x] O token de atualização (refresh token) deve ser armazenado em um cookie seguro no navegador do usuário.  
[x] O token de atualização (refresh token) deve ser usado para solicitar um novo token de acesso quando o token atual expirar.  
[x]  O token de atualização (refresh token) deve ser válido apenas por um período limitado de tempo e deve ser revogado quando um novo token de acesso é gerado ou quando o usuário faz logout. 


## Regras de Negócio
[x] O usuário só pode visualizar, editar e apagar as refeições que ele criou.
## Variáveis de ambiente

Para executar este projeto, você precisará adicionar as seguintes variáveis de ambiente ao seu arquivo .env

`NODE_ENV=dev`,
`JWT_SECRET`,
`DATABASE_URL`


## Run Localmente

Clone o projeto

Entre no diretório do projeto

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Rodando os Testes Unitários

Para executar testes Unitários, execute o seguinte comando

```bash
  npm run test
```
Para executar testes e2e, execute o seguinte comando

```bash
  npm run test:e2e
```


## License

[MIT](https://choosealicense.com/licenses/mit/)

