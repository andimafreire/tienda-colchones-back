const express = require('express');
const { validate } = require('express-validation');
const router = express.Router();
const productsCtrl = require('./products.controller');
const authenticator = require('../../helpers/authenticator');
const upload = require('../../helpers/multer');
const paramValidation = require('./products.validators');


router.route('/')
    .get(validate(paramValidation.list, { keyByField: true }, { abortEarly: false }), productsCtrl.list)
    .post(authenticator.ensureAuthenticated, upload.single('picture'), productsCtrl.create);

router.route('/:productId')
    .get(validate(paramValidation.get, { keyByField: true }, { abortEarly: false }),productsCtrl.get)
    .put(authenticator.ensureAuthenticated, validate(paramValidation.get, { keyByField: true }, { abortEarly: false }), upload.single('picture'), productsCtrl.edit)
    .delete(authenticator.ensureAuthenticated, validate(paramValidation.get, { keyByField: true }, { abortEarly: false }), productsCtrl.remove);

module.exports = router;