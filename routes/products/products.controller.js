const getdb = require('../../helpers/mongodb');
const mongodb = require('mongodb');

/**
 * Create new product
 * @property {string} req.body.title - The title of the product
 * @property {string} req.body.type - The type of the product
 * @property {string} req.body.description - The description of the product
 * @property {number} req.body.price - The price of the product
 * @property {boolean} req.body.highlighted - If the product is highlighted
 * @property {string} req.body.picture - The picture of the product
 * @returns {{ msg: String }}
 */
/* function create(req, res, next) {
    
  } */
  
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

  if (req.query.type == 'destacados') query = {highlighted: true};
  else query = {type: req.query.type};

  return getdb.then(db =>
    db.collection("products").find(query).count((err, count) => {
      if (err) next(err);
      else return db.collection("products").find(query, options).toArray((err2, products) => {
        if (err) next(err);
        else res.json({count, products});
      });
    })
  ).catch(e => next(e));;
}

/**
 * Get a product
 * @property {string} req.params.productId - The id of the product
 * @returns {product}
 */
function get(req, res, next) {
  return getdb.then(db => {
    var query;
    try {
      query = {_id: new mongodb.ObjectID(req.params.productId)};
    } catch (e) {
      res.status(400).json({non_field_errors: 'Identificador no válido'});
      return;
    }
    return db.collection("products").findOne({_id: new mongodb.ObjectID(req.params.productId)}, (err, product) => {
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
   * @property {string} req.body.picture - The picture of the product
   * @returns {{ msg: String }}
   */
 /*  function edit(req, res, next) {
   
  } */
  
/**
 * Delete a product
 * @property {string} req.params.productId - The id of the product
 * @returns { msg: String }
 */
function remove(req, res, next) {
  return getdb.then(db => {
    var query;
    try {
      query = {_id: new mongodb.ObjectID(req.params.productId)};
    } catch (e) {
      res.status(400).json({non_field_errors: 'Identificador no válido'});
      return;
    }
    return db.collection("products").deleteOne(query, (err, obj) => {
      if (err) next(err);
      if (obj.deletedCount == 0) res.status(404).send();
      else res.json({message: "deleted"});
    });
  }).catch(e => next(e));;
}
  
module.exports = { list, get, remove };