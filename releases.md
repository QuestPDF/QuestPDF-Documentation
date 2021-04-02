---
title: "Releases"
---


## Release notes

### 2021.04
- Added new element: `Debug` - this element can be used for inspecting its children and space taken by them,
- Added new element: `Element` can be used for injecting dynamic elements (usually conditionally) without breaking the fluent API chain. This is practically syntactic sugar to simplify your code.
- The `AspectRatio` element allows now to specify scaling rule: fitting width, height or available space.
- The `Image` element supports now scaling rules: fitting width, height or available space, as well as scaling unproportionally.
- Bugfix: the `GeneratePdf(Stream stream)` method does not close the output stream.
- Bugfix: the `AspectRatio` element might now properly display pageable content.

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


## Roadmap

The QuestPDF library offers multiple tools needed to design and generate PDF documents. However, there is plenty of ideas under consideration. 

### Next releases

Most of the features listed below should be added in the nearest months:

- Spacing property for the Row element,
- Grid element (code simplification by reduce usage of the Row and the Stack elements),
- Canvas element (exposing entire SkiaSharp API to draw complex content),
- Layer element (possible to render elements on top of others, e.g. watermark),
- RichText element (applying multiple styles to text content, text justification, better word-wrapping algorithm, page-break support etc.),
- Custom slots in components (named slots, dynamic slots),
- Documentation cleanup.
  
### Under consideration

There are also features being actively investigated with lower importance:

- Tutorials: adding maps / charts to the document,
- Better debugging experience (e.g. when created layout generates an infinite document),
- The library should return the generated document even if DocumentLayoutException is thrown (to better understand the issue),
- Allow the Placeholder element to show text instead of an icon,
- SVG support ([integration with SkiaSharp.Svg](https://www.nuget.org/packages/SkiaSharp.Svg/)),
- Generation optimization: measuring text operation takes the vast majority of processing time,
- Transformations: scale, rotate, offset, matrix,
- Divider element (replacement for applying border in some scenarios),
- and more...




