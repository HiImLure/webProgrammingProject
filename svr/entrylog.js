import uuid from 'uuid-random';

let logs = [
  { 
    id: '1',
   date: 'long long ago',
    work: 'a reasonable amount of work', 
    exp: 'more experience than yesterday',
    comp: 'C5'
  },
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

export function newLog(work, exp, comp) {
  const newLog = {
    id: uuid(),
    date: Date(),
    work,
    exp,
    comp
  };
  logs = [newLog, ...logs.slice(0, 9)];
  return logs
}

// export function editMessage(updatedMessage) {
//   const storedMessage = findMessage(updatedMessage.id);
//   if (storedMessage == null) throw new Error('message not found');

//   // update old message in place
//   storedMessage.time = Date();
//   storedMessage.msg = updatedMessage.msg;

//   return storedMessage;
// }
