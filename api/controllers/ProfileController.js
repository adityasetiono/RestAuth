/**
 * ProfileController
 *
 * @description :: Server-side logic for managing Profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var ProfileController = {
  updateProfile: function(req, res) {
  	var id = req.body.id;
  	res.status(200).json({success: true, message: "Update user profile test."});
  }
};

module.exports = ProfileController;