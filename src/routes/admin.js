'use strict';
let express = require('express'),
	router = express.Router(),
	Admin = require("../models/admin.js"),
	BlogPost = require('../models/blogPost.js'),
	url = require('url'),
	nodemailer = require('nodemailer');

router.post('/login', (req, res) => {
	let username = req.body.user;
	let password = req.body.password;

	Admin.verifyLogin({
		"user": username,
		"password": password
	}, (result) => {
		res.send(result)
	})
})

router.get("/posts",
	(req, res, next) => {
		isAuthenticated(req, res, next);
	},
	(req, res) => {
		BlogPost.getAllPosts(function(err, result) {
		res.json(result);
	})
})

router.post("/posts",
	(req, res, next) => {
		isAuthenticated(req, res, next);
	},
	(req, res) => {
		console.log(req.body)
		BlogPost.AddPost({
			title: req.body.title,
			author: req.body.author,
			tags: req.body.tags,
			message: req.body.message
		}, (newPost) => {
			res.send(newPost);
		})
		
	})

router.put("/posts", 
	(req, res, next) => {
		isAuthenticated(req, res, next);
	},
	(req, res) => {
		console.log(req.body);
		BlogPost.updatePost(req.body, (post) => {
			res.send(post);
		})
	})

router.delete("/posts", 
	(req, res, next) => {
		isAuthenticated(req, res, next);
	},
	(req, res) => {
		let reqUrl = url.parse(req.url).query.substr(4);
		console.log(reqUrl);
		BlogPost.deletePost({
			_id: reqUrl
		}, (result) => {
			res.send(result);
		});
	})

router.post("/logout", (req, res) => {
	Admin.toggleToken(req.body.user, "", () => {
		res.send();
	})
})

router.post("/email", (req, res) => {
	console.log(req.body)
	var transporter = nodemailer.createTransport('smtps://romanenko.igor2014%40gmail.com:anyadurko15121512@smtp.gmail.com');

	var mailOptions = {
	    from: '"My site 👥" <noreply@mysite.com>', // sender address
	    to: 'romanenko.igor2014@gmail.com', // list of receivers
	    subject: 'Website submission', // Subject line
	    text: "from: " + req.body.name + "<br>email: " + req.body.email + "<br>message: " + req.body.message, // plaintext body
	    html: "from: " + req.body.name + "<br>email: " + req.body.email + "<br>message: " + req.body.message // html body
	};

	transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    res.status(200).send("ok");
	});
})

function isAuthenticated(req, res, next) {
	Admin.verifyAuth({
		user: req.headers.user,
		token: req.headers.token
	}, (bool) => {
		if(bool) {
			next();
		} else {
			res.send({access: false});
		}
	})
}

module.exports = router;









// router.post("/register", (req, res) => {
// 	let username = req.body.user;
// 	let password = req.body.password;
	
// 	let newAdmin = new Admin({
// 		'name': username,
// 		'password': password,
// 		'loginToken': ""
// 	})
// 	console.log(newAdmin)
// 	Admin.registerAdmin(newAdmin, (err, admin) => {
// 		if(err) console.log(err);
// 		res.send(admin);
// 	})
// })