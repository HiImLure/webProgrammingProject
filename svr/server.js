import * as lg from './entrylog.js';
import express from 'express';

const app = express();

app.use(express.static('client', { extensions: ['html'] }));


// retrives a list of logs using GET method
async function getLogs(req, res){
  res.json(await lg.logList());
}

// retrives a single log through a specific ID 
async function getLog(req, res){
  const result = lg.findLog(req.params.id);
  if (result) {
     res.json(await result);
     } else {
       res.status(404).send('No match');}
}

// creates a new log parsing json body of work, exp, and comp parameters
async function postLogs(req,res){
  const msg = await lg.newLog(req.body.work, req.body.exp, req.body.comp);
  res.json(msg);
}

// Updates an existing log entry by ID
async function putLog(req, res) {
  const updatedLogs = await lg.editLog(req.body);
  res.json(updatedLogs);
}

// referenced from simple-staged-messageboard
function asyncWrap(f) {
  return (req,res,next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('/logs', asyncWrap(getLogs)); 
app.get('/logs/:id', asyncWrap(getLog));
app.put('/logs/:id', express.json(), asyncWrap(putLog));
app.post('/logs', express.json(), asyncWrap(postLogs));

app.listen(8080);


