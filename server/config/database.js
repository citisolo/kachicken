
//remember to always keep keys in environment
// config.js
var dotenv = require('dotenv');

dotenv.load();

module.exports = {
  secret: process.env.TOKEN_SECRET,
  database_prod: process.env.MONGODB_PRODUCTION,
  database_dev: process.env.MONGODB,
  jwtSession: {
    session: false
  }
};
