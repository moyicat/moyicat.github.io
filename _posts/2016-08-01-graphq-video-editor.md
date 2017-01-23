---
layout: post
title: Graphiq Video Editor
desc: Design a video editor in the browser for knowledge engineers to organize Graphiq content into engaging and scalable videos.
date: 2016-08-01 00:00:00 -0800
categories: graphiq
---

# Graphiq Video Editor

When we introduced [Graphiq Videos]({{ site.baseurl }}{% post_url 2016-08-02-graphq-videos %}), we also wanted to make an internal video editing interface so our knowledge engineers and content editors can quickly create videos templates and generate millions of videos.

Being a web company, we decided to make an iMovie-like application within the browser. It was written in [React](https://facebook.github.io/react/){:target="_blank"}.

| ![Screenshot of Graphiq Video Editor]({{ site.baseurl }}/assets/img/project-video-editor-hero.jpg) |

### Idea

The goal of the video editing interface was mainly to make something Graphiq employees would be familiar with. Asking our colleagues, we found iMovie and presentation tools like Keynote, PowerPoint, and Google Slides are the most common applications that people know how to use.

So I kept the main features of those interfaces and came up with this wireframe:

![Graphiq Wireframe]({{ site.baseurl }}/assets/img/project-video-editor-sketch.jpg)

It’s basically a small Google Slide window trapped in an iMovie-like video editing interface with the timeline at the bottom, media folder on the top left, and preview window on the top right.

The only common feature we decided not to provide is the free transform function. Implementing this feature would encourage knowledge engineers to customize each slide, which will result in many inline styles rather than rely on the provided templates.

### Responsive Fullscreen App

Like Graphiq Videos, Graphiq Video Editor interface needs to be a fullscreen application rather than a long scrolling traditional webpage. But unlike Graphiq Videos, we can’t predict the best position of each element on the page, and can’t use position absolute for them all.

I ended up implementing a table-based solution utilizing the auto-layout feature for tables. In hindsight, flexbox would also work. 

There are many layout tricks involved in the final interface that I can’t enumerate in this case study, but here is a video to show the responsiveness:

<div class="p">
	<div class="video-wrap">
		<iframe class="video" src="https://www.youtube.com/embed/dXYuYcCb2PE?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
	</div>
</div>

### Switch Slides

In addition to traditional video functions, our video editor has a few unique features that are not common in other video editors, and switch slide is one of them.

At Graphiq, the knowledge engineers define video templates in our video editor, and we can generate multiple videos using the logic and the rich dataset that we have.

For example, if a knowledge engineer created a video template for headphone overviews, we can generate thousands of headphone overview videos using the data we have about those headphones. However, not all headphones have the same data attribute, and we might want slightly different presentations for over-ear headphones vs. in-ear headphones. That’s when switch slides come in handy.

The idea of switch slide is _a slide with if-else logic_. The video creator can show different slides when different conditions are met. We also support fallback options. Here is a video clip showcasing the interaction design around switch slides:

<div class="p">
	<div class="video-wrap">
		<iframe class="video" src="https://www.youtube.com/embed/6UFApACnfjk?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
	</div>
</div>

### Extended Reading

If you haven't already read the case study on Graphiq Videos, it might be a good idea to [check it out &#8594;]({{ site.baseurl }}{% post_url 2016-08-02-graphq-videos %})
