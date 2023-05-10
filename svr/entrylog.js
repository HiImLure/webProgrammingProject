import uuid from 'uuid-random';

let logs = [
  { 
    id: '1',
   date: 'long long ago',
    work: 'Hello', 
    exp: 'This is my',
    comp: 'first entry :)'
  }
];


export function logList() {
  return logs;
}

export function findLog(id) {
  for (const log of logs) {
    if (log.id == id) {
      return log;
    }
  }
  return null;
}

const options = {year: '2-digit', month: 'numeric', day: 'numeric' };
const today  = new Date();

export function newLog(work, exp, comp) {
  const logDetail = {
    id: uuid(),
    date: today.toLocaleDateString("en-gb", options),
    work,
    exp,
    comp
  };
  logs = [logDetail, ...logs.slice(0, 9)];

  return logs
}

