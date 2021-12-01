import express, { Router } from 'express';

import { createCustomerHandler } from '../handlers/customer';
import { reqCache } from '../middleware/cache';
import {
  calculateAPYHandler,
  getAllAPYForUserHandler,
  deleteAllAPYForUserHandler,
} from '../handlers/apy';

export const userRouter: Router = express.Router();
userRouter.route('/v1/users').post(createCustomerHandler);

export const apyRouter: Router = express.Router();
apyRouter.route('/v1/apy').post(calculateAPYHandler);
apyRouter.route('/v1/apy/:id').get(reqCache(30), getAllAPYForUserHandler);
apyRouter.route('/v1/apy/:id').delete(deleteAllAPYForUserHandler);
