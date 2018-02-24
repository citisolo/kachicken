const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const utils = require('../models/utils');
const User = require('../models/User');
const config = require('../config/database');

module.exports = function(passport) {

  var opts = {};
  opts.secretOrKey  = config.secret;
  opts.jwtFromRequest = function(req) {
    var token = null;
    var token = utils.getToken(req.headers);
    return token;
  };

  passport.use(new JwtStrategy(opts, function(jwt_payload, done){

    User.findOne({id: jwt_payload.id}, function(err, user){
      if(err) {
        return done(err, false);
      }
      if(user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
  }))
}
