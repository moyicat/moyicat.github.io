$(function() {

	Parse.$ = jQuery;

	// Initialize Parse with your Parse application javascript keys
	Parse.initialize('RkBNfNrV43RNQSA4o63jrWHEBLxcwCAVHBXALatw', 'MgfaX0WNX5oJwEAsUeKJ2co4hxxAhkq9BpSSZWty');

	var App = new (Parse.View.extend({

			Models: {},
			Collections: {},
			Views: {},
			fn: {},

			template: _.template($('#master-tpl').html()),

			events: {
				'click .unclickable': function(e) {
					e.preventDefault();
				},
				'click #scroll-top': function(e) {
					e.preventDefault();
					$(window).scrollTop(0);
				}
			},

			render: function() {
				this.$el.html(this.template());
			},

			start: function() {
				this.render();
				this.$content = this.$el.find('.content');
				this.$navs = this.$el.find('nav').children();
				this.$navProject = this.$navs.eq(0);
				this.$navGraphic = this.$navs.eq(1);
				this.$navContact = this.$navs.eq(2);
				var router = new this.Router;
				router.start();
			}

		}))({el: document.body});
	
	// Project

	App.Models.Project = Parse.Object.extend('Project');

	App.Collections.Projects = Parse.Collection.extend({
		model: App.Models.Project
	});

	App.Views.Project = Parse.View.extend({

		tagName: 'li',

		className: 'clearfix',

		template: _.template($('#project-tpl').html()),

		events: {
			'click': 'detail'
		},

		detail: function(e){
			Parse.history.navigate('#/projects/' + this.model.get('url'), { trigger: true });
		},

		render: function(){
			var attributes = this.model.toJSON();
			this.$el.html(this.template(attributes));
		}

	});

	App.Views.Projects = Parse.View.extend({

		tagName: 'ul',

		className: 'layout projects',
		
		renderOne: function(project){
			var projectView = new App.Views.Project({ model: project });
			projectView.render();
			this.$el.append(projectView.el);
		},

		render: function(){ 
			this.collection.forEach(this.renderOne, this);
		},

	});

	App.Views.ProjectDetail = Parse.View.extend({

		tagName: 'article',

		className: 'project',

		template: _.template($('#project-detail-tpl').html()),

		render: function(){
			var attributes = this.model.toJSON();
			this.$el.html(this.template(attributes));
		}

	});

	// Graphic

	App.Models.Graphic = Parse.Object.extend('Graphic');

	App.Collections.Graphics = Parse.Collection.extend({
		model: App.Models.Graphic
	});

	App.Views.Graphic = Parse.View.extend({

		tagName: 'li',

		template: _.template($('#graphic-tpl').html()),

		render: function(){
			var attributes = this.model.toJSON();
			this.$el.html(this.template(attributes));
		}

	});

	App.Views.Graphics = Parse.View.extend({

		tagName: 'ul',

		className: 'layout graphics',
		
		renderOne: function(graphic){
			var graphicView = new App.Views.Graphic({ model: graphic });
			graphicView.render();
			this.$el.append(graphicView.el);
		},

		render: function(){ 
			this.collection.forEach(this.renderOne, this);
		},

	});

	// Contact

	App.Models.User = Parse.Object.extend('User'),

	App.Views.Contact = Parse.View.extend({

		className: 'contact',
		
		template: _.template('<%= about %>'),

		render: function(){
			var attributes = this.model.toJSON();
			this.$el.html(this.template(attributes));
		}

	});

	// Router

	App.Router = Parse.Router.extend({

		initialize: function(options){
			this.projects = new App.Collections.Projects();
			this.graphics = new App.Collections.Graphics();
		},

		start: function(){
			Parse.history.start();
		},

		routes: { 
			'': 'index',
			'projects/:url': 'project',
			'graphic': 'graphic',
			'contact': 'contact'
		},

		index: function() {

			// App.fn.nav(App.$navProject);

			this.projects.comparator = function(object) {
				return object.get('order');
			};

			this.projects.fetch().then(function(projects) {
				var projectsView = new App.Views.Projects({ collection: projects });
				projectsView.render();
				App.$content.html(projectsView.el);
			});
		},

		project: function(url){

			App.fn.nav(App.$navProject, true);

			var project;

			if (this.projects.length) {

				project = this.projects.filter( function(project) {
					return project.get('url') === url;
				})[0];

				var projectDetailView = new App.Views.ProjectDetail({ model: project });
				projectDetailView.render();
				App.$content.html(projectDetailView.el);

			} else {
				var query = new Parse.Query(App.Models.Project);
				query.equalTo('url', url);
				query.find().then(function(results) {
						project = results[0];
						var projectDetailView = new App.Views.ProjectDetail({ model: project });
						projectDetailView.render();
						App.$content.html(projectDetailView.el);
				});
			}				

		},

		graphic: function() {

			App.fn.nav(App.$navGraphic);

			this.graphics.comparator = function(object) {
				return object.get('order');
			};

			this.graphics.fetch().then(function(graphics) {
				var graphicsView = new App.Views.Graphics({ collection: graphics });
				graphicsView.render();
				App.$content.html(graphicsView.el);
			});
		},

		contact: function() {

			App.fn.nav(App.$navContact);

			var query = new Parse.Query(App.Models.User);
			query.get('7wNRNNzfB8').then(function(user) {
				var userView = new App.Views.Contact({ model: user });
				userView.render();
				App.$content.html(userView.el);
			});
		}

	});

	// Functions

	App.fn.nav = function ($node, clickable) {
		if (!clickable) {
			$node.addClass('curr unclickable')
			.siblings().removeClass('curr unclickable');	
		} else {
			$node.addClass('curr').removeClass('unclickable')
			.siblings().removeClass('curr unclickable');
		}
		App.$content.html();
		
	};

	// Start

	App.start();

	// Other Add-ons

    $('.project').fitVids();
    $('.fancybox').fancybox();
    
});