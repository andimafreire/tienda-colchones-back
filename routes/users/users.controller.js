const getdb = require('../../helpers/mongodb');
const authenticator = require('../../helpers/authenticator');
const hasher = require('../../helpers/hasher');

/**
 * Login user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @returns {User} User - Current user profile with token.
 */
function login(req, res, next) {
    return getdb.then(db => 
        db.collection("users").findOne({email: req.body.email.toLowerCase()}, (err, user) => {
            if (err) {
                next(e);
            } else if (user) {
                // Calculate the hash of the received password using the stored salt and check if matches stored one
                const genPasssword = hasher.sha512(req.body.password, user.password.salt);
                if (genPasssword.hash !== user.password.hash) {
                    res.status(400).json({non_field_errors: 'El correo o contraseña introducido no es correcto.'});
                } else {
                    const payload = {
                        email: user.email,
                        token: authenticator.generateToken({ mail: user.mail })};
                    res.json(payload);
                } 
            } else res.status(400).json({non_field_errors: 'El correo o contraseña introducido no es correcto.'});
        })
    ).catch(e => next(e));;
}

module.exports.login = login;