---
title: "Releases"
---

## Roadmap

The QuestPDF library offers multiple tools needed to design and generate PDF documents. However, there is plenty of ideas under consideration. Most of the features listed below should be added in the nearest months, stay tuned!

### Significant features

- custom slots in components (named slots, dynamic slots),
- RichText element (applying multiple styles to text content, text justification, better word-wrapping algorithm, page-break support etc.),
- SVG support ([integration with SkiaSharp.Svg](https://www.nuget.org/packages/SkiaSharp.Svg/)),
- Layer element (possible to render elements on top of others, e.g. watermark),
- Canvas element (exposing entire SkiaSharp API to draw complex content),
- generation optimization: measuring text operation takes the vast majority of processing time,
- transformations: scale, rotate, offset, matrix,
- better debugging experience (e.g. when created layout generates an infinite document).

### Improvements

- clickable links to external locations (e.g. webpage),
- clickable links to internal locations (e.g. other sections of the document),
- support for font weights ([details](https://docs.microsoft.com/pl-pl/dotnet/api/skiasharp.skfontstyleweight?view=skiasharp-1.68.1)),
- DynamicImage element (allows to generate an image within available space constraints, great for charts/map rendering capabilities),
- element to conditionally show/hide content,
- Divider element (replacement for applying border in some scenarios),
- rendering document to set of images instead of PDF file,
- allow the Placeholder element to show text instead of an icon,
- the library should return the generated document even if DocumentLayoutException is thrown (to better understand the issue).


## Release notes

### 2021.01

It is never easy to spend hundreds of hours creating a library and then decide to make it free! But here is a time to share experience and knowledge, and be a part of the great open-source community, to help others create best experiences possible and innovate the world. The QuestPDF library is now published under MIT license :)

#### Bug fixes:
- the Stack and the PageableStack elements do not apply spacing properly for children with zero height.
- the Wrap element may not work properly when used inside PageableStack element.


### 2020.11

The first official release of the library. Containing all pieces required to successfully create and generate PDF documents. 
