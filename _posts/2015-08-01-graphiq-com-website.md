---
layout: post
title: Graphiq.com Website
desc: Create a versatile company about site with minimal effort and provide a way for the company to configure the content with ease.
date: 2015-08-01 00:00:00 -0800
categories: graphiq
tags: [System Design, Web Development]
---

# Graphiq.com Website

When we launched [Graphiq.com][1]{:target="\_blank"}, we wanted to quickly build a visually appealing website and move the content out of our codebase into marketing’s hands.

I used a paid framework to save time, made content blocks into templates, and defined a <span class="small-caps">JSON</span> file format, so the marketing department could have full control of the site’s content  without us changing a line of code.

[![Graphiq.com]({{ site.baseurl }}/assets/img/home-graphiq.jpg)](//graphiq.com){:target="\_blank"}

### Background

August 2015, we rebranded [FindTheBest.com][2]{:target="\_blank"} to [Graphiq.com][3]{:target="\_blank"}. An important part of that transition was to make a new company website to host all the marketing pages—about us, product introductions, <span class="small-caps">Q&A</span>, etc.

Previously, we put all the raw <span class="small-caps">HTML</span> for those pages directly into our codebase. So for every single change the marketing department wanted to make, they had to ask an engineer and wait for deployment. With the new website, I wanted to find a way to give the marketing department the power to make changes on their own without going through us.

Graphiq is a startup with limited resources. We needed a decent looking website fast, and we didn’t want to implement a full <span class="small-caps">CMS</span> backend just for our internal use.

### Built on a Framework

To save time, I started with a [paid framework][4]{:target="\_blank"} by [Designmodo](http://designmodo.com/){:target="\_blank"}. 

I spent most of my design time custom making the hero images and experiences above the fold to make sure we leave a good first impression.

<div class="p">
	<div class="unslider-instance unslider-graphiq-com">
		<ul>
			<li>
				<img src="{{ site.baseurl }}/assets/img/project-com-h1.jpg" alt="Graphiq.com Header Image #1">
			</li>
			<li>
				<img src="{{ site.baseurl }}/assets/img/project-com-h2.jpg" alt="Graphiq.com Header Image #2">
			</li>
			<li>
				<img src="{{ site.baseurl }}/assets/img/project-com-h3.jpg" alt="Graphiq.com Header Image #3">
			</li>
			<li>
				<img src="{{ site.baseurl }}/assets/img/project-com-h4.jpg" alt="Graphiq.com Header Image #4">
			</li>
			<li>
				<img src="{{ site.baseurl }}/assets/img/project-com-h5.jpg" alt="Graphiq.com Header Image #5">
			</li>
		</ul>
	</div>
</div>

### Reusable Blocks

At the same time, I asked the marketing department to pick out the blocks from the startup framework that they would use. I specifically asked them to think about reusability and keep the blocks to a minimum.

For each block, I made the content into variables. For example for this block:

![Resuable Block Example]({{ site.baseurl }}/assets/img/project-com-numbers.jpg)

The <span class="small-caps">PHP</span> template looks like the following[^1], and we can pass in an array named `$nums` to fill in the content.

{% highlight html %}
<section class="projects-4 block-nums">
	<? foreach ($nums as $num) : ?>
	<div class="project-wrapper col-sm-3">
		<div class="num"><?= $num->num?></div>
		<span class="name"><?= $num->unit?></span>
	</div>
	<? endforeach; ?>
</section>
{% endhighlight %}
  
I also made the custom-made blocks like the header and footer blocks into their own template files. We ended up having around ten very simple block templates ready to be filled with content.

### One Content File

With these templates, we can empower the marketing team and give them control over the content of the site.

I wrote the logic so they can have one giant <span class="small-caps">JSON</span> file in the following format:

{% highlight javascript %}
{"pages":[{
	"link":"journalist-solutions", // The URL pattern of the page
	..., // More meta data for the page
	"blocks":[{ // Array of blocks going into that page
		"type": "imgtxt", // Block template to use
		"title": "Rise above the noise.",
		"txt": "Bring your articles to life...",
		"img": "/img/journalist-solutions.png"
	}]
}, ...]}
{% endhighlight %}

When a page request comes in, we find the page object with a matching <span class="small-caps">URL</span> pattern, and render the blocks it has. We stored this <span class="small-caps">JSON</span> file out of our main codebase and taught the marketing  department how to update the content by editing that file.

We also implemented a test file that gets used with special <span class="small-caps">URL</span> parameters so marketing can test their content before pushing the changes to the public.

### Extension

After the project, I thought the <span class="small-caps">JSON</span> file was such a simple yet powerful way of constructing a page. This experience inspired me to create [Premade.io][5]{:target="\_blank"} as a side project to help more people make webpages by organizing pre-defined content blocks and filling in their own content.

[Check out the case study of Premade.io &#8594;]({{ site.baseurl }}{% post_url 2016-01-01-premade-io %})

---- 

[^1]:	All the code snippets in this article are simplified for demo purpose. They are not actual samples of code we use in the production environment.

[1]:	//graphiq.com
[2]:	//findthebest.com
[3]:	//graphiq.com
[4]:	//designmodo.com/startup/
[5]:	//premade.io/#/new

