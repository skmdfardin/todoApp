import { Request, Response, NextFunction } from 'express';

export interface BaseMiddleware {
  handle(req: Request, res: Response, next: NextFunction): Promise<void>;
}
