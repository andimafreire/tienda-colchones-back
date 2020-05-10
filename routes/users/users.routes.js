const express = require('express');
const router = express.Router();
const usersCtrl = require('./users.controller');

router.post('/login', /* validate(paramValidation.login), */ usersCtrl.login);
// router.post('/forgotPassword', validate(paramValidation.changePassword), userCtrl.changePassword);

module.exports = router;
