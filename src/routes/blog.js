'use strict'
var express = require("express"),
	router = express.Router(),
	BlogPost = require('../models/blogPost.js');

router.get("/posts", (req, res) => {
	BlogPost.getAllPosts(function(err, result) {
		//console.log(result);
	
		res.json(result);
	})

	// var newPost = new BlogPost({
	// 	title: "Another Post",
	// 	author: "John Doe",
	// 	tags: "code,learn",
	// 	message: "Swag thundercats wayfarers, four dollar toast actually church-key whatever gastropub asymmetrical jean shorts beard. Microdosing 90's echo park, gastropub gochujang kinfolk franzen irony retro roof party. Squid man bun selfies chia green juice, affogato bespoke quinoa pinterest freegan 3 wolf moon +1. Gastropub man bun single-origin coffee iPhone aesthetic direct trade. "
	// })
	// BlogPost.AddPost(newPost, (err, post) => {
	// 	if(err) console.log(err);
	// 	console.log(post);
	// })

	//res.send();
})

module.exports = router;