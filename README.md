# Aprendizado CRUD — backend

API em Express para treinar rotas HTTP e acesso ao Postgres pelo Prisma.

O React está no repositório `aprendizado-CRUD-front`. O banco sobe com o Docker Compose deste diretório.
# IMPORTANTE: 
aqui temos um .env exposto, isso está longe do ideal, porém, como o propósito é educativo, seguiremos assim 


## Como um pedido viaja

```
React (porta 5173)
  → fetch GET/POST/PUT/DELETE
Express (porta 3001)
  → rota em src/routes
Prisma
  → SQL no Postgres (porta 5432)
```

## Como subir

Na primeira vez:

```bash
npm install
npm run db:up
npm run db:migrate
npm run db:seed
npm run dev
```

`db:migrate` pergunta o nome da migration. Use `init_tarefas`.

A API fica em `http://localhost:3001`.

## Mapa dos arquivos

| Arquivo | O que olhar |
| --- | --- |
| `src/index.ts` | Sobe o servidor, liga JSON, CORS e as rotas |
| `src/routes/exemplo.ts` | GET e POST sem banco: query string e body |
| `src/lib/prisma.ts` | Uma instância do ORM para o processo inteiro |
| `src/routes/tarefas.ts` | CRUD: findMany, findUnique, create, update, delete |
| `prisma/schema.prisma` | A tabela `tarefas` |
| `docker-compose.yml` | Postgres |

## Rotas

| Método | Caminho | O que faz |
| --- | --- | --- |
| GET | `/api/health` | Diz se a API está no ar |
| GET | `/api/exemplo/ping` | Resposta JSON fixa |
| GET | `/api/exemplo/eco?mensagem=ola` | Devolve a query string |
| POST | `/api/exemplo/eco` | Devolve o JSON recebido |
| GET | `/api/tarefas` | Lista. Aceita `?concluida=true` ou `false` |
| GET | `/api/tarefas/:id` | Uma tarefa |
| POST | `/api/tarefas` | Cria. Corpo: `{ "titulo", "descricao?" }` |
| PUT | `/api/tarefas/:id` | Substitui titulo, descricao e concluida |
| DELETE | `/api/tarefas/:id` | Apaga |

Erros de validação voltam `400` com `{ "erro": "..." }`. Registro inexistente volta `404`.

## Exercícios

1. Acrescente o campo `prioridade` (número) no model, rode uma migration e mostre o campo no formulário do React.
2. Crie `GET /api/exemplo/hora` devolvendo a hora do servidor.
3. Faça `DELETE` devolver `204` sem corpo e ajuste o `fetch` do frontend.


# ThunderClient

baixe a extensão thunder client no seu vscode, vou passar instruções em seguida