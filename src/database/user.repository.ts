import { Customer } from '../data/customer';
import { db } from './sqlite';

export function insert(
  customer: Customer,
  callback: (err: Error | null, lastID: number | null) => void,
) {
  const query = `INSERT INTO customers (username) 
  VALUES(?)`;

  db.run(query, customer.username, function (err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, this.lastID);
    }
  });
}

export function getUser(id: number, callback: (err: Error | null, row: Customer | null) => void) {
  const query = `SELECT _id, username FROM customers
                WHERE _id = ?`;

  db.get(query, id, function (this, err, row) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
}
