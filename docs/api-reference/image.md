# Images

## Static images

- This element can be used for placing images inside the document.
- By default, `Image` preserves the image's aspect ratio.
- The image is loaded into a SkiaSharp.Image object. Note that all limitations are derived. For example, available image formats may differ by platform.
- You can use images in any common raster format, e.g. JPG, PNG, BMB, etc. [More details](https://docs.microsoft.com/en-us/dotnet/api/skiasharp.skencodedimageformat)

```csharp
// it is possible to provide an image as:
 
// 1) a binary array
byte[] imageData = File.ReadAllBytes("path/to/logo.png")
container.Image(imageData)

// 2) a fileName
container.Image("path/myFile.png")

// 3) a stream
using var stream = new FileStream("logo.png", FileMode.Open);
container.Image(stream);
```

### Image scaling

By default, the `Image` element wants to use the entire available width while preserving its aspect ratio. You can change that behavior using one of the following options:

1) **FitWidth** - the element scales to take the entire available width. Default.

```csharp
container.Image("path/myFile.png").FitWidth();
```

2) **FitHeight** - the element scales to take the entire available height. Good in conjunction with constraining elements.

```csharp
container.Image("path/myFile.png").FitHeight();
```

3) **FitArea** - this is the combination of both of the above options  The element scales to occupy the entire available area with preserving its aspect ratio. This means that sometimes it occupies the entire width and sometimes the entire height. This is the safest option.

```csharp
container.Image("path/myFile.png").FitArea();
```

4) **FitUnproportionally** - the element resizes itself to occupy the entire available space. It does not preserve proportions. The image may look incorrectly scaled, and is not desired in most of the cases.

```csharp
container.Image("path/myFile.png").FitUnproportionally();
```

::: danger
Please be careful. This component may try to enforce size constraints that are impossible to meet. Such scenarios result in a layout exception.
:::

### Image compression

```csharp{9,15}
.Column(column =>
{
    column.Spacing(10);
    
    // low quality = smaller output file
    column
        .Item()
        .Image("photo.jpg")
        .WithCompressionQuality(ImageCompressionQuality.VeryLow);
        
    // high quality / fidelity = larger output file
    column
        .Item()
        .Image("photo.jpg")
        .WithCompressionQuality(ImageCompressionQuality.High);
});
```

![example](/api-reference/image-compression.png =400x)

::: tip
You configure the image compression globally using the `DocumentSettings` class. [Read more](/concepts/document-settings)
:::

### Image DPI

```csharp{9,15}
.Column(column =>
{
    column.Spacing(10);
    
    // lower raster dpi = lower resolution, pixelation
    column
        .Item()
        .Image("photo.jpg")
        .WithRasterDpi(16);
    
    // higher raster dpi = higher resolution
    column
        .Item()
        .Image("photo.jpg")
        .WithRasterDpi(72);
});
```

![example](/api-reference/image-dpi.png =400x)

::: tip
You configure the target raster DPI globally using the `DocumentSettings` class. [Read more](/concepts/document-settings)
:::

### Reusing images in document

Let's consider the following scenario: you want to generate a list of items, each of them using the same image. In such a case, for each element on your list, the following steps will be performed:
1) load the file from a file system,
2) parse the file as an image,
3) scale and compress the image using the specified settings,
4) save the image in a PDF document as a separate resource.

All the steps above have negative impact from the performance perspective and the final PDF file size.

```csharp{9}
.Column(column =>
{
    column.Spacing(15);

    foreach (var i in Enumerable.Range(0, 5))
    {
        column.Item().Row(row =>
        {
            row.AutoItem().Width(24).Image("checkbox.png");
            row.RelativeItem().PaddingLeft(8).AlignMiddle().Text(Placeholders.Label()).FontSize(16);
        });
    }
});
```

![example](/api-reference/image-shared.png =400x)

To fix this problem, you can load image and use it as a shared resource:

```csharp{5,11}
.Column(column =>
{
    column.Spacing(15);

    var image = Image.FromFile("checkbox.png");
    
    foreach (var i in Enumerable.Range(0, 5))
    {
        column.Item().Row(row =>
        {
            row.AutoItem().Width(24).Image(image);
            row.RelativeItem().PaddingLeft(8).AlignMiddle().Text(Placeholders.Label()).FontSize(16);
        });
    }
});
```


## Dynamic images

- QuestPDF offers flexible layouts, therefore it is hard to predict the desired image resolution.
- To achieve the best image clarity, generate images with a specified resolution (or a multiple of the resolution for retina displays).
- Useful when creating maps / charts.
- This element behaves similarly to static images.
- As an argument, it expects a function that takes available space and returns an image in a binary format.

```csharp{7-7}
// somewhere in your code
byte[] GenerateImage(Size size)
{
    // logic that generates and returns an image with a specific resolution
}

.Image(GenerateImage);
```

## Limiting image size

The PDF standard uses points to describe size, where there are 72 points in 1 inch. `Image` uses pixels to describe content. However, pixel does not have any meaningful size. Only when you specify DPI (dots per inch), is it possible to determine a pixel's size. The QuestPDF library always scales an image, because determining physical image size based on its resolution does not make sense.

To force an image to take a specified area, you can use any of the constraining elements. The simplest ones are `Width` and `Height`, e.g.:

```csharp
container
    .Width(1, Unit.Inch)
    .Image(ImageElement.Image)
```

Please note that because the `Image` element uses a proper scaling setting by default, you do not need to use both `Width` and `Height` (the image aspect ratio is preserved).


## SVG Support

The library supports SVG images. You can use them in the same way as raster images.

In the following example, the image is loaded and parsed on demand:

```csharp{11-12}
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Size(PageSizes.A7.Landscape());
            page.Margin(25);
            
            page.Content()
                .Padding(25)
                .Svg(SvgImage.FromFile("pdf-icon.svg"))
                .FitArea();
        });
    })
    .GeneratePdfAndShow();
```

You can also improve performance by loading and parsing the image only once:

```csharp{1-2,14-15}
// in global or static context
var image = SvgImage.FromFile("pdf-icon.svg");

Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Size(PageSizes.A7.Landscape());
            page.Margin(25);
            
            page.Content()
                .Padding(25)
                .Svg(image))
                .FitArea();
        });
    })
    .GeneratePdfAndShow();
```


<object data="/api-reference/document-svg.pdf" type="application/pdf" class="pdf-viewer">
  <p>Unable to display PDF file. <a href="/api-reference/document-svg.pdf">Download</a> instead.</p>
</object>

:::warning
The SVG module displays SVGs as images with high capabilities and compliance. 
Most SVG files are expected to render correctly, particularly those from popular design tools. 
However, there are some limitations to be aware of. 
If an SVG file does not render as expected after considering the following points, please file an issue.

- Direct inclusion of CSS styles within SVGs is not supported. Use tools to convert CSS styles to SVG attributes where possible.
- RGBA color syntax is not supported; use separate attributes for color and opacity (`fill-opacity` and `stroke-opacity`).
- Certain SVG elements are not supported and might need to be rewritten or excluded (`<altGlyph>`,` <animate>`, `<cursor>`, `<feComponentTransfer>`, `<feConvolveMatrix>`, `<feTile>`, `<feDropShadow>`, `<font>`, `<foreignObject>`, `<glyph>`, `<script>`, `<view>`).
- The module allows SVGs to use fonts available in your application, but there are restrictions on how the font-family attribute can be set.
- SVGs containing other SVGs through specific elements are not supported. Please use only a single font family name.
- Use of certain deprecated attributes in gradients is not supported and alternatives may not work reliably.
- SVGs that render in browsers might not display correctly due to stricter error handling in the SVG module.

This information is based on https://shopify.github.io/react-native-skia/docs/images-svg/#svg-support
:::

:::info
QuestPDF releases prior to 2024.3.0 required to use the `Svg.Skia` nuget library with additional integration code.
It is no longer necessary and you can safely remove both the nuget dependency and integration code (likely the `SvgExtensions` class).
:::
