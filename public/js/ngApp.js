var app = angular.module('PersonalSiteApp', ['ui.router', 'ngStorage', 'ngSanitize']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	
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
		.state('login', {
			url: "/login",
			template: "<admin-login-dir></admin-login-dir>"
		})
		.state('admin', {
			url: "/admin",
			template: "<admin-dir></admin-dir>",
			resolve: {
				posts: function($http, $localStorage) {
					return $http({
					  method: 'GET',
					  url: '/admin/posts',
					  headers: {
					  	user: $localStorage.user,
					  	token: $localStorage.token
					  }
					})
				}
			},
			controller: function(posts,$localStorage) {
				
				this.posts = posts.data;
			},
			controllerAs: "admStateCtrl"
		})
			
})

app.run(
    function ( $rootScope, $state, $location, $localStorage) {
				/* authentication middleware */
				$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
					var authStates = ['admin'];
					
					if(authStates.indexOf(toState.name) >= 0) {
						if(!$localStorage.loggedIn) {
								alert('you must be authorized to view this page');
								 window.location.href = "#/login";
								 $state.go("login");

							} else {
								$location.path(toState.url);
							}
					} else {
							$location.path(toState.url);
					}
					/*   */
				});
    }
);

