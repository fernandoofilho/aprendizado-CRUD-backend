import { Router } from "express";

// Rotas sem banco. Servem para ver o caminho de uma requisição:
// método + URL + query string + corpo JSON.

const router = Router();

router.get("/ping", (_req, res) => {
  res.json({
    ok: true,
    mensagem: "O servidor recebeu um GET e devolveu JSON.",
  });
});

// GET /api/exemplo/eco?mensagem=ola
// Tudo depois do ? chega em req.query.
router.get("/eco", (req, res) => {
  const mensagem = req.query.mensagem;

  res.json({
    explicacao: "req.query lê os parâmetros da URL, depois do ?.",
    mensagem: typeof mensagem === "string" ? mensagem : "(vazio)",
  });
});

// POST /api/exemplo/eco
// O JSON enviado pelo cliente chega em req.body
// porque o index.ts usa express.json().
router.post("/eco", (req, res) => {
  res.status(201).json({
    explicacao: "req.body é o JSON que o cliente enviou.",
    recebido: req.body,
  });
});

export default router;
