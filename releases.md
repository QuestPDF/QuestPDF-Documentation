---
title: "Releases"
---

## Roadmap

The QuestPDF library offers multiple tools needed to design and generate PDF documents. However, there is plenty of ideas under consideration. Most of the features listed below should be added in the nearest months, stay tuned!

- Custom slots in components (named slots, dynamic slots),
- RichText element (applying multiple styles to text content, text justification, better word-wrapping algorithm, page-break support etc.),
- SVG support ([integration with SkiaSharp.Svg](https://www.nuget.org/packages/SkiaSharp.Svg/)),
- Layer element (possible to render elements on top of others, e.g. watermark),
- Canvas element (exposing entire SkiaSharp API to draw complex content),
- Generation optimization: measuring text operation takes the vast majority of processing time,
- Transformations: scale, rotate, offset, matrix,
- Better debugging experience (e.g. when created layout generates an infinite document).
- Allow the Placeholder element to show text instead of an icon,
- Divider element (replacement for applying border in some scenarios),
- The library should return the generated document even if DocumentLayoutException is thrown (to better understand the issue).


## Release notes

### 2021.03

Added new element: `ShowIf` can be used for conditionally showing/hiding elements without using c# if-statement. This is practically a syntactic sugar to simplify your code.

Usability improvement: fluent API for changing text style does not mutate original style anymore, creates a copy instead with applied change.

Added possibility to render document as a set of images.

### 2021.02

Introduced new set of useful elements:
- Internal links (redirecting user across the document, useful for creating table of contents),
- External links (redirecting user outside the document, to the webpage),
- Dynamic image (allows the developer to generate an image with very specific resolution).

Added support for font weights.

### 2021.01

It is never easy to spend hundreds of hours creating a library and then decide to make it free! But here is a time to share experience and knowledge, and be a part of the great open-source community, to help others create best experiences possible and innovate the world. The QuestPDF library is now published under MIT license :)

#### Bug fixes:
- the Stack and the PageableStack elements do not apply spacing properly for children with zero height.
- the Wrap element may not work properly when used inside PageableStack element.


### 2020.11

The first official release of the library. Containing all pieces required to successfully create and generate PDF documents. 
