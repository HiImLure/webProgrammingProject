
import * as lg from './entrylog.js';
import express from 'express';

const app = express();

app.use(express.static('client', { extensions: ['html'] }));

function getLogs(req, res) {
  res.json(lg.logList());
}

function getLog(req, res) {
  const result = lg.findLog(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send('No match for Log entry.');
  }
}

function postLogs(req, res) {
  const logs = lg.newLog(req.body.work, req.body.exp, req.body.comp);
  res.json(logs);
}


app.get('/logs', getLogs);
app.get('/logs/:id', getLog);
app.post('/logs', express.json(), postLogs);

app.listen(8080);
