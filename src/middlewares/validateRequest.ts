import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { BaseMiddleware } from '../interfaces/BaseMiddleware';

export class ValidateRequest implements BaseMiddleware {
  constructor(private schema: Schema) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof Error && 'details' in error) {
        res.status(400).json({ error: (error as any).details.map((d: any) => d.message) });
      } else {
        res.status(400).json({ error: 'Validation failed' });
      }
    }
  }
}