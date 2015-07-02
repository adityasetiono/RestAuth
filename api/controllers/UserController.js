/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');

var UserController = {
	register: function(req, res) {
		var user = User.create(req.body).exec(function(err) {
			if (err) {
				console.log("%j", err);
				return res.status(400).json({success: false, message: "Email or Username already used."});
			} else {
				return res.json({
					success: true,
					message: 'Registration Success'
				});
			}
		});
	},

	login: function (req, res) {
  	var username = req.body.username;
  	var password = req.body.password;

    if (typeof password === 'undefined' || typeof username === 'undefined') {
      return res.status(400).json({success: false, message: "Username and Password must be defined."});
    }
    User.findOneByUsername(username).exec(function(err, user) {
      if (err) {
        console.log(err);
        return res.status(500).json({success: false, message: "error"});
      } else {
        if (typeof user === 'undefined') {
          return res.status(400).json({message: "Username not found"});
        } else {
          var hash = user.password;
          if (!(bcrypt.compareSync(password, hash))) {
            return res.status(400).json({success: false, message: "Username and Password combination not found."});
          } else {
            var token = user.generateToken();
            return res.json({token: token});
          }
        }
      }
    });
  },

	findAll: function(req, res) {
    User.find().exec(function(err, users) {
      if (err) {
        console.log(err);
        return res.status(500).json({success: false, message: "Internal Server Error."});
      } else {
        console.log("Users found:", users);
        return res.status(200).json(users);
      }
    });
  },

	findOne: function(req, res) {
		var id = req.param('id');
    User.findOne({id: id}).exec(function(err, user) {
      if (err) {
        console.log(err);
        return res.status(500).json({success: false, message: "Internal Server Error."});
      } else if (typeof user === "undefined") {
      	return res.status(400).json({success: false, message: "User not found."});
      } else {
        console.log("User found:", user);
        return res.status(200).json(user);
      }
    });
  },

  deleteOne: function(req, res) {
    var id = req.param('id');
    User.destroy({id: id}).exec(function deleteCB(err){
      if (err) {
        console.log(err);
        return res.status(500).json({success: false, message: "Error deleting users."});
      } else {
        return res.status(200).json({success: true, message: "User deleted"});
      }
    });
  }
};

module.exports = UserController;