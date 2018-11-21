const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
const http = require('http')
const logger = require('morgan')
const routes = require('./routes/index.route')
const PORT = process.env.PORT || 3000

mongoose.connect("mongodb://127.0.0.1/podcasts", { keepAlive: 1 });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongoDB connected");
});

const app = express();
  app.use(express.static(path.join(__dirname, 'public')))
     .use(bodyParser.json())
     .use(cookieParser)
     .use(logger('dev'))
     .set('port', PORT)
     .use('/api', routes)
     .use(bodyParser.urlencoded({ extended: true }))

http.createServer(app).listen(PORT, () => { console.info('Server started on ' + PORT)});

module.exports = app;
