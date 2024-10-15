import { Router } from 'express';

export interface BaseApi {
  getRouter(): Router;
}
