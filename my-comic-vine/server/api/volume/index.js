'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./volume.controller');
var auth = require('../../auth/auth.service');

router.get('/', auth.isAuthenticated(), controller.search);
router.get('/saved', auth.isAuthenticated(), controller.getSaved);
router.get('/:volumeId', auth.isAuthenticated(), controller.getOne);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.delete);

module.exports = router;