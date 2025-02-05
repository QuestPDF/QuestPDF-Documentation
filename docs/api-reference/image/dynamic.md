# Dynamic Images

QuestPDF provides flexible layouts, which means the optimal image resolution cannot always be determined in advance. 
To ensure the best clarity, especially when generating maps or charts, it's important to produce images at a specific resolution (or a multiple of that resolution for retina displays).

This dynamic image element behaves similarly to static images. 
However, instead of accepting a preloaded image, it expects a function that receives the available space and returns the image as a binary array.

```c#{15,19}
container
    .Column(column =>
    {
        column.Spacing(10);

        column.Item().Text(text =>
        {
            text.Span("The national flag of Poland").Bold();
            text.Span(" consists of two horizontal stripes of equal width, the upper one white and the lower one red.");
        });
        
        column.Item()
            .AspectRatio(80 / 50f)
            .Border(2)
            .Image(GenerateNationalFlagOfPoland);
    });

// using SkiaSharp for custom image generation
byte[]? GenerateNationalFlagOfPoland(GenerateDynamicImageDelegatePayload context)
{
    using var whitePaint = new SKPaint
    {
        Color = SKColors.White,
    };
                
    using var redPaint = new SKPaint
    {
        Color = SKColor.Parse("#BB0A30"),
    };

    using var bitmap = new SKBitmap(context.ImageSize.Width, context.ImageSize.Height);
    using var canvas = new SKCanvas(bitmap);
                
    canvas.DrawRect(0, 0, context.ImageSize.Width, context.ImageSize.Height / 2, whitePaint);
    canvas.DrawRect(0, context.ImageSize.Height / 2, context.ImageSize.Width, context.ImageSize.Height, redPaint);
    canvas.Flush();

    using var content = bitmap.Encode(SKEncodedImageFormat.Png, 100);
    return content.ToArray();
}
```

![example](/api-reference/image-dynamic.webp =350x)
