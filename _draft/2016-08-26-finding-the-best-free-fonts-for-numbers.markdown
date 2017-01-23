---
layout: post
title:  "Finding the Best Free Fonts for Numbers"
desc: "Including a Recommendation List for 20 Google Fonts"
date:   2016-08-26 19:12:07 -0800
categories: write viz
---

While [good](//flatuicolors.com){:target="_blank"} [color](//material.io/guidelines/style/color.html#color-color-palette){:target="_blank"} [palettes](http://colorhunt.co){:target="_blank"} are easy to come by these days, finding the right color palette for data visualizations [is still quite challenging](https://medium.com/data-lab/i-went-a-little-crazy-trying-to-choose-charted-s-colors-8d4182c1d324){:target="_blank"}.

At Graphiq, things are arguably made even more difficult, as we need to convey information across thousands of unique data sets in [many different types of visualization layouts](../../../../write/2015/09/14/visualizing-the-world-s-knowledge.html).

### Current Problems

Rather than diving in head first and creating our own color palette, we started by conducting some research on existing color palettes around the web. Surprisingly, we found that few are actually designed for complex charts and data visualizations. We identified several reasons as to why we couldn’t use existing color palettes:

###### Problem 1: Low Accessibility

Many of the color palettes we looked at were not designed for visualizations. Not only do they not vary enough in brightness, but they were often not created with accessibility in mind. Flat UI Colors is one of the most widely used color palettes out there, and it’s easy to see why: it looks great. But, as its name indicates, it’s designed for user interfaces. Those who are color blind may find it difficult to interpret a data visualization that uses the Flat UI palette:

| ![Flat UI colors](/assets/img/post-color-01-flat-ui.png) | ![Flat UI colors in Protanopia mode](/assets/img/post-color-02-flat-ui.png) | ![Flat UI colors in grayscale](/assets/img/post-color-03-flat-ui.png) |

<p class="caption">
	Flat UI Colors in full colors, protanopia mode, and grayscale.
</p>

###### Problem 2: Not Enough Colors

Another problem is that many existing color palates did not have enough colors. When building Graphiq visualizations, we need a palette that offers at least six colors, if not eight to twelve colors, to cover all of our use cases. Most color palettes we looked at did not provide enough options.

Here are a few examples from [Color Hunt](//colorhunt.co/){:target="_blank"}:

![Color Hunt, not enough colors](/assets/img/post-color-04-color-hunt.png)


While they are good color palettes, they are not flexible enough to present complex data series.

###### Problem 3: Hard to Distinguish

But wait a second, there are color palettes that are like gradients — theoretically one can create any number of colors from that, right?

Unfortunately, there’s often not enough variation in brightness, and many of them would become indistinguishable very quickly, like these ones, also from Color Hunt:

![Color Hunt, hard to distinguish](/assets/img/post-color-05-color-hunt.png)

Let’s just try taking the first one and extending it to a ten data series:

![10 data series](/assets/img/post-color-06-10-series.png)

I’d be surprised if the average user could correctly distinguish the colors in the visualization and match up to the label in the legend, especially among the four greens on the left hand side.

---

### Our Approach

At Graphiq, we think, eat and breathe data, and we invested a lot of time in finding not one, but multiple color palettes that worked for our visualizations. We learned a lot during this process, and we wanted to share three rules we’ve discovered for generating flexible color palettes:

###### Rule 1: Have a wide range in both hue and brightness

To make sure color palettes are extremely accessible and easy to distinguish, they must vary enough in brightness. Differences in brightness are universal. Take any monochromatic color palette and [test how it looks in Protanopia, Deuteranopia, and grayscale mode](https://medium.com/sketch-app-sources/how-to-design-in-sketch-for-color-blind-users-2b189c0d58fe){:target="_blank"}. You’ll quickly be able to tell how accessible this palette is.

| ![Google Material colors](/assets/img/post-color-07-material.png) | ![Google Material colors in Protanopia mode](/assets/img/post-color-08-material.png) | ![Google Material colors in grayscale](/assets/img/post-color-09-material.png) |

<p class="caption">
	Light Blue from Google Material colors in full colors, protanopia mode, and grayscale.
</p>

However, having a palette that varies only in brightness may not be enough. The more variance you can have in the color palette, the easier it is for users to map your data series to the visualization. If we can utilize the change in hue for people who are not color blind, it will delight them even more.

![Happiness chart](/assets/img/post-color-10-chart.png)

And for both the brightness and the hue, the wider range you can find, the more data series you can support.

###### Rule 2: Follow natural patterns of color

There’s a secret that designers know which is not always immediately intuitive to left-brained folks: Not all colors are created equal.

From a purely mathematical standpoint, a color progression that transitions from light purple to dark yellow should feel roughly similar to a transition from light yellow to dark purple. But as we can see below–the former feels natural, and the latter not so much.

![Natural colors](/assets/img/post-color-11-natural.png)

This is because we’ve been conditioned by gradients that consistently appear in nature. We see bright yellow transition into dark purple in gorgeous sunsets, but there’s really no place on earth where you can see a light purple transition into a dark brownish yellow.

Similarly, a light green to a purplish blue, a light dry yellow to dark green, an orangey brown to cold gray, and more.

![]()

Because we see these natural gradients all the time, they feel familiar and pleasant when we see a corresponding palette used in a visualization.

###### Rule 3: Use a gradient instead of choosing a static set of colors

Gradient palettes that incorporate different hues offer the best of both worlds. Whether you need 2 colors or 10 colors, colors can be strategically extracted from these gradients to produce a visualization that feels natural, but also has enough variation in hue and brightness.

It’s not easy to switch to a gradient mindset, but a good way to start is by setting up grid lines at the breakpoints for each number of data series in Photoshop and constantly testing the gradient and making tweaks. Here’s a snapshot of the process we used to perfect our gradients:

![]()

As you can see, we place our color palettes at the top against grayscale, tweak the gradient overlays (so we can get the exact transition code later), and select colors from those breakpoints to test how the palette would work in real life.

---

### Our Palettes

We’re excited about what we ended up with. Here are some of our color palettes in use, they all begin with pure white and end with pure black to achieve the maximum variation in brightness.

![]()

### Our Palettes in Use

---

### Readings, Tools, and Resources

Along the way, we identified a few great resources and articles that reached similar conclusions as we did, but take a more mathematical approach and even dive into the color theories. We thought we’d share for further reading:

###### Readings

1.  [How to avoid equidistant HSV
colors](http://vis4.net/blog/posts/avoid-equidistant-hsv-colors/){:target="_blank"} by [Gregor Aisch](https://twitter.com/driven_by_data){:target="_blank"}
1.  [Mastering multi-hued color scales with chroma.js](https://vis4.net/blog/posts/mastering-multi-hued-color-scales/){:target="_blank"} by [Gregor Aisch](https://twitter.com/driven_by_data){:target="_blank"}
1.  [Subtleties of color](http://earthobservatory.nasa.gov/blogs/elegantfigures/2013/08/05/subtleties-of-color-part-1-of-6/){:target="_blank"}
by [Robert Simmon](https://twitter.com/rsimmon){:target="_blank"}
1.  [The viridis color palettes](https://cran.r-project.org/web/packages/viridis/vignettes/intro-to-viridis.html){:target="_blank"}
by [Bob Rudis](https://twitter.com/hrbrmstr){:target="_blank"}, [Noam Ross](https://twitter.com/noamross){:target="_blank"} and [Simon Garnier](https://twitter.com/sjmgarnier){:target="_blank"}
1.  [A new colormap for MATLAB](http://blogs.mathworks.com/steve/2014/10/13/a-new-colormap-for-matlab-part-1-introduction/){:target="_blank"}
by [Steve Eddins](https://twitter.com/steveeddins){:target="_blank"}

###### Tools

1.  [Color Picker for Data](http://tristen.ca/hcl-picker/){:target="_blank"} — a handy color tool where you can hold [chroma](https://en.wikipedia.org/wiki/Chroma){:target="_blank"} constant and pick your palette with ease
1.  [Chroma.js](http://gka.github.io/chroma.js/){:target="_blank"} — a JavaScript library for dealing with colors
1.  [Colorbrewer2](http://colorbrewer2.org/){:target="_blank"} — a great tool for finding heat map and data visualization colors, with multi-hue and single-hue palettes built in.
1.  [gradStop.js](https://github.com/Siddharth11/gradStop.js){:target="_blank"} — a JavaScript library to generate monotone color schemes and equidistant gradient stops
1.  [Color Oracle ](http://colororacle.org/){:target="_blank"}— a free color blindness simulator for Window, Mac and Linux.

###### Other Resources

And here are some other good color palette resources we found and loved. While they are not necessarily designed for data visualization, we think you would find them useful.

1.  [ColorHunt](http://colorhunt.co/){:target="_blank"} — high quality color palettes with quick preview feature, great resource if you only need four colors
1.  [COLOURlovers](http://www.colourlovers.com/){:target="_blank"} — great color community with various tools to create color palettes as well as pattern designs
1.  [ColorSchemer Studio](https://www.colorschemer.com/){:target="_blank"} — powerful desktop color pick app
1.  [Coolors](https://coolors.co/app/){:target="_blank"} — light weight random color palette generator where you can lock the colors you want and swap out the others
1.  [Flat UI Colors](http://flatuicolors.com/){:target="_blank"} — great UI color set, one of the most popular ones
1.  [Material Design Colors](https://www.google.com/design/spec/style/color.html){:target="_blank"} — another great UI palette. Not only does it provide a wide range of colors, it also provides different “weights” or brightness of each color
1.  [Palettab](http://palettab.com/){:target="_blank"} — a Chrome extension that shows you a new color palette and font inspiration with every tab
1.  [Swiss Style Color Picker](http://www.swisscolors.net/){:target="_blank"} — another collection of good color palettes

---

Hopefully this post was useful to you! What’s your process of creating color palettes? What other tools have you used? We’d love to hear any lessons you’ve learned related to color palettes and visualizations.

To see more about our engineering process, please subscribe to our publication: Graphiq Inc.


<p class="caption">
	Originally posted on <a href="https://blog.graphiq.com/finding-the-right-color-palettes-for-data-visualizations-fcd4e707a283" target="_blank">Medium.com</a>, thanks to Hillary McDaniel.
</p>
