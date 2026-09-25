import "dotenv/config";
import cors from "cors";
import express from "express";
import { rotaNaoEncontrada, tratadorDeErros } from "./middlewares/erros";
import exemploRouter from "./routes/exemplo";
import tarefasRouter from "./routes/tarefas";

// Comece por este arquivo. Ele sobe o servidor e entrega cada URL
// para o arquivo de rotas correspondente.

const app = express();
const porta = Number(process.env.PORT ?? 3001);

// O navegador bloqueia chamada de outra origem (porta 5173 -> 3001)
// se o servidor não autorizar. O cors libera o frontend.
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
  }),
);

// Transforma o corpo JSON em req.body.
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, servico: "aprendizado-crud-backend" });
});

app.use("/api/exemplo", exemploRouter);
app.use("/api/tarefas", tarefasRouter);

app.use(rotaNaoEncontrada);
app.use(tratadorDeErros);

app.listen(porta, () => {
  console.log(`API em http://localhost:${porta}`);
  console.log("Experimente: GET http://localhost:%s/api/health", porta);
});
