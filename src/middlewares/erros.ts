import type { NextFunction, Request, Response } from "express";

export function rotaNaoEncontrada(_req: Request, res: Response) {
  res.status(404).json({
    erro: "Rota não existe. Confira o método HTTP e o caminho.",
  });
}

// Precisa ter 4 parâmetros para o Express reconhecer como tratador de erro.
export function tratadorDeErros(
  erro: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(erro);
  res.status(500).json({
    erro: "Erro inesperado no servidor. Olhe o terminal do backend.",
  });
}
