const createError = require('http-errors');
const express = require('express');
const path = require('path');
const config = require('config');
const cors = require('cors');
const indexRouter = require('./routes/index');
const app = express();

// view engine setup
app.use(require('express-status-monitor')());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
module.exports = app;
