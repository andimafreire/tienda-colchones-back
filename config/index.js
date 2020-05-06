const commonConfig = require('./common');  // common config constants
const env = process.env.NODE_ENV || 'development';  // Config constants depending on the environment
const config = require(`./${env}`);

module.exports = Object.assign(commonConfig, config);
