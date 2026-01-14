# Border

You can use borders to create visual separation between elements in your document. 
Borders can be applied to any element, including text, images, and containers.

```c#{2}
container
    .Border(3, Colors.Blue.Darken4)
    .Background(Colors.Blue.Lighten5)
    .Padding(25) 
    .Text(text =>
    {
        text.DefaultTextStyle(x => x.FontColor(Colors.Blue.Darken4).FontSize(16));
        text.Span("TIP: ").Bold();
        text.Span("You can use borders to create visual separation between elements in your document. Borders can be applied to any element, including text, images, and containers.");
    });
```

![example](/api-reference/border-simple.webp)


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

Each method requires a thickness value as a parameter. Optionally, you can specify the unit value (default is `Unit.Points`).

```c#
container.Border(1);
container.Border(1, Unit.Millimeters);
```

<!--@include: tip-unit.md-->


### Consistent thickness

```c#{6,12,18}
.Row(row =>
{
    row.Spacing(25);
    
    row.RelativeItem()
        .Border(1, Colors.Black)
        .Padding(10)
        .AlignCenter()
        .Text("Thin");
    
    row.RelativeItem()
        .Border(3, Colors.Black)
        .Padding(10)
        .AlignCenter()
        .Text("Medium");
    
    row.RelativeItem()
        .Border(9, Colors.Black)
        .Padding(10)
        .AlignCenter()
        .Text("Bold");
});
```

![example](/api-reference/border-thickness-consistent.webp)


### Various thickness

```c#{2-5}
container
    .BorderLeft(4)
    .BorderTop(6)
    .BorderRight(8) 
    .BorderBottom(10)
    .Padding(25)
    .Text("Sample text");
```

![example](/api-reference/border-thickness-various.webp)


## Solid Color

In the vast majority of cases, borders are applied with a solid color.

<!--@include: tip-color.md-->

```c#{16}
.Row(row =>
{
    var colors = new[]
    {
        Colors.Red.Medium,
        Colors.Green.Medium,
        Colors.Blue.Medium
    };
    
    row.Spacing(25);
    
    foreach (var color in colors)
    {
        row.RelativeItem()
            .Border(5)
            .BorderColor(color)
            .Padding(15)
            .Text(color)
            .FontColor(color);
    }
});
```

![example](/api-reference/border-color-solid.webp)


## Gradient

Applies a linear gradient background to the border with the specified angle and colors.

The first argument is the angle in degrees, and the second argument is an array of colors that define the gradient.

```c#{7,14,21}
.Column(column =>
{
    column.Spacing(25);
    
    column.Item()
        .Border(5)
        .BorderLinearGradient(0, [Colors.Red.Darken1, Colors.Blue.Darken1])
        .BorderAlignmentInside()
        .Padding(25)
        .Text("Horizontal gradient");
    
    column.Item()
        .Border(10)
        .BorderLinearGradient(45, [Colors.Green.Darken1, Colors.LightGreen.Darken1, Colors.Yellow.Darken1])
        .BorderAlignmentInside()
        .Padding(25)
        .Text("Diagonal gradient");
    
    column.Item()
        .Border(10)
        .BorderLinearGradient(90, [Colors.Yellow.Darken1, Colors.Amber.Darken1, Colors.Orange.Darken1])
        .CornerRadius(20)
        .Padding(25)
        .Text("Vertical gradient");
});
```

![example](/api-reference/border-color-gradient.webp)


## Alignment

You can control the alignment of the border relative to the container's boundaries using the following methods:

| Method                     | Description                                                            |
|----------------------------|------------------------------------------------------------------------|
| **BorderAlignmentOutside** | Aligns the container's border to the outer edge of the element.        |
| **BorderAlignmentMiddle**  | Aligns the border in the middle of the specified container boundaries. |
| **BorderAlignmentInside**  | Aligns the border to the inside of the container.                      |

By default, the border is aligned to the middle of the container boundaries.

However, if the border has rounded corners, the alignment is set to inside by default.

```c#{12,18,24}
.Row(row =>
{
    row.Spacing(25);
    
    row.RelativeItem()
        .Background(Colors.Grey.Lighten1)
        .Padding(25)
        .Text("No Border");
    
    row.RelativeItem()
        .Border(10, Colors.Grey.Darken2)
        .BorderAlignmentInside()
        .Padding(25)
        .Text("Border Inside");
    
    row.RelativeItem()
        .Border(10, Colors.Grey.Darken2)
        .BorderAlignmentMiddle()
        .Padding(25)
        .Text("Border Middle");
    
    row.RelativeItem()
        .Border(10, Colors.Grey.Darken2)
        .BorderAlignmentOutside()
        .Padding(25)
        .Text("Border Outside");
});
```

![example](/api-reference/border-alignment.webp)


## Examples

### Rounded corners

Borders support rounded corners, which can be applied using the `CornerRadius` method.

::: tip
Read more about [rounded corners](/api-reference/rounded-corners.md).
:::

```c#{2-3}
container
    .CornerRadius(10)
    .Border(1, Colors.Black)
    .Background(Colors.Grey.Lighten2)
    .Padding(25)
    .Text("Border with rounded corners"); 
```

![example](/api-reference/border-rounded-corners-1.webp)


### Multiple borders

It is possible to apply multiple borders to the same content by separating each border instance with the `Container` method.

```c#{6}
container
    .BorderVertical(5)
    .BorderColor(Colors.Green.Darken2)
    .BorderAlignmentInside()

    .Container()

    .BorderHorizontal( 10)
    .BorderColor(Colors.Blue.Lighten1)
    .BorderAlignmentInside()
    
    .Background(Colors.Grey.Lighten2)
    .PaddingVertical(25)
    .PaddingHorizontal(50)
    .Text("Content");
```

![example](/api-reference/border-multiple.webp)


### Advanced style

You can create advanced styles by combining borders with other properties, such as background color, padding, and text styles.

```c#{2-5}
container
    .CornerRadius(10)
    .BorderLeft(10)
    .BorderAlignmentInside()
    .BorderColor(Colors.Green.Darken2)
    .Background(Colors.Green.Lighten4)
    .Padding(25)
    .PaddingLeft(10)
    .DefaultTextStyle(x => x.FontColor(Colors.Green.Darken4))
    .Column(column =>
    {
        column.Item().Text("Completed").Bold();
        column.Item().Height(5);
        column.Item().Text("The invoice has been paid in full.").FontSize(16);
    });
```

![example](/api-reference/border-rounded-corners-2.webp)