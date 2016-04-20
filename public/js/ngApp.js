var app = angular.module('PersonalSiteApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	
	// $locationProvider.html5Mode({
	//   enabled: true,
	//   requireBase: false
	// });
	
	$stateProvider
		.state('landing', {
			url: "/",
			template: "<landing-dir></landing-dir>"
		})
		.state('blog', {
			url: "/blog",
			abstract: true,
			resolve: {
				posts: function($http) {
					return $http.get('/blog/posts');
				}
			},
			template: "<ui-view />"
		})
		.state('blog.listing', {
			url: "/listing",
			template: "<blog-dir></blog-dir>",
			resolve: {
				postList: function(posts) {
					return posts;
				}
			},
			controller: function($scope, postList) {
				this.posts = postList.data;				
			},
			controllerAs: "blogStateCtrl"
		})
		.state('blog.details', {
			url: "/listing/:id",
			template: "<post-details-dir></post-details-dir>",
			resolve: {
				post: function(posts, $stateParams) {
						var posts = posts.data;
						for(var i = 0; i < posts.length; i++) {
							if(posts[i]._id == $stateParams.id) 
								return posts[i];
						}
					}
			},
			controller: function($stateParams, post) {
				this.post = post;
				console.log(post)
			},
			controllerAs: "postDetailsCtrl"
		})
		.state('projects', {
			url: "/projects",
			template: "<projects-dir></projects-dir>"
		})
			
})

