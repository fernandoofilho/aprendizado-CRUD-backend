import { Router } from "express";
import type { Response } from "express";
import { prisma } from "../lib/prisma";
import { asyncHandler } from "../middlewares/asyncHandler";

// CRUD completo. Cada rota é um verbo HTTP + um caminho.
// O Prisma traduz a chamada em SQL e devolve objetos JavaScript.

const router = Router();

type DadosTarefa = {
  titulo: string;
  descricao: string | null;
  concluida: boolean;
};

function lerId(valor: string | string[], res: Response) {
  // O Express entrega o pedaço da URL. Em alguns casos o tipo permite lista.
  const texto = Array.isArray(valor) ? valor[0] : valor;
  const id = Number(texto);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ erro: "O id na URL precisa ser um número inteiro." });
    return null;
  }

  return id;
}

function lerDados(body: unknown, res: Response): DadosTarefa | null {
  if (typeof body !== "object" || body === null) {
    res.status(400).json({ erro: "Envie um JSON no corpo da requisição." });
    return null;
  }

  const dados = body as {
    titulo?: unknown;
    descricao?: unknown;
    concluida?: unknown;
  };

  if (typeof dados.titulo !== "string" || dados.titulo.trim() === "") {
    res.status(400).json({ erro: 'O campo "titulo" é obrigatório.' });
    return null;
  }

  if (
    dados.descricao !== undefined &&
    dados.descricao !== null &&
    typeof dados.descricao !== "string"
  ) {
    res.status(400).json({ erro: 'O campo "descricao" precisa ser texto.' });
    return null;
  }

  if (dados.concluida !== undefined && typeof dados.concluida !== "boolean") {
    res.status(400).json({ erro: 'O campo "concluida" precisa ser true ou false.' });
    return null;
  }

  const descricao =
    typeof dados.descricao === "string" && dados.descricao.trim() !== ""
      ? dados.descricao.trim()
      : null;

  return {
    titulo: dados.titulo.trim(),
    descricao,
    concluida: dados.concluida === true,
  };
}

// GET /api/tarefas
// GET /api/tarefas?concluida=true
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const filtro = req.query.concluida;
    const where =
      filtro === "true" ? { concluida: true } : filtro === "false" ? { concluida: false } : {};

    const tarefas = await prisma.tarefa.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json(tarefas);
  }),
);

// GET /api/tarefas/1
// O ":id" vira req.params.id.
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = lerId(req.params.id, res);
    if (id === null) return;

    const tarefa = await prisma.tarefa.findUnique({ where: { id } });

    if (!tarefa) {
      res.status(404).json({ erro: "Tarefa não encontrada." });
      return;
    }

    res.json(tarefa);
  }),
);

// POST /api/tarefas  { "titulo": "...", "descricao": "..." }
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const dados = lerDados(req.body, res);
    if (!dados) return;

    const tarefa = await prisma.tarefa.create({ data: dados });

    // 201 = criado. O corpo é o registro que o banco devolveu, já com id.
    res.status(201).json(tarefa);
  }),
);

// PUT /api/tarefas/1  { "titulo", "descricao", "concluida" }
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = lerId(req.params.id, res);
    if (id === null) return;

    const dados = lerDados(req.body, res);
    if (!dados) return;

    const existente = await prisma.tarefa.findUnique({ where: { id } });
    if (!existente) {
      res.status(404).json({ erro: "Tarefa não encontrada." });
      return;
    }

    const tarefa = await prisma.tarefa.update({
      where: { id },
      data: dados,
    });

    res.json(tarefa);
  }),
);

// DELETE /api/tarefas/1
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = lerId(req.params.id, res);
    if (id === null) return;

    const existente = await prisma.tarefa.findUnique({ where: { id } });
    if (!existente) {
      res.status(404).json({ erro: "Tarefa não encontrada." });
      return;
    }

    await prisma.tarefa.delete({ where: { id } });

    res.json({ ok: true });
  }),
);

export default router;
