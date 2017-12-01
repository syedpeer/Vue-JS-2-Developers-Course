const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const axios = require('axios');
const querystring = require('querystring');

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json(null));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'index.html'));
});

const instance = axios.create({
  baseURL: 'https://api.imgur.com/3/',
  headers: { 'Authorization': 'Client-ID ' + process.env.IMGUR_CLIENT_ID }
});

app.get('/search/:query', function(req, res) {
  const url = 'gallery/search/top/0/?' + querystring.stringify({ q: req.params.query });
  instance.get(url).then(function (result) {
      res.send(result.data.data.filter((item) => !item.is_album && !item.nsfw && !item.animated));
    }).catch(function (error) {
      console.log(error);
    })
  ;
});

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

server.listen(process.env.PORT, function () {
  console.log('Listening on port '.concat(process.env.PORT))
});
