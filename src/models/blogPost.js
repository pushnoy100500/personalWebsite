'use strict';
var mongoose = require("mongoose"),
	db = require('./db');

var postSchema = mongoose.Schema({
	title: String,
	author: String,
	tags: String,
	message: String,
	date: { type: Date, default: Date.now }
})

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
//create
module.exports.AddPost = function(post, callback) {
	console.log(post);
	let newPost = new Post({
		title: post.title,
		author: post.author,
		tags: post.tags,
		message: post.message
	});
	newPost.save((err, savedPost) => {
	    if (err) return console.error(err);
		callback(savedPost);
	})
}
// retrieve
module.exports.getAllPosts = function(callback) {
	Post.find({}).sort({date: -1}).exec(callback);
}
// update
module.exports.updatePost = function(post, callback) {
	Post.findByIdAndUpdate(post._id, {$set: {title: post.title, author: post.author, tags: post.tags, message: post.message}}, 
		(err, post) => {
			if(err) console.error(err);
			callback(post);
		})
}
// delete
module.exports.deletePost = function(post, callback) {
	Post.findByIdAndRemove(post._id, callback);
}





