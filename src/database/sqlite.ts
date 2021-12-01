import sqlite3, { Database } from 'sqlite3';

const queryList: string[] = [
  `CREATE TABLE IF NOT EXISTS customers (
          _id INTEGER PRIMARY KEY NOT NULL,
          username TEXT NOT NULL
    )`,

  `CREATE TABLE IF NOT EXISTS apy (
        _id INTEGER PRIMARY KEY NOT NULL,
        deposit INTEGER NOT NULL,
        interest_rate INTEGER NOT NULL,
        annual_compound_time INTEGER NOT NULL,
        apy INTEGER NOT NULL,
        final_value INTEGER NOT NULL,
        customer_id INTEGER NOT NULL
  )`,
];

function createTables(db: Database, ...queries: string[]) {
  queries.forEach((query: string) => {
    db.exec(query, (err) => {
      if (err) {
        throw err;
      }
    });
  });
}

export function openDB(): Database {
  const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      throw err;
    }

    db.on('open', () => {
      createTables(db, ...queryList);
    });
  });

  return db;
}

export const db = openDB();
