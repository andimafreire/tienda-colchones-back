const express = require('express');
const router = express.Router();
const productsCtrl = require('./products.controller');
const authenticator = require('../../helpers/authenticator');

router.route('/')
    .get(/* validate(paramValidation.list), */ productsCtrl.list)
    /* .post(authenticator.ensureAuthenticated, validate(paramValidation.create), productsCtrl.create) */;

router.route('/:productId')
    /* .get(validate(paramValidation.edit), productsCtrl.get)
    .put(authenticator.ensureAuthenticated, validate(paramValidation.edit), productsCtrl.edit) */
    .delete(authenticator.ensureAuthenticated, productsCtrl.remove);

module.exports = router;