require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const api = require('./api');

let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
app.get('/', function(req, res) {
  res.send(template);
});

app.get('/api', function(req, res) {
  api.getData(function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(data);
    }
  });
});

let offlineData = JSON.parse(fs.readFileSync(path.resolve('./api_offline.json'), 'utf-8'));
app.get('/offline_api', function(req, res) {
  let data = offlineData.find(item => item.imdbID === req.query.i);
  if (!data) {
    data = { "Response":"False", "Error":`IMDb ID ${req.query.i} not found.` }
  }
  res.json(data);
});

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

app.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  /*
  if (process.env.NODE_ENV === 'development') {
    require('open')(`http://localhost:${process.env.PORT}`);
  }
  */
});
