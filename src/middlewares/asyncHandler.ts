import type { NextFunction, Request, Response } from "express";

// O Express 4 não captura erro de função async sozinho.
// Este embrulho manda a exceção para o tratador de erros.
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
