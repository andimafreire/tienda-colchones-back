const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config');

/**
 * Generates a new JSON Web Token
 * @param {object} payload - The payload that will be encoded.
 * @returns {string}
 */
function generateToken(payload) {
  return jwt.sign(payload, config.jwtSecret);
}
/**
 * Ensure a user is authenticated
 * @property {string} req.headers.authorization - The token for the user.
 */
function ensureAuthenticated(req, res, next) {
  return expressJwt({ secret: config.jwtSecret })(req, res, next);
}

module.exports = { generateToken, ensureAuthenticated };
