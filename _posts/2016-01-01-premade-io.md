---
layout: post
title: Premade.io
desc: An open-source drag & drop webpage builder where users can mix and match thousands of content blocks to create webpages faster than ever.
date: 2016-01-01 00:00:00 -0800
categories: side
tags: [System Design, Web Development, UX, Tool]
og: /assets/img/home-premade.jpg
ogtitle: Case Study - Premade.io
ogdesc: An open-source drag & drop webpage builder where users can mix and match thousands of content blocks to create webpages faster than ever.
---

# Premade.io

A working prototype of a drag & drop webpage builder where users can mix and match thousands of pre-made content blocks to create webpages faster than ever.

![Premade.io][image-1]

### Background

With WordPress, Squarespace, Semplice, and many other website builders, I found it was still difficult to find a free, beautiful, and nimble solution to create lightweight pages.

![Competitive Landscape][image-2]

All those webpage creators put a lot of resources into providing customization options. The idea there is to pick one template (with around 10-30 content blocks) and modify them according to users' needs.

I think that can be overrated and often times leads to over-customization disasters. I aim to challenge that status quo by creating an open-source webpage builder with little to no customization function.

Instead of picking from 10-30 content blocks within one theme, users can choose from thousands of content blocks from all themes, and once they pick those blocks, they just fill in the content.

| ![Assemble Blocks - Add Content - Publish][image-3] |

The idea is to make the process more like building Legos - you don’t worry about cutting and melting the bricks, but picking the pre-made, pre-designed, and pre-perfected ones you like. 

### Design

To make the prototype, I designed a block-based data structure. Each page is a <span class="small-caps">JSON</span> file containing its metadata, and an array of blocks, and within each block, there is a pointer linking to a premade block in the database, which contains the <span class="small-caps">HTML</span> structure, the <span class="small-caps">CSS</span> styles for it, and also the content added by the user.

{% highlight javascript %}
{
	id: '6l3I4yteQ2',
	imgUrl: '\img\block-6l3I4yteQ2.jpg',
	html: '<div class=\"block-6l3I4yteQ2\"><h1>...',
	css: '.block-6l3I4yteQ2{background:#333;}...',
	fields: [{ // all the fields user can add content to
	    'key': 'title',
	    'limit': 20,
	    'type': 'txt'
	    'name': 'Title',
	    'helper': 'Less than 20 characters',
	}, ...],
	content: {
	    title: 'Hello World',
	    ...
	}, 
	...
}
{% endhighlight %}

Because content blocks usually come within themes, I also added a Theme class to store shared styles amongst blocks within the same theme.

{% highlight javascript %}
{
	id: 'FTTSlnEpZO',
	imgUrl: '\img\theme-FTTSlnEpZO.jpg',
	name: 'Landio',
	author: 'Taty Grassini',
	authorUrl: 'http://tympanus.net/...'
	css: '.theme-FTTSlnEpZO{font-family: Lato ...',
	...
}
{% endhighlight %}

The overall data and interaction design looks like this: 

<div class="p">
    <img src="{{ site.baseurl }}/assets/img/project-premade-classes.jpg" alt="OOUX design for Premade.io">
    <div class="caption tc">
        The Call to Action (CTA) inventory list idea came from <a href="https://twitter.com/sophiavux" target="_blank">Sophia</a>'s article about <a href="http://alistapart.com/article/ooux-a-foundation-for-interaction-design" target="_blank">OOUX</a>.
    </div>
</div>

### Working Prototype

With this idea, I created a prototype with just two themes and eight blocks using [Parse.js][1]{:target="_blank"}. 

<div class="p unslider-shadow">
	<div class="unslider-instance unslider-premade">
		<ul>
			<li>
				<a href="http://premade.io/#/new" target="_blank">
					<img src="{{ site.baseurl }}/assets/img/project-premade-ux1.jpg" alt="Premade.io #1">
				</a>
			</li>
			<li>
				<a href="http://premade.io/#/new" target="_blank">
					<img src="{{ site.baseurl }}/assets/img/project-premade-ux2.jpg" alt="Premade.io #2">
				</a>
			</li>
			<li>
				<a href="http://premade.io/#/new" target="_blank">
					<img src="{{ site.baseurl }}/assets/img/project-premade-ux3.jpg" alt="Premade.io #3">
				</a>
			</li>
			<li>
				<a href="http://premade.io/#/new" target="_blank">
					<img src="{{ site.baseurl }}/assets/img/project-premade-ux4.jpg" alt="Premade.io #4">
				</a>
			</li>
		</ul>
	</div>
</div>

[Try out the Prototype &rarr;](http://premade.io/#/new){:target="_blank"}

### Marketing Efforts

When I was building this project, I also wanted to generate a social following for it. I thought a good way to market for such a nimble, coding-heavy project was to share my thoughts and process with the community.

I decided to write monthly project updates throughout the year. And then I thought maybe it’s a good challenge for more people like me—maybe more would be inspired to commit in 2016 to their side projects. So I started the [One Side Project Challenge][4]{:target="_blank"} and built a [community][5]{:target="_blank"} of 56 writers and 1.1k followers.

![One Side Project Challenge Community][image-4]

I also wrote a few updates in 2016 (though I didn’t stick to it to the end) and talked about my thinking process in more detail:

1. [Premade.io: Idea, Landing Page, and Prototype][6]{:target="_blank"}
2. [Premade.io: Marketing and Technical Challenges][7]{:target="_blank"}
3. [Premade.io: Learning JavaScript Stacks and Finding Node.js Servers][8]{:target="_blank"}
4. [Premade.io: OOUX, URL Structure, and Basic Functions in Redux][9]{:target="_blank"}

In total, these articles received more than 1,500 reads and the [Premade.io mailing list][10]{:target="_blank"} received more than 500 subscribers.

![Premade.io Landing Page][image-5]

### Current Status

I haven’t been actively developing Premade.io since the mid-2016 as Parse.com was about to go down and Parse.js is not a technology worth investing in anymore. The current codebase is open-sourced and shared on [GitHub][11]{:target="_blank"}.

I am in the process of learning a new stack (probably the <a href="http://mern.io/" target="_blank"><span class="small-caps">MERN</span> stack</a>), and after climbing the steep learning curve, I may come back and rewrite it.

### Extended Reading

This idea came up when I was making [Graphiq.com][12]{:target="_blank"} homepage.<br>
[Read about that story &#8594;]({{ site.baseurl }}{% post_url 2015-08-01-graphiq-com-website %})

[1]:	https://github.com/ParsePlatform/Parse-SDK-JS
[3]:	http://parse.com/
[4]:	https://medium.com/the-mission/the-one-side-project-per-year-challenge-fa3c64a48da6
[5]:	https://medium.com/one-side-project-challenge
[6]:	https://medium.com/one-side-project-challenge/premade-io-idea-landing-page-and-prototype-b88f8eb1e05c
[7]:	https://medium.com/one-side-project-challenge/premade-io-just-keep-going-48efe32a7222
[8]:	https://medium.com/one-side-project-challenge/premade-io-learning-javascript-stacks-and-finding-node-js-servers-97a97dc7a36d
[9]:	https://medium.com/one-side-project-challenge/premade-io-ooux-url-structure-and-basic-functions-in-redux-90784b295e10
[10]:	http://premade.io/
[11]:	https://github.com/Premade/premade.github.io
[12]:	http://graphiq.com

[image-1]:	{{ site.baseurl }}/assets/img/home-premade.jpg
[image-2]:	{{ site.baseurl }}/assets/img/project-premade-value.jpg
[image-3]:	{{ site.baseurl }}/assets/img/project-premade-process.jpg
[image-4]:	{{ site.baseurl }}/assets/img/project-premade-ospc.jpg
[image-5]:	{{ site.baseurl }}/assets/img/project-premade-land.jpg