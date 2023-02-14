---
layout: doc
sidebar: false
aside: false
---

<script setup>
import RedirectionAlert from '../docs/.vitepress/theme/RedirectionAlert.vue'
</script>

# QuestPDF development roadmap, ensuring quality and assessing licensing opportunities

## What is QuestPDF, and what is its purpose?

**QuestPDF is a modern open-source .NET library for PDF document generation.** It offers a comprehensive layout engine powered by a concise and discoverable C# Fluent API.

The video below shows how the development process looks. To learn more, please check [the Getting Started tutorial](/getting-started).

<video width="100%" style="max-width: 800px" controls autoplay loop>
  <source src="/previewer/video.mp4" type="video/mp4">
</video>


## From zero to hero

QuestPDF development started nearly three years ago. Initially, it was a small side project, an attempt to give something back to the Community.

Everything has changed in the last year. The library has been broadly recognized and received enormous help. It is incredible how friendly and supportive programmers are. More and more people are involved: sharing ideas, helping others, implementing new features... It is no longer `I` but rather `We`. 

At this moment, the library is a substantial dependency in many free and commercial projects. Thus motivating us to pursue professionalism but also increasing our responsibility.


## Long-term roadmap

**The objective is to improve the project and make it a first-choice library for PDF generation.** There are a couple of milestones on the upcoming roadmap:
- extending the Previewer capabilities to not only show the document but also allow to inspect its structure,
- documentation redesign, more precise descriptions, more examples, text redaction,
- reducing output file size (e.g., via font subsetting),
- increased test quality and code coverage,
- further improvements to the advanced text support (text justification, bi-directional text),
- creating more learning materials (e.g., tutorial videos on YouTube),
- introduction of signing and securing the PDF file,
- helping and promoting other open-source projects with features related to PDF generation (e.g., creating charts, maps, font management, etc.).


## Investing time in open-source is not trivial

The more popular the library is, the more challenging project development and management are. Every task listed on the roadmap requires investing a significant amount of time and effort. It is not trivial to find that time, when having a full-time job that obviously is of higher priority. 

As developers, we rarely discuss the problem of scaling open-source. However, a very similar situation is true for many projects developed by enthusiasts, in contrast to company-funded libraries.

**As a project owner and primary developer, I am responsible for ensuring QuestPDF stability and availability in the future. I would like to dedicate more of my time, and provide proper support and maintenance over the upcoming years.** However, this decision needs to be time viable and financially safe.


## Informed decision with the Community

Now it is a time to make a courageous decision, to ask the Community for help and guidance. We set the bar really high. To meet your expectations, the project requires proper funding. Unfortunately, the GitHub Sponsors program does not solve the problem, as it provides an insignificant income compared to the actual job. But still, I highly appreciate everybody who decided to help this way - you are great! 

I have been brainstorming for over two month to find and analyze all available approaches. **I am seriously considering a hybrid licensing model. Recently more and more open-source projects are choosing this path.**


## Financing the project by being professional

**For the vast majority of users, nothing changes. The library is still open-source, fully featured, and free for commercial usage (via the MIT license).** 

**The only difference is applied to enterprise.** Every company/individual with high enough (value yet to be determined) annual gross revenue that uses QuestPDF in a closed-source for-profit project will be obligated to purchase the QuestPDF Enterprise license for each year of development. This version will provide additional, professional, high-priority support.


## Extended 2022.X support

**The new licensing approach will be applied only to releases `2023.X.Y` and beyond.** The licensing model of all prior releases will be unchanged, keeping the MIT license. Furthermore, the last 2022 major release will receive slightly longer quality support to minimize the impact on your projects.


## Change that benefits all

I believe that this approach is best for everyone:
- **for the Community** - the library will still be open-source, fully-featured, free for commercial usage, just better in every detail,
- **for the Business** - the library will be a stable, trusted, and well-maintained dependency, essentially increasing development capabilities and significantly reducing associated risks,
- **for the Library** - the library will receive additional funding to cover more advanced features and be more professional than ever.


## Let's refine the strategy, together

The general idea is here, but it is not set in stone yet. The reason behind this post is to be transparent and learn from You. We want to explore more perspectives and tune all details. We want to ensure that this transition is an educated decision and will be impactless for existing users. **Please share your thoughts and help us find the best way to move the project forward.**

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); grid-gap: 8px 32px;">
    <RedirectionAlert icon="/homepage/survey.svg" content="Take the survey" link="https://docs.google.com/forms/d/e/1FAIpQLSewmFByWbl95z5FXpBDBCTromDe13u9RTKOdv0lrma-RmdnrQ/formResponse" />
    <RedirectionAlert icon="/homepage/discussion.svg" content="Share your comments" link="https://github.com/QuestPDF/QuestPDF/discussions/491" />
</div>


**Thank you all for being with us on this challenging path. Let's make the world better, piece by piece, together. Fingers crossed!**

Marcin Ziąbek and QuestPDF contributors.
