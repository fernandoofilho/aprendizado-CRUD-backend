import { prisma } from "../src/lib/prisma";

// Dados iniciais para a lista não começar vazia.
// Rode com `npm run db:seed`.

const exemplos = [
  {
    titulo: "Ler a rota GET /api/tarefas",
    descricao: "Veja prisma.tarefa.findMany em src/routes/tarefas.ts.",
    concluida: true,
  },
  {
    titulo: "Criar uma tarefa pelo React",
    descricao: "O formulário faz um POST e o banco devolve o id.",
    concluida: false,
  },
  {
    titulo: "Apagar esta tarefa",
    descricao: "O botão dispara um DELETE /api/tarefas/:id.",
    concluida: false,
  },
];

async function main() {
  await prisma.tarefa.deleteMany();
  await prisma.tarefa.createMany({ data: exemplos });
  console.log(`${exemplos.length} tarefas de exemplo gravadas.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (erro: unknown) => {
    console.error(erro);
    await prisma.$disconnect();
    process.exit(1);
  });
