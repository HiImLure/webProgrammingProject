
import * as lg from './entrylog.js';
import express from 'express';

const app = express();

app.use(express.static('client', { extensions: ['html'] }));

async function getLogs(req, res){
  res.json(await lg.logList());
}

async function getLog(req, res){
  const result = lg.findLog(req.params.id);
  if (result) { res.json(result); } else { res.status(404).send('No match');}
}

async function postLogs(req,res){
  const msg = await lg.newLog(req.body.work, req.body.exp, req.body.comp);
  res.json(msg);
}

function asyncWrap(f) {
  return (req,res,next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}




app.get('/logs', asyncWrap(getLogs));
app.get('/logs/:id', asyncWrap(getLog));
app.post('/logs', express.json(), asyncWrap(postLogs));

app.listen(8080);
