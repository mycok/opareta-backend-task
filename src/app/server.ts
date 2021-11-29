import { Express } from 'express';

import { logger } from '../utils/logger';
import { Application } from './application';

export class Server {
  private readonly _app: Express;

  constructor() {
    this._app = Application.instance.app;
    this._app.listen(process.env.PORT ?? 4000, () => logger.info(
      `
      -----------------------------------------------
      Server Running at: http://localhost:${process.env.PORT}
      -----------------------------------------------
      `,
    ));
  }
}
