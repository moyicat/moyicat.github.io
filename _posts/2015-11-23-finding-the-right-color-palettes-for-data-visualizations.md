---
layout: post
ogtitle: Finding the Right Color Palettes for Data Visualizations
desc: While good color palettes are easy to come by these days, finding the right color palette for data visualizations is still quite challenging. At Graphiq, things are arguably made even more difficult…
date: 2015-11-23
categories: articles
tags: [Data Design, Color, Accessibility]
permalink: /writing/:title
ogimg: /assets/img/2015-11-23-og.jpeg
---

# Finding the Right Color Palettes for Data Visualizations

| ![Chart colors]({{ site.baseurl }}/assets/img/2015-11-23-og.jpeg) |

While [good](http://flatuicolors.com/){:target="_blank"} [color](https://www.google.com/design/spec/style/color.html#color-color-palette){:target="_blank"} [palettes](http://colorhunt.co/){:target="_blank"} are easy to come by these days, finding the right color palette for data visualizations [is still quite challenging](https://medium.com/data-lab/i-went-a-little-crazy-trying-to-choose-charted-s-colors-8d4182c1d324){:target="_blank"}.

At Graphiq, things are arguably made even more difficult, as we need to convey information across thousands of unique data sets in [many different types of visualization layouts]({{ site.baseurl }}{% post_url 2015-09-14-visualizing-the-world-s-knowledge %}).

### Current Problems

Rather than diving in head first and creating our own color palette, we started by conducting some research on existing color palettes around the web. Surprisingly, we found that few are actually designed for complex charts and data visualizations. We identified several reasons as to why we couldn’t use existing color palettes:

###### Problem 1: Low Accessibility

Many of the color palettes we looked at were not designed for visualizations. Not only do they not vary enough in brightness, but they were often not created with accessibility in mind. Flat UI Colors is one of the most widely used color palettes out there, and it’s easy to see why: it looks great. But, as its name indicates, it’s designed for user interfaces. Those who are color blind may find it difficult to interpret a data visualization that uses the Flat UI palette:

![Flat UI - Full Colors]({{ site.baseurl }}/assets/img/2015-11-23-flatui-01.png) |&nbsp;&nbsp;| ![Flat UI - Protanopia]({{ site.baseurl }}/assets/img/2015-11-23-flatui-02.png) |&nbsp;&nbsp;| ![Flat UI - Grayscale]({{ site.baseurl }}/assets/img/2015-11-23-flatui-03.png)

<span class="caption">Flat UI Colors in full colors, protanopia mode, and grayscale.</span>

###### Problem 2: Not Enough Colors

Another problem is that many existing color palates did not have enough colors. When building Graphiq visualizations, we need a palette that offers at least six colors, if not eight to twelve colors, to cover all of our use cases. Most color palettes we looked at did not provide enough options.

Here are a few examples from [Color Hunt](http://colorhunt.co/){:target="_blank"}:

![Color Hunt - Not Enough Colors]({{ site.baseurl }}/assets/img/2015-11-23-colorhunt-01.png)

While they are good color palettes, they are not flexible enough to present complex data series.

###### Problem 3: Hard to Distinguish

But wait a second, there are color palettes that are like gradients — theoretically one can create any number of colors from that, right?

Unfortunately, there’s often not enough variation in brightness, and many of them would become indistinguishable very quickly, like these ones, also from Color Hunt:

![Color Hunt - Hard to Distinguish]({{ site.baseurl }}/assets/img/2015-11-23-colorhunt-02.png)

Let’s just try taking [the first one](http://colorhunt.co/#00a38879bd8fbeeb9fffff9d){:target="_blank"} and extending it to a ten data series:

![Color Hunt - Extend to 10 Series]({{ site.baseurl }}/assets/img/2015-11-23-data-series.png)

I’d be surprised if the average user could correctly distinguish the colors in the visualization and match up to the label in the legend, especially among the four greens on the left hand side.

### Our Approach

At Graphiq, we think, eat and breathe data, and we invested a lot of time in finding not one, but multiple color palettes that worked for our visualizations. We learned a lot during this process, and we wanted to share three rules we’ve discovered for generating flexible color palettes:

###### Rule 1: Have a wide range in both hue and brightness

To make sure color palettes are extremely accessible and easy to distinguish, they must vary enough in brightness. Differences in brightness are universal. Take any monochromatic color palette and [test how it looks in Protanopia, Deuteranopia, and grayscale mode](https://medium.com/sketch-app-sources/2b189c0d58fe){:target="_blank"}. You’ll quickly be able to tell how accessible this palette is.

![Material colors - Full Colors]({{ site.baseurl }}/assets/img/2015-11-23-material-colors-01.png) |&nbsp;&nbsp;| ![Material colors - Protanopia]({{ site.baseurl }}/assets/img/2015-11-23-material-colors-02.png) |&nbsp;&nbsp;| ![Material colors - Grayscale]({{ site.baseurl }}/assets/img/2015-11-23-material-colors-03.png)

<span class="caption">Light Blue from Google Material colors in full colors, protanopia mode, and grayscale.</span>

However, having a palette that varies only in brightness may not be enough. The more variance you can have in the color palette, the easier it is for users to map your data series to the visualization. If we can utilize the change in hue for people who are not color blind, it will delight them even more.

![Accessibility Matrix]({{ site.baseurl }}/assets/img/2015-11-23-a11y.png)

And for both the brightness and the hue, the wider range you can find, the more data series you can support.

###### Rule 2: Follow natural patterns of color**

There’s a secret that designers know which is not always immediately intuitive to left-brained folks: Not all colors are created equal.

From a purely mathematical standpoint, a color progression that transitions from light purple to dark yellow should feel roughly similar to a transition from light yellow to dark purple. But as we can see below–the former feels natural, and the latter not so much.

![Gradient Comparison]({{ site.baseurl }}/assets/img/2015-11-23-gradient-comparison.png)

This is because we’ve been conditioned by gradients that consistently appear in nature. We see bright yellow transition into dark purple in gorgeous sunsets, but there’s really no place on earth where you can see a light purple transition into a dark brownish yellow.

<table>
	<tbody>
		<tr>
			<td width="33%">
				<div class="img-16-9" style="background-image: url('{{ site.baseurl }}/assets/img/2015-11-23-sunset-01.jpeg');"></div>
			</td>
			<td>&nbsp;&nbsp;</td>
			<td width="33%">
				<div class="img-16-9" style="background-image: url('{{ site.baseurl }}/assets/img/2015-11-23-sunset-02.jpeg');"></div>
			</td>
			<td>&nbsp;&nbsp;</td>
			<td width="33%">
				<div class="img-16-9" style="background-image: url('{{ site.baseurl }}/assets/img/2015-11-23-sunset-03.jpeg');"></div>
			</td>
		</tr>
	</tbody>
</table>

<span class="caption">Photos from [Kyle Pearce](https://www.flickr.com/photos/keepitsurreal/3256634781){:target="_blank"}, [Wesley Fryer](https://www.flickr.com/photos/wfryer/12577018343){:target="_blank"}, and [Jon Sullivan](http://www.public-domain-image.com/nature-landscape/sunset/slides/ocean-beach-sunset.html){:target="_blank"}.</span>

Similarly, a light green to a purplish blue, a light dry yellow to dark green, an orangey brown to cold gray, and more.

<table>
	<tbody>
		<tr>
			<td width="33%">
				<div class="img-16-9" style="background-image: url('{{ site.baseurl }}/assets/img/2015-11-23-nature-01.jpeg');"></div>
			</td>
			<td>&nbsp;&nbsp;</td>
			<td width="33%">
				<div class="img-16-9" style="background-image: url('{{ site.baseurl }}/assets/img/2015-11-23-nature-02.jpeg');"></div>
			</td>
			<td>&nbsp;&nbsp;</td>
			<td width="33%">
				<div class="img-16-9" style="background-image: url('{{ site.baseurl }}/assets/img/2015-11-23-nature-03.jpeg');"></div>
			</td>
		</tr>
	</tbody>
</table>

<span class="caption">Photos from [Kbh3rd](https://commons.wikimedia.org/wiki/File:Round_Spring_-_Missouri,_16.jpg){:target="_blank"}, [Ian Britton](http://www.freefoto.com/preview/19-07-2/Autumn-Colour){:target="_blank"}, and [Jon Sullivan](http://www.public-domain-image.com/nature-landscape/hot-spring/slides/hot-spring-in-yellowstone.html){:target="_blank"}.</span>

Because we see these natural gradients all the time, they feel familiar and pleasant when we see a corresponding palette used in a visualization.

###### Rule 3: Use a gradient instead of choosing a static set of colors

Gradient palettes that incorporate different hues offer the best of both worlds. Whether you need 2 colors or 10 colors, colors can be strategically extracted from these gradients to produce a visualization that feels natural, but also has enough variation in hue and brightness.

It’s not easy to switch to a gradient mindset, but a good way to start is by setting up grid lines at the breakpoints for each number of data series in Photoshop and constantly testing the gradient and making tweaks. Here’s a snapshot of the process we used to perfect our gradients:

| ![Work in Progress in Photoshop]({{ site.baseurl }}/assets/img/2015-11-23-work-in-progress.png) |

As you can see, we place our color palettes at the top against grayscale, tweak the gradient overlays (so we can get the exact transition code later), and select colors from those breakpoints to test how the palette would work in real life.

### Our Palettes

We’re excited about what we ended up with. Here are some of our color palettes in use, they all begin with pure white and end with pure black to achieve the maximum variation in brightness.

![Palette - Teal to Blue]({{ site.baseurl }}/assets/img/2015-11-23-palettes-01.png) |&nbsp;&nbsp;| ![Palette - Yellow to Brown]({{ site.baseurl }}/assets/img/2015-11-23-palettes-02.png) |&nbsp;&nbsp;| ![Palette - Yellow to Purple]({{ site.baseurl }}/assets/img/2015-11-23-palettes-03.png)

### TL;DR

While there are an increasing number of good color palettes out there, not all of them are applicable to charts and data visualizations. Our approach to visualization color palettes is to make natural gradients that vary in both hue and brightness. By doing this, our palettes are accessible by people who are color blind, obvious for others, and works with anywhere from one to twelve data series.

### Readings, Tools & Resources

Along the way, we identified a few great resources and articles that reached similar conclusions as we did, but take a more mathematical approach and even dive into the color theories. We thought we’d share for further reading:

###### Readings

1. [How to avoid equidistant HSV colors](http://vis4.net/blog/posts/avoid-equidistant-hsv-colors/){:target="_blank"} by [Gregor Aisch](https://twitter.com/driven_by_data){:target="_blank"}

1. [Mastering multi-hued color scales with chroma.js](https://vis4.net/blog/posts/mastering-multi-hued-color-scales/){:target="_blank"} by [Gregor Aisch](https://twitter.com/driven_by_data){:target="_blank"}

1. [Subtleties of color](http://earthobservatory.nasa.gov/blogs/elegantfigures/2013/08/05/subtleties-of-color-part-1-of-6/){:target="_blank"} by [Robert Simmon](https://twitter.com/rsimmon){:target="_blank"}

1. [The viridis color palettes](https://cran.r-project.org/web/packages/viridis/vignettes/intro-to-viridis.html){:target="_blank"} by [Bob Rudis](https://twitter.com/hrbrmstr){:target="_blank"}, [Noam Ross](https://twitter.com/noamross){:target="_blank"} and [Simon Garnier](https://twitter.com/sjmgarnier){:target="_blank"}

1. [A new colormap for MATLAB](http://blogs.mathworks.com/steve/2014/10/13/a-new-colormap-for-matlab-part-1-introduction/){:target="_blank"} by [Steve Eddins](https://twitter.com/steveeddins){:target="_blank"}

###### Tools

1. [Color Picker for Data](http://tristen.ca/hcl-picker/){:target="_blank"} — a handy color tool where you can hold [chroma](https://en.wikipedia.org/wiki/Chroma){:target="_blank"} constant and pick your palette with ease

1. [Chroma.js](http://gka.github.io/chroma.js/){:target="_blank"} — a JavaScript library for dealing with colors

1. [Colorbrewer2](http://colorbrewer2.org/){:target="_blank"} — a great tool for finding heat map and data visualization colors, with multi-hue and single-hue palettes built in.

1. [gradStop.js](https://github.com/Siddharth11/gradStop.js){:target="_blank"} — a JavaScript library to generate monotone color schemes and equidistant gradient stops

1. [Color Oracle ](http://colororacle.org/){:target="_blank"}— a free color blindness simulator for Window, Mac and Linux.

1. [ColorBox](https://www.colorbox.io/){:target="_blank"} — a new tool by Lyft Design that let you control the easing curve of hue, saturation, and luminosity individually.

###### Other Resources

And here are some other good color palette resources we found and loved. While they are not necessarily designed for data visualization, we think you would find them useful.

1. [ColorHunt](http://colorhunt.co/){:target="_blank"} — high quality color palettes with quick preview feature, great resource if you only need four colors

1. [COLOURlovers](http://www.colourlovers.com/){:target="_blank"} — great color community with various tools to create color palettes as well as pattern designs

1. [ColorSchemer Studio](https://www.colorschemer.com/){:target="_blank"} — powerful desktop color pick app

1. [Coolors](https://coolors.co/){:target="_blank"} — light weight random color palette generator where you can lock the colors you want and swap out the others

1. [Flat UI Colors](http://flatuicolors.com/){:target="_blank"} — great UI color set, one of the most popular ones

1. [Material Design Colors](https://www.google.com/design/spec/style/color.html){:target="_blank"} — another great UI palette. Not only does it provide a wide range of colors, it also provides different “weights” or brightness of each color

1. [Palettab](http://palettab.com/){:target="_blank"} — a Chrome extension that shows you a new color palette and font inspiration with every tab

1. [Colors from Canva’s Design Wiki ](https://www.canva.com/colors/){:target="_blank"} — a wiki-style color library with detailed information about colors and their combos.