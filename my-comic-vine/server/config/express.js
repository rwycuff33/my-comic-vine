'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var engines = require('consolidate');

// auth purpose
var session = require('express-session');
var passport = require('passport');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

var env = require('./env.json')[process.env.NODE_ENV || 'development'];
var config = require('./config.json');

module.exports = function (app) {

  app.engine('html', engines.mustache);
  app.set('view engine', 'html');
  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(logger('dev'));
  app.use(passport.initialize());
  // app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(__dirname + config.root + '../client'));
  app.set('appPath', 'client');

  app.use(session({
    secret: env.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
  }));

};
