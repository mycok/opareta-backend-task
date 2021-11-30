import express, { Router } from 'express';
import { createCustomerHandler, getCustomerHandler } from '../handlers/customer';

export const userRouter: Router = express.Router();
userRouter.route('/users').post(createCustomerHandler);
userRouter.route('/users/:id').get(getCustomerHandler);
