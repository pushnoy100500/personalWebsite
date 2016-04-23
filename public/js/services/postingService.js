var app = angular.module('PersonalSiteApp');
app.service("postingService", function($http, $localStorage) {
	this.addPost = function(post, callback) {
		$http({
			method: 'POST',
			url: '/admin/posts',
			headers: {
			  	user: $localStorage.user,
			  	token: $localStorage.token
			},
			data: {
				title: post.title,
				author: post.author,
				tags: post.tags,
				message: post.message
			}
		}).then(function(success) {
			callback(success);
		}, function(error) {
			callback(error);
		})
	}
	this.deletePost = function(id, callback) {
		$http({
			method: "DELETE",
			url: "/admin/posts",
			headers: {
				user: $localStorage.user,
			  	token: $localStorage.token
			},
			params: {
				_id: id
			}
		}).then(function(success) {
			console.log('here')
			callback(success);
		}, function(error) {
			//callback(error);
			console.log(error);
		})
	}
	this.updatePost = function(post, callback) {
		$http({
			method: "PUT",
			url: "/admin/posts",
			headers: {
				user: $localStorage.user,
			  	token: $localStorage.token
			},
			data: post
		}).then(function(success) {
			callback(success);
		}, function(error) {
			console.log(error);
		})
	}

})