# Line

The Line component allows you to render simple yet customizable vertical and horizontal lines within your layout. 

These lines can serve as visual dividers, helping to structure and improve the readability of your content. 
You can specify the thickness of the line and optionally customize its color.

## Vertical

Renders a vertical line with a specified thickness.

```c#{8-9}
container
    .Row(row =>
    {
        row.AutoItem().Text("Text on the left");
        
        row.AutoItem()
            .PaddingHorizontal(15)
            .LineVertical(3)
            .LineColor(Colors.Blue.Medium); // optional
        
        row.AutoItem().Text("Text on the right");
    });
```

![example](/api-reference/line-vertical.webp =360x)


## Horizontal

Renders a horizontal line with a specified thickness.

```c#{8-9}
container
    .Column(column =>
    {
        column.Item().Text("Text above the line");
        
        column.Item()
            .PaddingVertical(10)
            .LineHorizontal(2)
            .LineColor(Colors.Blue.Medium); // optional
        
        column.Item().Text("Text below the line");
    });
```

![example](/api-reference/line-horizontal.webp =215x)


## Thickness

It is possible to modify how pronounced the line appears by adjusting its thickness.

```c#{10}
container
    .Column(column =>
    {
        column.Spacing(20);

        foreach (var thickness in new[] { 1, 2, 4, 8 })
        {
            column.Item()
                .Width(200)
                .LineHorizontal(thickness);
        }
    });
```

![example](/api-reference/line-thickness.webp =250x)


## Solid Color

Specifies the color for the line.

```c#{18}
container
    .Column(column =>
    {
        var colors = new[]
        {
            Colors.Red.Medium,
            Colors.Green.Medium,
            Colors.Blue.Medium,
        };
        
        column.Spacing(20);

        foreach (var color in colors)
        {
            column.Item()
                .Width(200)
                .LineHorizontal(5)
                .LineColor(color);
        }
    });
```

![example](/api-reference/line-color-solid.webp =250x)


## Gradient

Applies a linear gradient to a line using the specified colors.

```c#{9,14,19}
container
    .Column(column =>
    {
        column.Spacing(20);

        column.Item()
            .Width(200)
            .LineHorizontal(5)
            .LineGradient([Colors.Red.Medium, Colors.Orange.Medium]);

        column.Item()
            .Width(200)
            .LineHorizontal(5)
            .LineGradient([Colors.Orange.Medium, Colors.Yellow.Medium, Colors.Lime.Medium]);

        column.Item()
            .Width(200)
            .LineHorizontal(5)
            .LineGradient([Colors.Blue.Lighten2, Colors.LightBlue.Lighten1, Colors.Cyan.Medium, Colors.Teal.Darken1, Colors.Green.Darken2]);
    });
```

![example](/api-reference/line-color-gradient.webp =250x)


## Dash Pattern

Configures a dashed pattern for the line.

For example, a pattern of `[2, 3]` creates a dash of 2 units followed by a gap of 3 units.

::: warning
The length of the pattern array must be even.
:::

```c#{9,14,19}
container
    .Column(column =>
    {
        column.Spacing(20);

        column.Item()
            .Width(200)
            .LineHorizontal(5)
            .LineDashPattern([4f, 4f]);

        column.Item()
            .Width(200)
            .LineHorizontal(5)
            .LineDashPattern([12f, 12f]);

        column.Item()
            .Width(200)
            .LineHorizontal(5)
            .LineDashPattern([4f, 4f, 12f, 4f]);
    });
```

![example](/api-reference/line-dash-pattern.webp =250x)


## Complex Example

It is possible to combine multiple options to create a more complex line style.

```c#
container
    .Width(300)
    .LineHorizontal(8)
    .LineDashPattern([4, 4, 8, 8, 12, 12])
    .LineGradient([Colors.Red.Medium, Colors.Orange.Medium, Colors.Yellow.Medium]);
```

![example](/api-reference/line-example.webp =350x)