const mongodb = require('mongodb');
const path = require('path');
var fs = require('fs');
const getdb = require('../../helpers/mongodb');

/**
 * Create new product
 * @property {string} req.body.title - The title of the product
 * @property {string} req.body.type - The type of the product
 * @property {string} req.body.description - The description of the product
 * @property {number} req.body.price - The price of the product
 * @property {boolean} req.body.highlighted - If the product is highlighted
 * @property {string} req.file.picture - The picture of the product
 * @returns {{ msg: String }}
 */
function create(req, res, next) {
  const product = req.body;
  product.highlighted = (product.highlighted === 'true');
  if (req.file) product.picture = req.file.filename;

  return getdb.then(db =>
    db.collection("products").insertOne(product, function(err, obj) {
      if (err) next(err);
      res.json({message: "ok"});
    })
  ).catch(e => next(e));
}
  
/**
 * Get products list
 * @property {number} req.query.page - Page of the results to be returned.
 * @property {number} req.query.pagesize - The size of the page.
 * @property {number} req.query.type - Type of the results to be returned.
 */
function list(req, res, next) {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.pagesize);
  const skip = limit * (page - 1);
  const options = {skip, limit};  // Pagination options
  var query;

  if (req.query.type == 'destacados') query = { highlighted: true };
  else query = { type: req.query.type };

  return getdb.then(db =>
    db.collection("products").find(query).count((err, count) => {
      if (err) next(err);
      else return db.collection("products").find(query, options).toArray((err2, products) => {
        if (err) next(err);
        else res.json({count, products});
      });
    })
  ).catch(e => next(e));
}

/**
 * Get a product
 * @property {string} req.params.productId - The id of the product
 * @returns {product}
 */
function get(req, res, next) {
  return getdb.then(db => {
    const query = {_id: new mongodb.ObjectID(req.params.productId)};

    return db.collection("products").findOne(query, (err, product) => {
      if (err) {
        next(e);
      } else if (product) {
        res.json(product);
      } else res.status(404).send();
    });
  }).catch(e => next(e));
}
  
/**
 * Edit a product
 * @property {string} req.params.productId - The id of the product
 * @property {string} req.body.type - The type of the product
 * @property {string} req.body.title - The title of the product
 * @property {string} req.body.description - The description of the product
 * @property {number} req.body.price - The price of the product
 * @property {boolean} req.body.highlighted - If the product is highlighted
 * @property {string} req.file.picture - The picture of the product
 * @returns {{ msg: String }}
 */
function edit(req, res, next) {
  return getdb.then(db => {
    const query = {_id: new mongodb.ObjectID(req.params.productId)};
    
    return db.collection("products").findOne(query, (err, product) => {
      if (err) {
        next(e);
      } else if (product) {
        if (req.body.picture != product.picture){
          fs.unlinkSync(path.join(__dirname, '../../public/images', product.picture)); // Delete old picture.
        }
        const newProduct = req.body;
        newProduct.highlighted = (newProduct.highlighted === 'true');
        if (req.file) newProduct.picture = req.file.filename;
        db.collection("products").updateOne(query, { $set: newProduct}, function(err, obj) {
          if (err) next(e);
          else res.json({message: "ok"});
        })
      } else res.status(404).send();
    });
  }).catch(e => next(e));
}
  
/**
 * Delete a product
 * @property {string} req.params.productId - The id of the product
 * @returns { msg: String }
 */
function remove(req, res, next) {
  return getdb.then(db => {
    const query = {_id: new mongodb.ObjectID(req.params.productId)};

    return db.collection("products").deleteOne(query, (err, obj) => {
      if (err) next(err);
      if (obj.deletedCount == 0) res.status(404).send();
      else res.json({message: "deleted"});
    });
  }).catch(e => next(e));;
}
  
module.exports = { list, get, create, edit, remove };