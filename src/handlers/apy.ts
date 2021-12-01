import { Request, Response } from 'express';

import { APY } from '../data/apy';
import { insert, getAllForUser, deleteAllForUser } from '../database/apy.repository';
import { calculateAPY } from '../utils/calculateAPY';
import { logger } from '../utils/logger';

export function calculateAPYHandler(req: Request, res: Response) {
  const {
    body: {
      deposit,
      interest_rate,
      annual_compound_time,
      customer_id,
    },
  } = req;

  let apy: APY;

  try {
    apy = new APY(
      deposit,
      interest_rate,
      annual_compound_time,
      customer_id,
    ).validate();
  } catch (err: any) {
    res.status(400).json({ error: err.message });

    return;
  }

  apy.apy = calculateAPY(interest_rate, annual_compound_time);
  apy.final_value = apy.deposit + apy.apy;

  insert(apy);

  res.status(201).json({ status: 'successful' });
}

export function getAllAPYForUserHandler(req: Request, res: Response) {
  const { params: { id } } = req;

  getAllForUser(Number(id), (err, rows) => {
    if (err) {
      logger.error(err);
      res.status(500).json({ error: 'something went wrong!' });

      return;
    }

    res.status(200).json({ status: 'successful', results: rows });
  });
}

export function deleteAllAPYForUserHandler(req: Request, res: Response) {
  const { params: { id } } = req;

  deleteAllForUser(Number(id), (err, rowsChanged) => {
    if (err) {
      logger.error(err);
      res.status(500).json({ error: 'something went wrong!' });

      return;
    }

    res.status(200).json({ status: 'successful', rowsChanged });
  });
}
