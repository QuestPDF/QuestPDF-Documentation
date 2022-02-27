---
title: "Releases"
---

## Release notes

### 2022.03

- Added minimal API to help you quickly start with QuestPDF development and speed up prototyping,
- Improved exception message when desired font type cannot be found (instead of loading default font on Windows and failing with wrong characters on Linux),
- Improved support for custom font types: loading all type faces from a file, respecting true font family, using CSS-like algorithm to find best style match,
- Renaming: the `ExternalLink` element was renamed to the `Hyperlink` element,
- Renaming: the `Location` element was renamed to the `Section` element,
- Renaming: the `InternalLink` element was renamed to the `SectionLink` element,
- Added support for custom page number formats in the `Text` element, e.g. you can implement roman literal style if required,
- Extended support for the `Section` element (previously the `Location` element) by tracking: beginning page number, end page number, page length, page number within location,
- Updated homepage and GitHub pages content.

### 2022.02

- Added a `ScaleToFit` element - scales its child down so it fits in the provided space,
- Added a `StopPaging` element - when its child requires more than one page to fully render, only the first page is shown,
- Added a 'LineVertical' and a 'LineHorizontal' elements - those will simplify your code a lot, there is no need to use the `Border` element anymore!
- Renaming: the `Stack` element was renamed to the `Column` element,
- Renaming: children of the `Row` element are now called `items` instead of `columns`, e.g. `RelativeItem` instead of `RelativeColumn`,
- Added support of the `AutoItem` to the `Row` element - those items take as little width as possible,
- Extended Fluent API to support unit types, e.g. inches, centimeters, etc.
- Improved default Fluent configuration behavior for elements: Scale, Padding, Translate,
- Improved integration support with the HttpContext.Response.Body. This improvement was introduced by schulz3000, thank you!

### 2022.01
Introduced new element: `Table` - a great way to construct complex document structures, e.g. reports. This element covers all cases offered by combination of the `Stack` and the `Row` elements. Additionally, it provides support for more complex layouts and corner cases. Updating to the `Table` element can greatly simplify your code 😁

Other changes:
- Added new element `DefaultTextStyle` - it allows set new text style to all its children,
- Improved the default paging behavior for the `Row` element. In some minor corner cases it might cause infinite layout exceptions and confuse developers. This improvement was suggested by **SvizelPritula**, thank you!
- Improved the `Row` element: added new type of column that combines constant and relative widths. This improvement was proposed by **qcz**, thank you!
- Fixed default page sizes for: Letter and Legal. This improvement was introduced by **markhewett**, thank you!
- Documentation: added article on how to run QuestPDF on in Blazor Webassembly. This article was written by **pablopioli**, thank you!
- Other library / documentation improvements.

### 2021.12

- Improved debugging experience for layout-related exceptions. To make the library predictable, it is (by design) very strict about layouting rules and throws an exception when a constraint cannot be met. In this release, each exception contains an element stack that contains all information needed to identify the issue. By default, this feature is enabled only when debugger is attached.
- Improved layouting algorithm performance by introducing additional caching layer. This cache reduces the layouting time by half. By default, this feature is enabled only when debugger is not attached (mostly release mode).
- Reduced GA pressure put by the layouting algorithm. Previously, every element measurement operation was represented by an object and the paging support was done via class hierarchy. New solution uses structs (which are value-types) and enums. This also makes the code more readable and easier to follow.
- Added support for generating XPS files which are easier to print in the Windows environment. This was possible due to existing support in SkiaSharp. This change was proposed by **sbrkich**, thank you!
- Documentation: added article about adding charts to QuestPDF documents. This article was written by **donmurta**, thank you!
### 2021.11

- Added new `Inlined` element - put block elements along a line with line-breaking and page-breaking support. This element also supports various element placement in the horizontal axis as well as the baseline. It will help me in the future development, especially with text rendering optimization,
- Introduced a new `SkipOnce` element - it can be used to hide content on the first occurrence of the parent. Useful in conjunction with the `ShowOnce` element. This change was proposed by **jcl86**, thank you!
- Improved debugging experience by providing more detailed message when the `DocumentLayoutException` is thrown. This improvement is based on the discussion started by **preiius**, thank you! 
- Now it is possible to specify global, document-specific text style. This improves text style management and simplifies the typography pattern. This feature was proposed by **JonnyBooker**, thank you!
- Added two overloads to the Image element. Now, you can provide an image as a filePath or a Stream. This improvement was suggested by **pha3z**. Thank you!
- Improved text rendering performance.
- Improved documentation examples for the `ShowOnce` and the `EnsureSpace` elements.
- Improved text element: it does not throw an exception when an argument is null.
- All new releases of QuestPDF will contain symbol packages. Let's welcome simplified debugging experience 🎉

### 2021.10

This update is focused on text rendering capabilities:
- text paging support,
- text background,
- text stroke,
- text underline,
- changing text style within a run (e.g. size, font type, color),
- inserting links in text,
- inserting custom components in text, e.g. an image,
- inserting page numbers in text (current page, total pages, page of location),
- layouting engine uses now more font-related metadata when rendering text (e.g. ascent, descent properties),
- increased rendering performance by introducing short-living cache.

**Breaking change:** 

1) The old way of injecting page numbers was working correct, however was far from being ideal. I decided to change the API so to make everything more obvious and safe. The old slots approach has been removed and replaced by proper API invocations. Please find more details in the API Reference section.

```csharp
.Text(x =>
{
    x.CurrentPageNumber();
    x.Span(" / ");
    x.TotalPages();
});
```

2) Please notice that the text element supports paging now. That means, if there is not enough space, the text may be divided into separate sections on various pages. If this behaviour is not desired, you can use the `ShowEntire` element like so:

```csharp
.ShowEntire()
.Text("Long text here.");
```

Additionally, the test coverage has been highly increased. No new bugs have been found :)

### 2021.09

- Added support for registering custom fonts. This way, the application can ship its own set of fonts that are independent of the hosting environment. Please refer to the `Patterns and practices` section for more details,
- Fixed rendering documents with pages of dynamic size, including continuous pages,
- Improved messages in exceptions regarding composing layouts using the Fluent API,
- fixed detecting infinite layout exception in certain cases.

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

**Breaking changes:**

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
- Dynamic component (allows generating dynamic content based on the context, e.g. page number, available space, etc.),
- Font shaping (correctly measuring and drawing text) for more complex languages, e.g. Arabic,
- RTL support for content (placing content in the right-to-left orientation) and text,
- Investigation on how to simplify unit tests and make them easier to manage.

### Under consideration

There are also features being actively investigated with lower importance:
- Font subsetting to reduce output file size,
- Font fallback (using alternative fonts when glyphs are not available),
- Text justification,
- Documentation cleanup,
- Documentation improvements,
- Custom slots in components (named slots, dynamic slots),
- Tutorials: adding maps to the document,
- Allow the Placeholder element to show text instead of an icon,
- SVG support ([integration with SkiaSharp.Svg](https://www.nuget.org/packages/SkiaSharp.Svg/)),
- and more...
