var jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.authorize = function(req, res, callback) {
	var token = req.headers['x-access-token'];
	if(!token){
		return res.status(401).send({auth: false, message:'No token provided.'});
	}
	jwt.verify(token, config.secret, function(err, decoded) {
		if(err){
			return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
		}
		callback(req, res, decoded);
	})
}

module.exports.sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.createErrorObject = function(status, message) {
	var err = new Error();
	err.status = status;
	err.message = message;
	return err;
}

module.exports.getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports.remove = (array, element) => {
    const index = array.indexOf(element);
    array.splice(index, 1);
}
