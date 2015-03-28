'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./search.controller');
var auth = require('../../auth/auth.service');

router.get('/', auth.isAuthenticated(), controller.search);

module.exports = router;