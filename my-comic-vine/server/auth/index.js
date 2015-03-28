'use strict';

var express = require('express');
var router = express.Router();
var config = require('../config/env.json')[process.env.NODE_ENV || 'development'];
var User = require('../api/user/user.model');

require('./local/passport').setup(User, config);

router.use('/local', require('./local'));

module.exports = router;
