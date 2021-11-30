import { logger } from '../utils/logger';
import { Application } from './application';

export class Server {
  constructor() {
    Application.instance.app.listen(process.env.PORT ?? 4000, () => logger.info(
      `
      -----------------------------------------------
      Server Running at: http://localhost:${process.env.PORT}
      -----------------------------------------------
      `,
    ));
  }
}
