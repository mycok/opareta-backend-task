import { db } from './sqlite';
import { APY } from '../data/apy';

export function insert(apy: APY) {
  const query = `INSERT INTO apy (
      deposit,
       interest_rate,
        annual_compound_time,
        apy,
        final_value,
        customer_id
        ) 
  VALUES(?, ?, ?, ?, ?, ?)`;

  db.run(
    query,
    apy.deposit,
    apy.interest_rate,
    apy.annual_compound_time,
    apy.apy,
    apy.final_value,
    apy.customer_id,
  );
}

export function getAllForUser(id: number, callback: (err: Error | null, rows: any[]) => void) {
  const query = `SELECT * FROM apy
                WHERE customer_id = ?
                ORDER BY _id`;

  db.all(query, id, function (err, rows) {
    callback(err, rows);
  });
}

export function deleteAllForUser(
  id: number,
  callback: (err: Error | null, changes: number | null) => void,
) {
  const query = `DELETE FROM apy 
                WHERE customer_id = ?`;

  db.run(query, id, function (err) {
    callback(err, this.changes);
  });
}
