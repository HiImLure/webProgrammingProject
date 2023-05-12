import uuid from 'uuid-random';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function init() {
  const database = await open({
    filename: './logDatabase', 
    driver: sqlite3.Database,
    verbose : true,
  });

  await database.migrate({ migrationsPath: './sql' });
  return database;
}

const connection = init();

export async function logList() {
  const database = await connection;
  return await database.all('SELECT * FROM logs ORDER BY ROWID ASC LIMIT 30');  
}

export async function findLog(id) {
  const database = await connection;
  return database.get('SELECT * FROM logs WHERE id = ?', id); 
}

const options = {year: '2-digit', month: 'numeric', day: 'numeric'};
const today  = new Date();

export async function newLog(work, exp, comp) {
  const database = await connection;

  const id = uuid();
  const date = today.toLocaleDateString("en-gb", options);
  await database.run('INSERT INTO logs VALUES (?,?,?,?,?)',[id, date, work, exp,comp ]);

  return logList();
}