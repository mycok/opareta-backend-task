import express, { Express } from 'express';
import cors from 'cors';

import { userRouter } from '../router/user';

export class Application {
  static instance = new Application();

  readonly app: Express;

  private constructor() {
    this.app = express();
    this.middlewareSetup();
    this.RouterSetup();
  }

  private middlewareSetup() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private RouterSetup() {
    this.app.use([
      userRouter,
    ]);
  }
}
