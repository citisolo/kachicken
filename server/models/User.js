var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var config = require('../config');
//var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'member'
  }
});

UserSchema.pre('save', function(next){
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
  });
})

// UserSchema.statics.verify = function(req, res, next) {
// 	var token = req.headers['x-access-token'];
// 	if(!token){
// 		return res.status(401).send({auth: false, message:'No token provided.'});
// 	}
// 	jwt.verify(token, config.secret, function(err, decoded) {
// 		if(err){
// 			return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
// 		}
// 		next();
// 	})
// }
//
// UserSchema.statics.authorize = function(req, res, callback) {
// 	var token = req.headers['x-access-token'];
// 	if(!token){
// 		return res.status(401).send({auth: false, message:'No token provided.'});
// 	}
// 	jwt.verify(token, config.secret, function(err, decoded) {
// 		if(err){
// 			return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
// 		}
// 		callback(req, res, decoded);
// 	})
// }
//
// UserSchema.statics.signToken = function (id){
//   return token = jwt.sign({ id: id }, config.secret, {
//     expiresIn: 86400}); // expires in 24 hours
// }
//
// UserSchema.statics.passport = function(passport) {
//   var opts = {};
//   opts.secretOrKey  = config.secret;
//   passport.use(new JwtStrategy(opts, function(jwt_payload, done){
//     User.findOne({id: jwt_payload.id}, function(err, user){
//       if(err) {
//         return done(err, false);
//       }
//       if(user) {
//         done(null, user);
//       } else {
//         done(null, false);
//       }
//     })
//   }))
// }
//
// UserSchema.statics.authenticate = function (email, password, callback) {
//   User.findOne({email: email})
//     .exec(function (err, user) {
//       if(err) {
//         return callback(err);
//       } else if (!user) {
//         var err = new Error('User not found.');
//         err.status = 401;
//         return callback(err);
//       }
//       bcrypt.compare(password, user.password, function (err, result) {
//         if(result === true) {
//           return callback(null, user);
//         } else {
//           return callback();
//         }
//       })
//     });
// }

UserSchema.methods.comparePassword = function (password, cb){
  var user = this;
  bcrypt.compare(password, user.password, function(err, isMatch){
    if(err) {
      return cb(err)
    }
    cb(null, isMatch);
  });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;
