# API Reference

## Visual elements

[Text](/api-reference/text) - supports drawing text of different styles.

[Image](/api-reference/image) - draws an image with a known or dynamic size.

[Background](/api-reference/background) - applies solid background color beneath its children.

[Border](/api-reference/border) - applies solid border around its children.

[Line](/api-reference/line) - draws vertical or horizontal line.

[Canvas](/api-reference/canvas) - allows to extend standard set of visual elements by giving access to low-level SkiaSharp API.

[Placeholder](/api-reference/placeholder) - draws simple placeholder image for prototyping purposes.


## Positional elements

[Width](/api-reference/width) - sets minimum and/or maximum width constraint to its children.

[Height](/api-reference/height) - sets minimum and/or maximum height constraint to its children.

[Alignment](/api-reference/alignment) - allows to specify exact position of its child, e.g. in the middle, or in the low-bottom corner.

[Padding](/api-reference/padding) - applies empty space around its children.

[Aspect Ratio](/api-reference/aspect-ratio) - reserves an area of provided aspect ratio.

[Extend](/api-reference/extend) - extends child size to fit entire content vertically and/or horizontally.

[Minimal box](/api-reference/minimal-box) - minimizes child size to the smallest possible, useful when the parent element provides more space than necessary.

[Translate](/api-reference/translate) - virtually moves the child horizontally and/or vertically in spaces.

[Rotate](/api-reference/rotate) - rotates its child.

[Scale](/api-reference/scale) - scales its child to make it bigger or smaller.

[Scale to fit](/api-reference/scale-to-fit) - scales its child to fit available space.

[Flip](/api-reference/flip) - rotates its child in 90 degrees increments.

[Unconstrained](/api-reference/unconstrained) - removes any size constraints, giving its child unlimited space.


## Content flow elements

[Page break](/api-reference/page-break) - forces all following content to be moves to the next page.

[Show if](/api-reference/show-if) - conditionally displays its children.

[Show once](/api-reference/show-once) - displays its children only once, on the first page of occurrence. The element is not visible on subsequent pages. 

[Skip once](/api-reference/skip-once) - hides its children on the first page of occurrence. The element is visible on all subsequent pages.

[Show entire](/api-reference/show-entire) - makes sure that the element is fully visible on a single page, without page breaking.

[Ensure space](/api-reference/ensure-space) - a less-strict version of the ShowEntire element. If the is not enough space to display entire element on a single page, it makes sure that the first page of occurrence has a minimal provided size. Used to visually optimize the layout.

[Stop paging](/api-reference/stop-paging) - displays its element on the first page only. If some part of the element does not fit, it is ignored.

## Layout elements


[Page](/api-reference/page) - allows to manage page settings, e.g. size, margin, color, watermark, etc. 

[Table](/api-reference/table) - arranges its children using table-layout algorithm. Supports row and column spanning.

[Column](/api-reference/column) - puts its children vertically, one under another.

[Row](/api-reference/row) - puts its children horizontally, one alongside another.

[Grid](/api-reference/grid) - arranges its children using grid-layout algorithm. Available space is divided into set of equally spaced columns. Its child can take any number of columns.

[Inlined](/api-reference/inlined) - draws its elements in a line, supports various element alignments.

[Decoration](/api-reference/decoration) - puts additional content before and/or after its children. That additional content is repeated on all pages.

[Layers](/api-reference/layers) - puts additional content underneath and/or above its children. The additional content is repeated on all pages. Useful when implementing watermarks. 

[List](/api-reference/lists) - draws its children as ordered or unordered list. 


## Other elements

[Section](/api-reference/section) - specifies a multi-page area spanning its children. Used to create internal document links and for showing custom page numbers.

[Section Link](/api-reference/section-link) - creates a link to provided section. Redirects the user to the first page of section occurrence.

[Hyperlink](/api-reference/hyperlink) - creates a link to external location, e.g. redirects the user to a webpage.

[Element](/api-reference/element) - allows you to break the Fluent API chain and inject dynamic content using lambda method.

[Default Text Style](/api-reference/default-text-style) - applies additional text styling for all text elements inside its hierarchy.

[Debug Area](/api-reference/debug-area) - draws a colorful box with a label around its children. Useful for designing purposes.

[Debug Pointer](/api-reference/debug-pointer) - marks its children with a special label. That label is useful to better understand document structure when the library throws layout-related exceptions. 

