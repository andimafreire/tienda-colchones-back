const express = require('express');
const router = express.Router();
const usersCtrl = require('./users.controller');

router.post('/login', usersCtrl.login);

module.exports = router;
