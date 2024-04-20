# SkiaSharp integration

This element is used to draw custom content with the SkiaSharp `SKCanvas` object.


## Integration layer

To integrate SkiaSharp with QuestPDF, please copy the following code to your project. It provides two approaches to drawing content with SkiaSharp:
1) `SkiaSharpCanvas` - draws content and integrates it with the SVG element. It is useful when you want to draw vector-based content.
2) `SkiaSharpRasterized` - draws content and integrates it with the Image element. It is useful when SkiaSharp cannot successfully convert the content to SVG.

```csharp
public static class SkiaSharpHelpers
{
    public static void SkiaSharpCanvas(this IContainer container, Action<SKCanvas, Size> drawOnCanvas)
    {
        container.Svg(size =>
        {
            using var stream = new MemoryStream();

            using (var canvas = SKSvgCanvas.Create(new SKRect(0, 0, size.Width, size.Height), stream))
                drawOnCanvas(canvas, size);
            
            var svgData = stream.ToArray();
            return Encoding.UTF8.GetString(svgData);
        });
    }
    
    public static void SkiaSharpRasterized(this IContainer container, Action<SKCanvas, Size> drawOnCanvas)
    {
        container.Image(payload =>
        {
            using var bitmap = new SKBitmap(payload.ImageSize.Width, payload.ImageSize.Height);

            using (var canvas = new SKCanvas(bitmap))
            {
                var scalingFactor = payload.Dpi / (float)DocumentSettings.DefaultRasterDpi;
                canvas.Scale(scalingFactor);
                drawOnCanvas(canvas, payload.AvailableSpace);
            }
        
            return bitmap.Encode(SKEncodedImageFormat.Png, 100).ToArray();
        });
    }
}
```


## Examples

```csharp
.SkiaSharpCanvas((canvas, size) =>
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

The following example shows how to create a rounded rectangle using SkiaSharp and the `Canvas` element. It clearly shows how powerful is this approach:

```csharp
container
.Background(Colors.Grey.Lighten2)
.Padding(25)
.MinimalBox()
.Layers(layers =>
{
    layers.Layer().SkiaSharpCanvas((canvas, size) =>
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
Did you know that the `Canvas` element can also be used to combine QuestPDF with other, SkiaSharp-based libraries? A great example of this is drawing vector-based charts. Please take a look [at this example](/examples/implementing-charts).
:::
