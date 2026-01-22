---
layout: post
title: Measuring Customer Satisfaction
desc: Design mechanisms to collect user feedback and make concrete improvements in the user experiences.
date: 2021-09-29 00:00:00 -0800
categories: alexa
tags: [UX, Measurement]
ogimg: /assets/img/project-csat-og.jpeg
ogtitle: Case Study - Measuring Customer Satisfaction
---

# Measuring Customer Satisfaction

It was a challenge to measure the quality of multimodal experiences that we deliver on Alexa devices. Not every user are staring at the screen when they ask a question on a screen device. The device could be sitting in the corner across the room. Until the recent launch of [Visual ID](https://www.cnet.com/home/on-echo-show-15-alexa-will-recognize-your-face-thanks-to-amazon-visual-id/){:target="_blank"}, we have little data there. Also, many visual responses don’t provide touch interactions, so we can’t infer what customers want from their “click through rate”.

### Human Annotation

The first solution the team tried to adopt is human annotation. We write a comprehensive guidelines to outline what a good multimodal experience should be, and then we train annotators to grade experiences according to the rubrics. We do it for voice answers, and it has been working for Alexa Knowledge.

There is only one issue: We don’t really know what a good multimodal experience should be.

Voice answer has way fewer variables — if an answer is grammatically and factually correct, has the right length and the right order, and contains all the necessary metadata, it’s pretty much there. 

Visual answer doesn’t have such consensus — when people ask “How many people live in Chile?” is it more helpful to show a line graph of the population growth, or is it more helpful to show other relevant attributes for Chile, with a beautiful image? Or both?

![Chile Population in Line Chart]({{ site.baseurl }}/assets/img/project-csat-chile-line.jpeg) | | ![Chile Population with Imagery]({{ site.baseurl }}/assets/img/project-csat-chile-img.jpeg)

Similarly, when people ask “Who is Hugh Jackman?” do they want to just see a beautiful fullscreen image, or do they also value seeing the answer text on the screen?

<table>
	<tr>
		<td>
			<img src="{{ site.baseurl }}/assets/img/project-csat-hugh-title.jpeg" alt="Who is Hugh Jackman without answer text"
			 />
		</td>
		<td>&nbsp;</td>
		<td>
			<video width="100%" controls src="{{ site.baseurl }}/assets/video/alexa-hugh.mp4" poster="{{ site.baseurl }}/assets/video/csat-hugh-cover.jpeg"/>
		</td>
	</tr>
</table>

There is no clear answer. Because of that, getting into human annotation guidelines prematurely would only re-enforce our own convictions and biases. It might not help us to actually improve the quality of experiences for our customers.

### User Survey

To help connect the team with the customers and derive multimodal guidelines from user feedback, I worked with UX researchers to design a study where we record hundreds of experiences as-is and send them to thousands of voice assistant users for their rating and reasoning behind.

<table>
	<tr>
		<td width="50%">
			<p>Who won between Tennessee and Alabama?</p>
			<video width="100%" controls src="{{ site.baseurl }}/assets/video/csat-sports.mp4" poster="{{ site.baseurl }}/assets/video/csat-sports-cover.jpeg"/>
		</td>
		<td>&nbsp;</td>
		<td width="50%">
			<p>Can dogs eat blackberries?</p>
			<video width="100%" controls src="{{ site.baseurl }}/assets/video/csat-dog.mp4" poster="{{ site.baseurl }}/assets/video/csat-dog-cover.jpeg"/>
		</td>
	</tr>
</table>

From there, we then aggregate the scores and use regression model to find which features of the multimodal answer — does it contain an image, does it use a custom layout, etc. contributes the most to customers’ rating. We also use it to identify the flaws in experience designs and make data driven improvements.

<br/>

| ![Before & After]({{ site.baseurl }}/assets/img/project-csat-ba.jpg) |

<br/>

We launched the study in the United States, Germany, and Japan. Every time, it lead us to new insights and allow us to continue to dive deeper. Based on those findings, we then wrote the design guidelines for Alexa Knowledge experiences. 

### Visual Component for Feedback

While user survey gave us a lot of good information and it’s especially good at answering why certain experience has a higher rating than others, it’s quite resource consuming to capture experiences and run the study.

To collect user feedback faster and on a broader scale, we also launched a new visual component that would allow us to target a small percentage of users across the board and get realtime data right before I leave Amazon.

![Visual component]({{ site.baseurl }}/assets/img/project-csat-guife.jpeg)

Hopefully it would provide more timely feedback to the team and help us correlate visual quality to other business metrics like engagement and downstream impact.

<hr />
