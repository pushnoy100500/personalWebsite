'use strict';
let mongoose = require("mongoose"),
	db = require('./db'),
	crypto = require('crypto'),
	algorithm = 'aes-256-ctr',
    password = 'coolboy1512';

let adminSchema = mongoose.Schema({
	password: String,
	name: { type: String, unique: true },
	loginToken: String
});

let Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

module.exports.registerAdmin = function(admin, callback) {
	admin.password = encrypt(admin.password);
	admin.save(callback);
}
// returns true/false if credentials correct/incorrect
module.exports.verifyLogin = function(admin, callback) {
	let user = admin.user;
	let password = encrypt(admin.password);

	Admin.find({"name": user}, function(err, result) {
		if (err) return console.error(err);
		console.log(result.length)
		if(result.length > 0) {
			if(result[0].password == password) {
				let token = crypto.randomBytes(32).toString('hex');
				toggleToken(user, token, () => {
					callback({
						access: true,
						user: result[0].name,
						token: token
					});
				});
			} else {
				callback({
					access: false
				})
			}
		} else {				
			callback({
				access: false
			})
		}
	})
}

module.exports.verifyAuth = function(admin, callback) {
	Admin.find({name: admin.user}, (err, result) => {
		if (err) return console.error(err);
		if(result.length > 0) {
			if(result[0].loginToken == admin.token) {
				callback(true);
			} else {
				callback(false);
			}
		} else {
			callback(false);
		}
		
	})
}
module.exports.toggleToken = toggleToken;

// token is either a token or an empty string
// stores token to the database
function toggleToken(name, token, callback) {
	if(!token) {
		Admin.update({ "name": name }, { $set: { loginToken: '' }}, (err) => {
			callback();
		});
	} else {
		Admin.update({ "name": name }, { $set: { loginToken: token }}, (err) => {
			callback();
		});
	}
}
// password encryption
function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
