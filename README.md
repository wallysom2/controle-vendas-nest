# API de Vendas e Compras

API modular para gerenciamento de vendas e compras de produtos usando NestJS e Prisma.

## Tecnologias Utilizadas

- NestJS 10.x
- Prisma ORM
- PostgreSQL
- Swagger/OpenAPI
- TypeScript
- Class Validator
- Jest (Testes)

## Funcionalidades

### Produtos
- Cadastro completo de produtos com informações detalhadas
- Controle de estoque
- Gestão de SKU e código de barras
- Categorização por fabricante, marca e categoria
- Soft delete (desativação) de produtos

### Vendas
- Registro de vendas com dados do cliente
- Múltiplos status (Pendente, Pago, Cancelado, etc.)
- Diferentes métodos de pagamento
- Cálculo automático de totais
- Histórico de compras por venda

### Compras
- Vinculação de produtos a vendas
- Controle de quantidade e preços unitários
- Cálculo automático de descontos
- Rastreamento de status da compra

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
- Crie um arquivo `.env` baseado no `.env.example`
- Configure a URL do PostgreSQL no `.env`:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

4. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
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

Acesse a documentação Swagger em:
```
http://localhost:3000/api
```

## Exemplos de Uso

### Criando um Produto
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smartphone Galaxy S21",
    "sku": "SAMS21-128-BLK",
    "price": 3999.99,
    "stockQuantity": 50,
    "manufacturer": "Samsung",
    "brand": "Samsung Galaxy",
    "category": "Smartphones"
  }'
```

### Criando uma Venda
```bash
curl -X POST http://localhost:3000/sales \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "João Silva",
    "customerEmail": "joao@email.com",
    "totalAmount": 3999.99,
    "paymentMethod": "CREDIT_CARD"
  }'
```

### Registrando uma Compra
```bash
curl -X POST http://localhost:3000/purchases \
  -H "Content-Type: application/json" \
  -d '{
    "saleId": 1,
    "products": [
      {
        "productId": 1,
        "quantity": 1,
        "unitPrice": 3999.99
      }
    ],
    "totalAmount": 3999.99
  }'
```

## Estrutura do Banco de Dados

### Product
- Informações básicas (nome, descrição, SKU)
- Preço e estoque
- Detalhes do produto (peso, dimensões, etc.)
- Soft delete com flag isActive

### Sale
- Dados do cliente
- Status da venda
- Valor total
- Método de pagamento
- Relacionamento com compras

### Purchase
- Relacionamento com venda e produtos
- Quantidade e preços
- Status da compra
- Desconto aplicado

## Testes

Execute os testes unitários:
```bash
npm run test
```

Execute os testes e2e:
```bash
npm run test:e2e
```

## Scripts Disponíveis

- `npm run start` - Inicia em desenvolvimento
- `npm run start:dev` - Inicia com hot-reload
- `npm run start:prod` - Inicia em produção
- `npm run build` - Compila o projeto
- `npm run test` - Executa testes unitários
- `npm run test:e2e` - Executa testes e2e
- `npm run lint` - Executa o linter

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit suas mudanças: `git commit -m 'feat: Adiciona nova feature'`
4. Push para a branch: `git push origin feature/nova-feature`
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

## Suporte

Para suporte, abra uma issue no repositório ou envie um email para [seu-email].

## Roadmap

- [ ] Implementar autenticação JWT
- [ ] Adicionar relatórios de vendas
- [ ] Integrar com sistemas de pagamento
- [ ] Adicionar dashboard administrativo
- [ ] Implementar cache com Redis


