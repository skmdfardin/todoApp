import { Request, Response, NextFunction } from 'express';

export interface BaseController {
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  read(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
