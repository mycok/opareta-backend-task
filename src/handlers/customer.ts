import { Request, Response } from 'express';

import { Customer } from '../data/customer';
import { getUser, insert } from '../database/user.repository';
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

export function getCustomerHandler(req: Request, res: Response) {
  const { params: { id } } = req;

  getUser(Number(id), (err, result) => {
    if (err) {
      logger.error(err);
      res.status(500).json({ error: 'something went wrong!' });

      return;
    }

    if (!result) {
      res.status(400).json({ error: 'customer not found!' });

      return;
    }
    res.status(200).json({ status: 'successful', customer: result });
  });
}
