---
layout: post
title: Graphiq Videos
desc: Design the framework and templates to present Graphiq knowledge in the form of videos and animated webpages.
date: 2016-08-02 00:00:00 -0800
categories: graphiq
---

# Graphiq Videos

Videos are a great format to walk the audience through not one but a handful of data visualizations and to tell a story, a deep insight we draw from our vast database. While Graphiq has a lot of experience building and scaling web products, it doesn’t have any experience building videos.

I designed and coded an <span class="small-caps">HTML</span> + <span class="small-caps">CSS</span> framework and a handful of templates to create webpages that look like 16:9 videos. And [Alex Wilson][1]{:target="_blank"}, a ninja front-end developer, made a Javascript library to play through those webpages like videos, used [SlimerJS][2]{:target="_blank"} to take a screenshot of each frame, and then stitched them into mp4 files.

<div class="p">
	<div class="video-wrap">
		<iframe class="video" src="https://www.youtube.com/embed/oCOSQp9W4ME?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
	</div>
</div>

We [started]({{ site.baseurl }}/assets/video/graphiq_video_hackathon.mp4){:target="_blank"} this project in Graphiq’s first Hackathon in 2015. It was introduced to the public on [May 13, 2016][3]{:target="_blank"}, and now in the growing phase. We had a lot of [fun]({{ site.baseurl }}/assets/video/graphiq_video_demo.mp4){:target="_blank"} along the way.

### Goals

There were two goals I want to achieve when I started making the framework for Graphiq videos:

1. The <span class="small-caps">HTML</span> structure of each slide needs to be style-agnostic, so we can control the styles and layout just by applying different <span class="small-caps">CSS</span> classes to the wrapper. This will make it easy for us to update video templates in the future without changing any structural code.
2. The video should be very responsive—everything element should scale with the viewpoint and fill it up. It will make sure the generated video looks exactly the same as the live webpage preview.

### Style-agnostic Structure

Like every popular video making application, we organize our videos as a list of slides (or clips), conceptually like this in code[^1]:

{% highlight html %}
<div class="slides">
	<div class="slide"></div>
	...
</div>
{% endhighlight %}

Within each slide, I decided to make the <span class="small-caps">HTML</span> structure identical, just a list of the elements the slide contains:

{% highlight html %}
<div class="slide">
	<div class="slide-title">Title</div>
	<div class="slide-text">Lorem ipsum dolor sit amet</div>
	<div class="slide-media"></div>
</div>
{% endhighlight %}

No structure, no nesting, just elements; everything else relies on the classes and styles.

### Layout Basis

###### Position Absolute

From webpage to video, one big change in design and front-end code is the page is no longer a scrolling flow, but a defined 16:9 screen. 

This means new challenges, as most <span class="small-caps">CSS</span> layout techniques do not apply; but also more freedom—everything can be `position: absolute;` with a defined place. That also eliminated the need of having structural <span class="small-caps">HTML</span> code in the slides. 

So I decided to do exactly that, have `.slide` fill up the entire page with a fixed position, and every element within position absolute.

{% highlight scss %}
.slide {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}
.slide-title,
.slide-text,
.slide-media {
	position: absolute;
}
{% endhighlight %}

###### vw and vh

With absolute positioning, how to place the elements in the correct space becomes the next question. 

We need the slide to scale with the viewpoint so we can’t use absolute units like pixels. Among relative units, it's either `%` or `vw` and `vh`. 

We picked `vw` and `vh` because they are more predictable. Also, we could use `vh` within width calculation and `vw` in height. `%` leads to much more complicated calculations.

| ![vh vs. %]({{ site.baseurl }}/assets/img/project-video-vh.png) |

In addition, we wanted the text to size with the slide as well. The `%` in `font-size` attribute would be processed as a percentage of the inherited font size, not the parent `<div>` height, where `vw` and `vh` still base on the viewpoint size.

That’s why we wrote the slide layouts in `vw` and `vh` units moving forward.

### Layouts

###### Guidelines

Before jumping to create different classes for different layouts, I brainstormed about possible templates and came up with a set of simple guidelines:

![Graphiq Video Guidelines]({{ site.baseurl }}/assets/img/project-video-guidelines.png)

###### Classes for Each Element

I then created all possible styles for every element that could be put into a slide. Take slide title as an example:

{% highlight scss %}
.slide-title {
	// Font size
	&.small {
		font-size: $titleFontSizeSm;
		line-height: $titleFontLineHeightSm;
	}
	&.normal { ... }
	&.large { ... }
	// Position
	&.position-top { top: $padding; }
	&.position-bottom { bottom: $padding; }
	&.position-middle {
		top: 50%;
		transform: translate(0, -50%);
	}
	&.position-center { ... }
	&.position-left { ... }
	&.position-right { ... }
	// Alignment
	&.align-right { text-align: right; }
	&.align-center { text-align: center; }
	// and many more ...
}
{% endhighlight %}

###### Layout Templates

After that, each layout template becomes just a combination of element classes. With <span class="small-caps">SASS</span>’s `@extend` feature, it’s very easy to write:

{% highlight scss %}
.slide.template-1 {
	.slide-title {
		@extend .slide-title.large;
		@extend .slide-title.position-middle;
		@extend .slide-title.align-right;
	}
	.slide-media {
		@extend .slide-media.mask-50;
	}
}
{% endhighlight %}

Some of the templates we have:

| ![Graphiq Video Templates][image-3] |

Later, we moved it to a Javascript file, but the concept remained the same.

### Themes

In addition to layout, we also wanted to use classes to give slides different themes. 

Again, the themes had to be very flexible. So we defined everything that should be controlled by the theme as a <span class="small-caps">SASS</span> object.

{% highlight scss %}
$theme-dark: (
	color-bg:    $bodyBlack,
	color-prime: $white,
);
{% endhighlight %}

We created a <span class="small-caps">SASS</span> mixin to generate style overrides for slides with theme classes.

{% highlight scss %}
@mixin theme($selector, $theme) {
	#{$selector} {
		background: map-get($theme, color-bg);
		.slide-title {
			color: map-get($theme, color-prime);
		}
	}
}
{% endhighlight %}

Then, we can call the mixin to generate style overrides for themed slides.

{% highlight scss %}
@include theme('.slide.theme-dark', $theme-dark);
{% endhighlight %}

### Slide Playground

A quick demo to show how easy it is to switch layouts and themes. It is also avaliable on [CodePen](http://codepen.io/moyicat/pen/02cd662e8c8e31db70da53ab0730e76f){:target="_blank"}.

{% include demo_graphiq_video.html %}

### Live Examples

A few more examples to show our web animation technology—these are not actual videos, but webpages. Inspect to see how they work!

<div class="p graphiq-video-wrap">
	<div class="ftb-widget" data-width="800" data-height="200" data-widget-id="fBescCmfEm9"  data-href="http://colleges.startclass.com"></div><script async src="https://s.graphiq.com/rx/widgets.js"></script>
	<div class="caption tc">
		<a href="https://www.graphiq.com/sites/default/files/feather/college_overview-2017-01-16-WYne.mp4" class="no-underline" target="_blank">
			Check out the generated video file &#8594;
		</a>
	</div>
</div>
<div class="p graphiq-video-wrap">
	<div class="ftb-widget" data-width="800" data-height="200" data-widget-id="2q9GBDSwfxH"  data-href="http://www.graphiq.com/vlp/2q9GBDSwfxH"></div>
	<div class="caption tc">
		<a href="https://www.graphiq.com/sites/default/files/feather/apple_watch_data_in_context-2016-09-07-vJhc.mp4" class="no-underline" target="_blank">
			Check out the generated video file &#8594;
		</a>
	</div>
</div>

### Next Step

After making this video technology, Wilson and I also created a web-based video editor so our knowledge engineers can organize Graphiq content into engaging and scalable videos.

[Read about that story &#8594;]({{ site.baseurl }}{% post_url 2016-08-01-graphq-video-editor %})

---- 

[^1]:	All the code snippets in this article are simplified for demo purpose. They are not actual code we use in production environment.

[1]:	https://twitter.com/alexdeanwilson
[2]:	https://slimerjs.org/
[3]:	https://twitter.com/moyicat/status/730849856072253440


[image-3]:	{{ site.baseurl }}/assets/img/project-video-templates.jpg