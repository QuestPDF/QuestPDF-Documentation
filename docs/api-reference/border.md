# Border

You can use borders to create visual separation between elements in your document. 
Borders can be applied to any element, including text, images, and containers.

<<< @/snippets/border/simple.cs{2 csharp}

![A dark blue border surrounds the padded light blue box, and the wrapped tip text stays inside it.](/api-reference/border-simple.webp){.example}


## Thickness

| Method               | Description                                                |
|----------------------|------------------------------------------------------------|
| **Border**           | Sets a uniform border (all edges) for its content.         |
| **BorderVertical**   | Sets a vertical border (left and right) for its content.   |
| **BorderHorizontal** | Sets a horizontal border (top and bottom) for its content. |
| **BorderLeft**       | Sets a border on the left side of its content.             |
| **BorderRight**      | Sets a border on the right side of its content.            |
| **BorderTop**        | Sets a border on the top side of its content.              |
| **BorderBottom**     | Sets a border on the bottom side of its content.           |

Each method requires a thickness value as a parameter. Optionally, you can specify the unit value (default is `Unit.Point`).

```csharp
container.Border(1);
container.Border(1, Unit.Millimetre);
```

<!--@include: tip-unit.md-->


### Consistent thickness

<<< @/snippets/border/thickness-consistent.cs{6,12,18 csharp}

![Three boxes with 1, 3 and 9 point borders: the thicker the border, the more it grows outward as well as inward, so the "Bold" box looks larger than the "Thin" one.](/api-reference/border-thickness-consistent.webp){.example}


### Various thickness

<<< @/snippets/border/thickness-various.cs{2-5 csharp}

![Each side has its own thickness: the left edge is the thinnest and the bottom edge the thickest.](/api-reference/border-thickness-various.webp){.example}


## Solid Color

In the vast majority of cases, borders are applied with a solid color.

<!--@include: tip-color.md-->

<<< @/snippets/border/color-solid.cs{16 csharp}

![Three boxes with red, green and blue borders; each shows its colour as a hex code (#F44336, #4CAF50, #2196F3) in the same colour.](/api-reference/border-color-solid.webp){.example}


## Gradient

Applies a linear gradient background to the border with the specified angle and colors.

The first argument is the angle in degrees, and the second argument is an array of colors that define the gradient.

<<< @/snippets/border/color-gradient.cs{7,14,21 csharp}

![Three gradient borders: 0° runs from red on the left to blue on the right, 45° from green at the top-left to yellow at the bottom-right, and 90° from yellow at the top to orange at the bottom, following the rounded corners.](/api-reference/border-color-gradient.webp){.example}


## Alignment

You can control the alignment of the border relative to the container's boundaries using the following methods:

| Method                     | Description                                                            |
|----------------------------|------------------------------------------------------------------------|
| **BorderAlignmentOutside** | Aligns the container's border to the outer edge of the element.        |
| **BorderAlignmentMiddle**  | Aligns the border in the middle of the specified container boundaries. |
| **BorderAlignmentInside**  | Aligns the border to the inside of the container.                      |

By default, the border is aligned to the middle of the container boundaries.

However, if the border has rounded corners, the alignment is set to inside by default.

<<< @/snippets/border/alignment.cs{12,18,24 csharp}

![Four boxes with the same content: "Border Inside" keeps the size of the box without a border, "Border Middle" is larger because the border straddles the edge, and "Border Outside" is the largest because the whole border lies outside it.](/api-reference/border-alignment.webp){.example}


## Examples

### Rounded corners

Borders support rounded corners, which can be applied using the `CornerRadius` method.

::: tip
Read more about [rounded corners](/api-reference/rounded-corners.md).
:::

<<< @/snippets/border/rounded-corners.cs{2-3 csharp}

![A thin black border follows the rounded corners of the grey box.](/api-reference/border-rounded-corners-1.webp){.example}


### Multiple borders

It is possible to apply multiple borders to the same content by separating each border instance with the `Container` method.

<<< @/snippets/border/multiple.cs{8 csharp}

![Two borders on one box: green bars on the left and right run the full height, and the blue bars on the top and bottom sit between them, inside the first border.](/api-reference/border-multiple.webp){.example}


### Advanced style

You can create advanced styles by combining borders with other properties, such as background color, padding, and text styles.

<<< @/snippets/border/advanced-style.cs{2-5 csharp}

![A status card: a thick green bar on the left edge, rounded together with the light green box, next to the bold title "Completed" and the line "The invoice has been paid in full."](/api-reference/border-rounded-corners-2.webp){.example}