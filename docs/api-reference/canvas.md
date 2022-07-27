# Canvas

This element allows drawing any custom content using the SkiaSharp canvas objects.

```csharp
.Canvas((canvas, size) =>
{
    using var paint = new SKPaint
    {
        Color = SKColors.Red,
        StrokeWidth = 10,
        IsStroke = true
    };

    // move origin to the center of the available space
    canvas.Translate(size.Width / 2, size.Height / 2);

    // draw a circle
    canvas.DrawCircle(0, 0, 50, paint);
});
```

![example](/api-reference/canvas.png =300x)

In the next example, we will analyze how to create a rounded rectangle using SkiaSharp and the `Canvas` element. It clearly shows how powerful is this approach:

```csharp
container
.Background(Colors.Grey.Lighten2)
.Padding(25)
.MinimalBox()
.Layers(layers =>
{
    layers.Layer().Canvas((canvas, size) =>
    {
        DrawRoundedRectangle(Colors.White, false);
        DrawRoundedRectangle(Colors.Blue.Darken2, true);

        void DrawRoundedRectangle(string color, bool isStroke)
        {
            using var paint = new SKPaint
            {
                Color = SKColor.Parse(color),
                IsStroke = isStroke,
                StrokeWidth = 2,
                IsAntialias = true
            };
        
            canvas.DrawRoundRect(0, 0, size.Width, size.Height, 20, 20, paint);
        }
    });
    
    layers
        .PrimaryLayer()
        .PaddingVertical(10)
        .PaddingHorizontal(20)
        .Text("Sample text")
        .FontSize(16).FontColor(Colors.Blue.Darken2).SemiBold();
});
```

![example](/api-reference/canvas-rounded-rectangle.png =175x)

::: tip
Did you know that the Canvas element can also be used to combine QuestPDF with other, SkiaSharp-based libraries? A great example of such situation is drawing vector-based charts. Please take a look [at this example](/examples/implementing-charts).
:::
