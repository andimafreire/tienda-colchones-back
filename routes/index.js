const express = require('express');
const router = express.Router();
//const usersRoutes = require('./users/users.routers');
const productsRoutes = require('./products/products.routes');

//router.use('/v1/users', usersRoutes);
router.use('/v1/products', productsRoutes);

module.exports = router;
