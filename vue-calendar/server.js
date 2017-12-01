require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const Datastore = require('nedb');

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
app.use('/store', express.static(path.join(__dirname, 'src/store')));

app.use(require('body-parser').json());

//db related stuff
const eventsDb = new Datastore({filename:'Events.db',autoload: true});

app.get('/', (req, res) => {
  const template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
  res.send(template);
});
app.get('/events',(req,res) => {
  eventsDb.find({},(err,docs) => {
    if(err === null){
      res.send(docs);
    }else {
      console.log('DB retrieve events error: ' + err);
    }
  })
});
app.post('/add_event',(req,res) => {
  eventsDb.insert(req.body,(err,doc) => {
    if(err === null){
      res.sendStatus(200);
      console.log(`Inserted ${doc.description} with id ${doc._id}`);
    }else {
      console.log('DB add event error: ' + err);
    }
  });

});

const server = http.createServer(app);
/*
if (process.env.NODE_ENV === 'development') {
  const reload = require('reload');
  const reloadServer = reload(server, app);
  require('./webpack-dev-middleware').init(app);
}
*/

server.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  /*
  if (process.env.NODE_ENV === 'development') {
    require("open")(`http://localhost:${process.env.PORT}`);
  }
  */
});
