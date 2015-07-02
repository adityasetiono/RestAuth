var isAuthenticated = function(req, res, next) {
	var token = req.headers['token'];
	if (typeof token == "undefined" || token == null) {
		return res.status(401).json({success: false, message: "Authentication failed."});
	}
	var jwt = require('jsonwebtoken');
	try {
		var user = jwt.verify(token, 'secret');
		req.body.id = user.id;
		console.log(req.body.id);
	} catch (err) {
		res.status(401).json({success: false, message: "Authentication failed."});
	}
	next();
};

module.exports = isAuthenticated;