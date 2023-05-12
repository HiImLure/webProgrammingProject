import uuid from 'uuid-random';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Initialises a connection to the SQLite database with the filename './logDatabase', which are then migrated to the ./sql directory 
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
  return await database.all('SELECT * FROM logs ORDER BY date DESC LIMIT 30');  //Returns the list of logs with a limit of 30 items, ordered by date in descending order.
}

export async function findLog(id) {
  const database = await connection;
  return database.get('SELECT * FROM logs WHERE id = ?', id); // Finds and returns the log with the selected id.
}

function currentTime() {
  const isoString = new Date().toISOString();
  const formattedTime = isoString.slice(2, -5).replace('T', ' ');
  return formattedTime;
}

//Creates a new log with the given work, exp, and comp values. The id and date fields are automatically given. Returns the updated list of logs after they are inserted in the database.
export async function newLog(work, exp, comp) {
  const database = await connection;

  const id = uuid();
  const date = currentTime();
  await database.run('INSERT INTO logs VALUES (?,?,?,?,?)',[id, date, work, exp,comp ]);

  return logList();
}
