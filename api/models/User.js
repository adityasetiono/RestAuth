/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

var User = {
	connections: 'localMongoDb',
 	adapter: 'sails-mongo',
 	afterValidate: function(values, cb) {
 		cb();
 	},
	beforeCreate: function(values, cb) {
		bcrypt.hash(values.password, 10, function(err, hash) {
		if (err) return cb(err);
		values.password = hash;
			cb();
		});
	},
	attributes: {
	  	username: {
	  		type: 'string',
	  		unique: true,
	  		maxLength: 30,
	  		minLength: 4,
	  		required: true,
	  		index: true
	  	},
	  	password: {
	  		type: 'string',
	  		minLength: 4,
	  		maxLength: 20,
	  		required: true
	  	},
	  	firstName: {
	  		type: 'string',
	  		maxLength: 50
	  	},
	  	lastName: {
	  		type: 'string',
	  		maxLength: 50
	  	},
	  	email: {
	  		type: 'email',
	  		unique: true,
	  		required: true
	  	},
	  	createdAt: 'integer',
	  	toJSON: function() {
	      var obj = this.toObject();
	      delete obj.password;
	      delete obj.createdAt;
	      delete obj.updatedAt;
	      return obj;
	    },
	    generateToken: function() {
			var jwt = require('jsonwebtoken');
			var obj = this.toObject();
			var time = new Date().getTime() / 1000;
			var jwtBody = {
				id: obj.id,
				firstName: obj.firstName,
				lastName: obj.lastName,
				email: obj.email,
				iat: time,
				exp: time + (7 * 24 * 60 * 60),
				nbf: time
			};
			var token = jwt.sign(jwtBody, 'secret');
			return token;
	    }
  	}
};

module.exports = User;