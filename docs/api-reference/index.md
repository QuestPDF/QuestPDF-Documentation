# API Reference

## Visual elements

[Text](/api-reference/text) - supports drawing text of different styles.

[Image](/api-reference/image) - draws an image with a known or dynamic size.

[Background](/api-reference/background) - applies solid background color beneath its children.

[Border](/api-reference/border) - applies solid border around its children.

[Line](/api-reference/line) - draws vertical or horizontal line.

[Placeholder](/api-reference/placeholder) - draws a simple placeholder image for prototyping purposes.


## Positional elements

[Width](/api-reference/width) - applies minimum and/or maximum width constraints to its children.

[Height](/api-reference/height) - applies minimum and/or maximum height constraints to its children.

[Alignment](/api-reference/alignment) - allows you to specify the exact position of its child, e.g. in the middle, or in the bottom left corner.

[Padding](/api-reference/padding) - applies empty space around its children.

[Aspect Ratio](/api-reference/aspect-ratio) - reserves an area with a specified aspect ratio.

[Extend](/api-reference/extend) - extends child size to fit the entire content vertically and/or horizontally.

[Minimal box](/api-reference/minimal-box) - minimizes child size to the smallest possible. Useful when the parent element provides more space than is necessary.

[Translate](/api-reference/translate) - virtually moves the child horizontally and/or vertically in spaces.

[Rotate](/api-reference/rotate) - rotates its child.

[Scale](/api-reference/scale) - scales its child to make it bigger or smaller.

[Scale to fit](/api-reference/scale-to-fit) - scales its child to fit available space.

[Flip](/api-reference/flip) - rotates its child in 90 degree increments.

[Unconstrained](/api-reference/unconstrained) - removes any size constraints, giving its child unlimited space.


## Content flow elements

[Page break](/api-reference/page-break) - forces all subsequent content to be moved to the next page.

[Show if](/api-reference/show-if) - conditionally displays its children.

[Show once](/api-reference/show-once) - displays its children only once, on the first page of the occurrence. The element is not visible on subsequent pages. 

[Skip once](/api-reference/skip-once) - hides its children on the first page of the occurrence. The element is visible on all subsequent pages.

[Show entire](/api-reference/show-entire) - makes sure that the element is fully visible on a single page, without page breaking.

[Ensure space](/api-reference/ensure-space) - a less strict version of the `ShowEntire` element. If there is not enough space to display the entire element on a single page, it makes sure that the first page of the occurrence has at least the minimum specified size available. Used to visually optimize the layout.

[Stop paging](/api-reference/stop-paging) - displays its element on the first page only. If some part of the element does not fit, it is ignored.

## Layout elements


[Page](/api-reference/page) - allows you to manage page settings, e.g. size, margin, color, watermark, etc. 

[Table](/api-reference/table/basics) - arranges its children using a table-layout algorithm. Supports row and column spanning.

[Column](/api-reference/column) - places its children vertically, one under another.

[Row](/api-reference/row) - places its children horizontally, one alongside another.

[Inlined](/api-reference/inlined) - draws its elements in a line. Supports various element alignments.

[Decoration](/api-reference/decoration) - places additional content before and/or after its children. The additional content is repeated on all pages.

[Layers](/api-reference/layers) - places additional content underneath and/or above its children. The additional content is repeated on all pages. Useful when implementing watermarks. 

[List](/api-reference/lists) - draws its children as an ordered or unordered list. 


## Other elements

[Section](/api-reference/section) - specifies a multi-page area spanning its children. Used to create internal document links and for showing custom page numbers.

[Hyperlink](/api-reference/hyperlink) - creates a link to an external location, e.g. redirects the user to a webpage.

[Element](/api-reference/element) - allows you to break the Fluent API chain and inject dynamic content using a lambda expression.

[Default Text Style](/api-reference/default-text-style) - applies additional text styling for all text elements inside its hierarchy.

[Debug Area](/api-reference/debug-area) - draws a colorful box with a label around its children. Useful for designing purposes.

[Debug Pointer](/api-reference/debug-pointer) - marks its children with a special label. That label is useful to better understand document structure when the library throws layout-related exceptions. 