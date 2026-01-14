# Shadow

Shadows can enhance the visual depth and separation of elements in a document.

```c#{3-10}
container
    .Border(1, Colors.Black)
    .Shadow(new BoxShadowStyle
    {
        Color = Colors.Grey.Medium, 
        Blur = 5, 
        Spread = 5,
        OffsetX = 5, 
        OffsetY = 5
    })
    .Background(Colors.White)
    .Padding(15)
    .Text("Important content");
```

![example](/api-reference/shadow-simple.webp)


## Blur

Gets or sets the blur radius of the shadow in pixels.
Higher values produce a more diffused shadow with softer edges.

A value of 0 results in a sharp, unblurred shadow.

::: tip
Values different from 0 may significantly impact performance and enlarge the output file size.
Use with caution, especially in large documents or when rendering complex shadows.
:::

```c#{12}
.Row(row =>
{
    row.Spacing(50);

    foreach (var blur in new[] { 5, 10, 20 })
    {
        row.ConstantItem(100)
            .AspectRatio(1)
            .Shadow(new BoxShadowStyle
            {
                Color = Colors.Grey.Darken1,
                Blur = blur
            })
            .Background(Colors.White);
    }
});
```

![example](/api-reference/shadow-blur.webp)


## Spread

Gets or sets the spread radius of the shadow in pixels.

Positive values cause the shadow to expand, negative values cause it to contract.

```c#{13}
.Row(row =>
{
    row.Spacing(50);

    foreach (var spread in new[] { 0, 5, 10 })
    {
        row.ConstantItem(100)
            .AspectRatio(1)
            .Shadow(new BoxShadowStyle
            {
                Color = Colors.Grey.Darken1,
                Blur = 5,
                Spread = spread
            })
            .Background(Colors.White);
    }
});
```

![example](/api-reference/shadow-spread.webp)


## Offset X

Gets or sets the horizontal offset of the shadow in pixels.

Positive values move the shadow to the right, negative values move it to the left.

```c#{13}
.Row(row =>
{
    row.Spacing(50);
    
    foreach (var offsetX in new[] { -10, 0, 10 })
    {
        row.ConstantItem(100)
            .AspectRatio(1)
            .Shadow(new BoxShadowStyle
            {
                Color = Colors.Grey.Darken1,
                Blur = 10,
                OffsetX = offsetX
            })
            .Background(Colors.White);
    }
});
```

![example](/api-reference/shadow-offset-x.webp)


## Offset Y

Gets or sets the vertical offset of the shadow in pixels.

Positive values move the shadow downward, negative values move it upward.

```c#{13}
.Row(row =>
{
    row.Spacing(50);
    
    foreach (var offsetY in new[] { -10, 0, 10 })
    {
        row.ConstantItem(100)
            .AspectRatio(1)
            .Shadow(new BoxShadowStyle
            {
                Color = Colors.Grey.Darken2,
                Blur = 10,
                OffsetY = offsetY
            })
            .Background(Colors.White);
    }
});
```

![example](/api-reference/shadow-offset-y.webp)


## Color

Gets or sets the color of the shadow.

```c#{18}
.Row(row =>
{
    row.Spacing(50);
    
    var colors = new[]
    {
        Colors.Red.Darken2,
        Colors.Green.Darken2,
        Colors.Blue.Darken2
    };
    
    foreach (var color in colors)
    {
        row.ConstantItem(100)
            .AspectRatio(1)
            .Shadow(new BoxShadowStyle
            {
                Color = color,
                Blur = 10
            })
            .Background(Colors.White);
    }
});
```

![example](/api-reference/shadow-color.webp)


## Without Blur (Fast)

Shadows can be applied without any blur effect for a sharper appearance.

This approach is faster and results in significantly smaller file sizes, making it suitable for performance-sensitive applications.

```c#{10,22}
.Row(row =>
{
    row.Spacing(50);

    row.ConstantItem(100)
        .AspectRatio(1)
        .Shadow(new BoxShadowStyle
        {
            Color = Colors.Grey.Lighten1,
            Blur = 0, 
            OffsetX = 8,
            OffsetY = 8
        })
        .Border(1, Colors.Black)
        .Background(Colors.White);
    
    row.ConstantItem(100)
        .AspectRatio(1)
        .Shadow(new BoxShadowStyle
        {
            Color = Colors.Grey.Lighten1,
            Blur = 0,
            OffsetX = 8,
            OffsetY = 8
        })
        .Border(1, Colors.Black)
        .CornerRadius(16)
        .Background(Colors.White);
});
```

![example](/api-reference/shadow-no-blur.webp)