import express, { Express } from 'express';
import cors from 'cors';

export class Application {
  static instance = new Application();

  readonly app: Express;

  private constructor() {
    this.app = express();
    this.middlewareSetup();
    // this.RouterSetup();
  }

  private middlewareSetup() {
    this.app.use(cors());
  }

  // private RouterSetup() {
  //   this.app.use([]);
  // }
}
