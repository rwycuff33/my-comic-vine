'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./issue.controller');
var auth = require('../../auth/auth.service');

router.get('/', auth.isAuthenticated(), controller.search);
router.get('/:issueId', auth.isAuthenticated(), controller.getOne);
router.get('/volume/:volumeId', auth.isAuthenticated(), controller.getIssuesForVolume);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.delete);

module.exports = router;