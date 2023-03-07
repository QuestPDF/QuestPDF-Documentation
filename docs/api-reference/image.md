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

By default, the `Image` element wants to use the entire available width while preserving its aspect ratio. You can change that behavior using one of the following options:
1) `ImageScaling.FitWidth` - the element scales to take the entire available width. Default.
2) `ImageScaling.FitHeight` - the element scales to take the entire available height. Good in conjunction with constraining elements.
3) `ImageScaling.FitArea` - this is the combination of both of the above options  The element scales to occupy the entire available area with preserving its aspect ratio. This means that sometimes it occupies the entire width and sometimes the entire height. This is the safest option.
4) `ImageScaling.Resize` - the element resizes itself to occupy the entire available space. It does not preserve proportions. The image may look incorrectly scaled, and is not desired in most of the cases.

```csharp
.Image(imageData, ImageScaling.FitArea)
```

::: danger
Please be careful. This component may try to enforce size constraints that are impossible to meet. Such scenarios result in a layout exception.
:::

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
