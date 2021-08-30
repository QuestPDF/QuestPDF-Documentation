---
title: "Releases"
---


## Release notes

### 2021.09

Added support for registering custom fonts. This way, the application can ship its own set of fonts that are independent of the hosting environment. Please refer to the `Patterns and practices` section for more details.

### 2021.08
This release mostly introduces a couple of additions requested by the QuestPDF community:
- The ability to create documents with pages of various sizes, including continuous pages which are not restricted in height,
- The `PageNumber` component supports now additional placeholders, such as total number of pages or page number of predefined locations. This addition is great for creating lists of content with interactive links, 
- Added new element: `Unconstrained` - it removes any size constraints and gives its child full freedom in terms of layout,
- Added new elements: `Scale`, `ScaleHorizontal` and `ScaleVrtical` - they allow to change the scale of an included child, making content inside bigger or smaller than it will appear otherwise,
- Added new elements: `FlipOver`, `FlipHorizontal` and `FlipVertical` - they allow to create a mirror image of the content in one or both axes,
- Added new elements: `RotateLeft` and `RotateRight` - they allow to rotate the content by 90 degrees to the left or to the right, preserving space constraints,
- Added new element: `Rotate(degrees)` - it allows to rotate its content. Important: this element does not preserve space constraints and elements put inside may be placed over other elements,
- Added new elements: `TranslateX` and `TranslateY` - they allow to move content in both axes, preserving size constraints.

Additionally, this release includes some improvements to the engine used for generating code examples and their results. In the future, it will simplify creating examples and therefore will allow creating better documentation.

Breaking changes:

1) `PageNumber` - the default placeholder storing current page number has changed. Please replace your code following this patter:

```csharp
// change from:
.PageNumber("Page {number}")

// to:
.PageNumber("Page {pdf:currentPage}")
```

2) The page settings are defined slightly differently. The page size is no longer defined in the `DocumentMetadata` class. The page margins have now predefined fluent API methods and do not rely on the padding element anymore. Please refer to the Getting Started section to see where this information should be placed.


### 2021.05
This release is the biggest one so far, offering a handful of new features and helpers:
- Added new element: `Box` - it does not enforce parent size to its child,
- Added new element: `Grid` - allows putting elements on the grid layout. Each element can take various number of columns. To big items will be moved to the next row,
- Added new element: `Canvas` - allows drawing custom content using the SkiaSharp canvas element,
- Added new element: `EnsureSpace` - makes sure that pageable content that according to the layout will take multiple pages, has enough space on each page,
- Added new element: `Layers` - allows drawing content below and above the main layer, e.g. drawing text on top of the image,
- Redesigned the `Debug` element - it does not only highlight space but also puts a small label,
- Added set of predefined colors inspired by the Material Design system,
- Added set of predefined fonts,
- Improved the `Row` element - added spacing property similar to the one available in the `Stack` element,
- Slightly adjusted available API (insignificant breaking changes).

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

- RichText element (applying multiple styles to text content, text justification, better word-wrapping algorithm, page-break support etc.),
- Custom slots in components (named slots, dynamic slots),
- Documentation cleanup.

### Under consideration

There are also features being actively investigated with lower importance:

- Better debugging experience (e.g. when created layout generates an infinite document),
- Tutorials: adding maps / charts to the document,
- The library should return the generated document even if DocumentLayoutException is thrown (to better understand the issue),
- Allow the Placeholder element to show text instead of an icon,
- SVG support ([integration with SkiaSharp.Svg](https://www.nuget.org/packages/SkiaSharp.Svg/)),
- Generation optimization: measuring text operation takes the vast majority of processing time,
- Divider element (replacement for applying border in some scenarios),
- and more...
