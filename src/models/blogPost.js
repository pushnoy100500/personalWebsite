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
module.exports.AddPost = function(post, callback) {
	post.save(callback);
}
module.exports.getAllPosts = function(callback) {
	Post.find({}, callback);
}