const express = require('express');
const router = express.Router();

router.post('/login', validate(paramValidation.login), userCtrl.login);
router.post('/logout', authenticator.ensureWPAuthenticated, validate(paramValidation.logout), userCtrl.logout);
router.post('/forgotPassword', validate(paramValidation.changePassword), userCtrl.changePassword);

module.exports = router;
