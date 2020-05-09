const express = require('express');
const router = express.Router();
const productsCtrl = require('./products.controller');

router.route('/')
    .get(/* validate(paramValidation.list), */ productsCtrl.list)
    /* .post(authenticator.ensureAuthenticated, validate(paramValidation.create), productsCtrl.create) */;

router.route('/:productId')
    /* .get(validate(paramValidation.edit), productsCtrl.get)
    .put(authenticator.ensureWPAuthenticated, validate(paramValidation.edit), productsCtrl.edit) */
    .delete(/* authenticator.ensureWPAuthenticated, */productsCtrl.remove);

module.exports = router;