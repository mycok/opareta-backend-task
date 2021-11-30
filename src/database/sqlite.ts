import sqlite3, { Database } from 'sqlite3';

// const queryList: string[] = [
//   `CREATE TABLE IF NOT EXISTS users (
//           _id INTEGER PRIMARY KEY NOT NULL,
//           username TEXT NOT NULL
//       )`,
// ];

function createTables(db: Database) {
//   queries.forEach((query: string) => {
//     db.exec(query, (err) => {
//       if (err) {
//         throw err;
//       }
//     });
//   });
  const q = `CREATE TABLE IF NOT EXISTS users (
        _id INTEGER PRIMARY KEY NOT NULL,
        username TEXT NOT NULL
    )`;
  db.exec(q, (err) => {
    if (err) {
      throw err;
    }
  });
}

export function openDB(): Database {
  const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      throw err;
    }

    db.on('open', () => {
      createTables(db);
    });
  });

  return db;
}

export const db = openDB();
