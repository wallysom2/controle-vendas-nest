# API de Vendas e Compras

API modular para gerenciamento de vendas e compras de produtos usando NestJS e Prisma.

## Tecnologias Utilizadas

- NestJS
- Prisma ORM
- PostgreSQL
- Swagger/OpenAPI
- TypeScript
- Class Validator

## Pré-requisitos

- Node.js (v14 ou superior)
- PostgreSQL
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd api-project
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
- Crie um banco de dados PostgreSQL
- Copie o arquivo `.env.example` para `.env`
- Atualize as configurações de conexão no arquivo `.env`

4. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

5. Gere o cliente Prisma:
```bash
npx prisma generate
```

## Executando a Aplicação

1. Desenvolvimento:
```bash
npm run start:dev
```

2. Produção:
```bash
npm run build
npm run start:prod
```

## Documentação da API

A documentação da API está disponível através do Swagger UI em:
```
http://localhost:3000/api
```

## Endpoints

### Vendas (Sales)

- `POST /sales` - Criar uma nova venda
- `GET /sales` - Listar todas as vendas
- `GET /sales/:id` - Buscar uma venda específica

### Compras (Purchases)

- `POST /purchases` - Criar uma nova compra
- `GET /purchases` - Listar todas as compras
- `GET /purchases/:id` - Buscar uma compra específica

## Estrutura do Projeto

```
src/
├── prisma/
│   ├── schema.prisma
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── sales/
│   ├── sales.controller.ts
│   ├── sales.service.ts
│   ├── sales.module.ts
│   └── create-sale.dto.ts
├── purchases/
│   ├── purchases.controller.ts
│   ├── purchases.service.ts
│   ├── purchases.module.ts
│   └── create-purchase.dto.ts
├── app.module.ts
└── main.ts
```

## Scripts Disponíveis

- `npm run start` - Inicia a aplicação em modo de desenvolvimento
- `npm run start:dev` - Inicia a aplicação com hot-reload
- `npm run start:prod` - Inicia a aplicação em modo de produção
- `npm run build` - Compila a aplicação
- `npm run test` - Executa os testes
- `npm run test:e2e` - Executa os testes end-to-end
- `npm run lint` - Executa o linter

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request


