import { Request, Response } from 'express';

import { Customer } from '../data/customer';
import { insert } from '../database/customer.repository';
import { logger } from '../utils/logger';

export function createCustomerHandler(req: Request, res: Response) {
  const { body } = req;
  let customer: Customer;

  try {
    customer = new Customer(body.username).validate();
  } catch (err: any) {
    res.status(400).json({ error: err.message });

    return;
  }

  insert(customer, (err, lastID) => {
    if (err) {
      logger.error(err);
      res.status(500).json({ error: 'something went wrong!' });

      return;
    }

    res.status(201).json({ status: 'successful', lastID });
  });
}
