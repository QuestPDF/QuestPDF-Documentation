---
outline: false
---


# SkiaSharp Integration

QuestPDF supports multiple ways to integrate dynamic complex graphics into PDF documents. 

The preferred method is to generate an SVG image, as it ensures scalability and lightweight nature. 
However, in cases where this approach is not sufficient, you can use the SkiaSharp library to create custom graphics and effects.

::: info
This section provides examples of how to integrate the SkiaSharp library with QuestPDF.
This library is available under the "MIT" license.

We extend our thanks to the authors and maintainers of that project for their contributions to the open-source community.

- [SkiaSharp NuGet page](https://www.nuget.org/packages/SkiaSharp)
- [SkiaSharp GitHub page](https://github.com/mono/SkiaSharp)
:::

::: warning
Please note that the SkiaSharp library is not included in the QuestPDF package.
You need to install it separately via the NuGet package manager.
:::

::: tip
If you are planning to host your application on a Linux server, please install the following nuget package: [SkiaSharp.NativeAssets.Linux.NoDependencies](https://www.nuget.org/packages/SkiaSharp.NativeAssets.Linux.NoDependencies)
:::


## Helper Script

To simplify the integration of SkiaSharp with QuestPDF, you'll need to add a helper class to your project. 
This class provides two extension methods that bridge QuestPDF's container system with SkiaSharp's canvas-based drawing approach.

Copy the following code into your project to enable SkiaSharp integration:

```c#
using System.Text;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;
using SkiaSharp;

namespace QuestPDF.SkiaSharpIntegration;

public static class SkiaSharpHelpers
{
    public static void SkiaSharpSvgCanvas(this IContainer container, Action<SKCanvas, Size> drawOnCanvas)
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
    
    public static void SkiaSharpRasterizedCanvas(this IContainer container, Action<SKCanvas, ImageSize> drawOnCanvas)
    {
        container.Image(payload =>
        {
            using var bitmap = new SKBitmap(payload.ImageSize.Width, payload.ImageSize.Height);

            using (var canvas = new SKCanvas(bitmap))
            {
                canvas.Scale(payload.ImageSize.Width / payload.AvailableSpace.Width, payload.ImageSize.Height / payload.AvailableSpace.Height);
                drawOnCanvas(canvas, new ImageSize((int)payload.AvailableSpace.Width, (int)payload.AvailableSpace.Height));
            }
        
            return bitmap.Encode(SKEncodedImageFormat.Png, 100).ToArray();
        });
    }
}
```

## SVG

**The SkiaSharpSvgCanvas method** allows you to use SkiaSharp's drawing capabilities while maintaining the benefits of vector graphics. 
This approach is ideal for most custom graphics as it preserves sharp edges and details at any scale and keeps document file sizes smaller compared to rasterized images.

The following example demonstrates how to create a vector-based clock graphic using SkiaSharp.

```c#{11}
Document.Create(document =>
{
    document.Page(page =>
    {
        page.Size(350, 350);
        page.Margin(25);

        page.Content()
            .Width(300)
            .Height(300)
            .SkiaSharpSvgCanvas((canvas, size) =>
            {
                var centerX = size.Width / 2;
                var centerY = size.Height / 2;
                var radius = Math.Min(centerX, centerY);

                // draw clock face
                using var facePaint = new SKPaint
                {
                    Color = new SKColor(Colors.Blue.Lighten4)
                };

                canvas.DrawCircle(centerX, centerY, radius, facePaint);

                // draw clock ticks
                using var tickPaint = new SKPaint
                {
                    Color = new SKColor(Colors.Blue.Darken4), 
                    StrokeWidth = 4, 
                    StrokeCap = SKStrokeCap.Round
                };

                canvas.Save();
                canvas.Translate(centerX, centerY);

                foreach (var i in Enumerable.Range(0, 12))
                {
                    canvas.DrawLine(new SKPoint(0, radius * 0.85f), new SKPoint(0, radius * 0.95f), tickPaint);
                    canvas.RotateDegrees(30);
                }

                canvas.Restore();

                // draw clock hands
                using var hourHandPaint = new SKPaint
                {
                    Color = new SKColor(Colors.Blue.Darken4),
                    StrokeWidth = 8,
                    StrokeCap = SKStrokeCap.Round
                };

                using var minuteHandPaint = new SKPaint
                {
                    Color = new SKColor(Colors.Blue.Darken2),
                    StrokeWidth = 4,
                    StrokeCap = SKStrokeCap.Round
                };

                canvas.Translate(centerX, centerY);

                canvas.Save();
                canvas.RotateDegrees(6 * DateTime.Now.Minute);
                canvas.DrawLine(new SKPoint(0, 0), new SKPoint(0, -radius * 0.7f), minuteHandPaint);
                canvas.Restore();
                
                canvas.Save();
                canvas.RotateDegrees(30 * DateTime.Now.Hour + DateTime.Now.Minute / 2);
                canvas.DrawLine(new SKPoint(0, 0), new SKPoint(0, -radius * 0.5f), hourHandPaint);
                canvas.Restore();
            });
    });
})
.GeneratePdf("clock.pdf");
```

![example](/api-reference/skiasharp-integration-svg.webp =350x)


## Rasterization

While vector graphics are preferred for most cases, some visual effects and complex operations in SkiaSharp can only be properly rendered through rasterization. 
**The SkiaSharpRasterizedCanvas method** allows you to use the full range of SkiaSharp's capabilities when you need effects that aren't supported by SVG.

The following example demonstrates how to draw an image with rounded corners and apply a drop shadow effect.

```c#{9}
Document.Create(document =>
{
    document.Page(page =>
    {
        page.Size(new PageSize(500, 400));
        page.DefaultTextStyle(x => x.FontSize(20));

        page.Content()
            .Padding(25)
            .SkiaSharpRasterizedCanvas((canvas, size) =>
            {
                // add padding to properly display the shadow effect
                const float padding = 25;
                canvas.Translate(padding, padding);
                
                // load image and scale canvas space
                using var bitmap = SKBitmap.Decode("Resources/landscape.jpg");
                
                var targetBitmapSize = new SKSize(size.Width - 2 * padding, size.Height - 2 * padding);
                var scale = Math.Min(targetBitmapSize.Width / bitmap.Width, targetBitmapSize.Height / bitmap.Height);
                canvas.Scale(scale);

                var drawingArea = new SKRoundRect(new SKRect(0, 0, bitmap.Width, bitmap.Height), 32, 32);
                
                // draw drop shadow
                using var dropShadowFilter = SKImageFilter.CreateDropShadow(8, 8, 16, 16, SKColors.Black);
                using var paint = new SKPaint
                {
                    ImageFilter = dropShadowFilter
                };

                canvas.DrawRoundRect(drawingArea, paint);
                
                // draw image
                canvas.ClipRoundRect(drawingArea, antialias: true);
                canvas.DrawBitmap(bitmap, SKPoint.Empty);
            });
    });
})
.GeneratePdf("rasterized-effect.pdf");
```

![example](/api-reference/skiasharp-integration-rasterized.webp =500x)
