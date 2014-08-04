$(function() {

	Parse.$ = jQuery;

	// Initialize Parse with your Parse application javascript keys
	Parse.initialize("RkBNfNrV43RNQSA4o63jrWHEBLxcwCAVHBXALatw", "MgfaX0WNX5oJwEAsUeKJ2co4hxxAhkq9BpSSZWty");

	var $content = $('.content'),
		$d = $(document),

		Project = Parse.Object.extend("Project"),

		Projects = Parse.Collection.extend({
			model: Project
		}),

		ProjectView = Parse.View.extend({

			tagName: "li",

			className: "clearfix",

			template: _.template($('#project-tpl').html()),

			events: {
				"click": "detail"
			},

			detail: function(e){
				PortfolioApp.navigate("#/projects/" + this.model.get("url"), { trigger: true });
			},

			render: function(){
				var attributes = this.model.toJSON();
				this.$el.html(this.template(attributes));
			}

		}),

		ProjectsView = Parse.View.extend({

			tagName: "ul",

			className: "layout projects",
			
			renderOne: function(project){
				var projectView = new ProjectView({ model: project });
				projectView.render();
				this.$el.append(projectView.el);
			},

			render: function(){ 
				this.collection.forEach(this.renderOne, this);
			},

		}),

		ProjectDetailView = Parse.View.extend({

			tagName: "article",

			className: "project",

			template: _.template($('#project-detail-tpl').html()),

			render: function(){
				var attributes = this.model.toJSON();
				this.$el.html(this.template(attributes));
			}

		}),

		Graphic = Parse.Object.extend("Graphic"),

		Graphics = Parse.Collection.extend({
			model: Graphic
		}),

		GraphicView = Parse.View.extend({

			tagName: "li",

			template: _.template($('#graphic-tpl').html()),

			render: function(){
				var attributes = this.model.toJSON();
				this.$el.html(this.template(attributes));
			}

		}),

		GraphicsView = Parse.View.extend({

			tagName: "ul",

			className: "layout graphics",
			
			renderOne: function(graphic){
				var graphicView = new GraphicView({ model: graphic });
				graphicView.render();
				this.$el.append(graphicView.el);
			},

			render: function(){ 
				this.collection.forEach(this.renderOne, this);
			},

		}),

		User = Parse.Object.extend("User"),

		UserView = Parse.View.extend({

			className: "contact",
			
			template: _.template('<%= about %>'),

			render: function(){
				var attributes = this.model.toJSON();
				this.$el.html(this.template(attributes));
			}

		}),

		PortfolioRouter = Parse.Router.extend({

			initialize: function(options){
				this.projects = new Projects();
				this.graphics = new Graphics();
			},

			start: function(){
				Parse.history.start({pushState: true});
			},

			routes: { 
				"": "index",
				"projects/:url": "project",
				"graphic": "graphic",
				"contact": "contact"
			},

			index: function() {

				this.projects.comparator = function(object) {
					return object.get("order");
				};

				this.projects.fetch({
					success: function(projects) {
						var projectsView = new ProjectsView({ collection: projects });
						projectsView.render();
						$content.html(projectsView.el);
					},
					error: function(projects, error) {
						console.log(error);
					}
				});
			},

			project: function(url){

				var project = this.projects.filter( function(project) {
					return project.get('url') === url;
				})[0];

				var projectDetailView = new ProjectDetailView({ model: project });
				projectDetailView.render();
				$content.html(projectDetailView.el);

			},

			graphic: function() {

				this.graphics.comparator = function(object) {
					return object.get("order");
				};

				this.graphics.fetch({
					success: function(graphics) {
						var graphicsView = new GraphicsView({ collection: graphics });
						graphicsView.render();
						$content.html(graphicsView.el);
					},
					error: function(projects, error) {
						console.log(error);
					}
				});
			},

			contact: function() {
				var query = new Parse.Query(User);
				query.get("7wNRNNzfB8", {
					success: function(user) {
						var userView = new UserView({ model: user });
						userView.render();
						$content.html(userView.el);
					},
					error: function(object, error) {
						console.log(error);
					}
				});
			}

		}),

		PortfolioApp = new PortfolioRouter();

	PortfolioApp.start();

	$d.on("click", ".currentPage", function (e) {
		e.preventDefault();
	});

    $(".project").fitVids();
    $(".fancybox").fancybox();
    
});