# Images

## Static images

- This element can be used for placing images inside the document.
- By default, It preserves the image's aspect ratio.
- The image is loaded into SkiaSharp.Image object. Notice that all limitations are derived. For example, available image formats may differ by platform.
- You can use images in any common raster format, e.g. JPG, PNG, BMB, etc. [More details](https://docs.microsoft.com/en-us/dotnet/api/skiasharp.skencodedimageformat?view=skiasharp-2.80.2)

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

By default, the Image element wants to use entire provided width while preserving its aspect ratio. You can change that behavior using one of the available options:
1) `ImageScaling.FitWidth` - the element scales to take entire available width. Default.
2) `ImageScaling.FitHeight` - the element scales to take entire available height. Good in conjunction with constraining elements.
3) `ImageScaling.FitArea` - this is the combination of both options above. The element scales to take entire available area with preserving its aspect ratio. That means, sometimes it takes entire width and sometimes entire height. This is the safest option.
4) `ImageScaling.Resize` - element resizes itself to cover entire available space. It does not preserve proportions. The image may look incorrectly scaled, therefore it is not desired in most of the cases.

```csharp
.Image(imageData, ImageScaling.FitArea)
```

::: danger
Please be careful. This component may try to enforce size constraints that are impossible to meet. Such scenarios end up with the layout exception.
:::

## Dynamic images

- QuestPDF offers flexible layouts, therefore it is hard to predict image resolution.
- To achieve the best image clarity, generate images with specified resolution (or multiple of the resolution for retina displays).
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

PDF standard uses points to describe size, where 72 points are 1 inch. Image uses pixels to describe content. However, pixel does not have any meaningful size. Only when you specify DPI (dots per inch), it is possible to translate how bix pixels are. Therefore, the library always scales the image, as determining physical image size based on its resolution just does not make sense.

To force the image to take a specified area, you can use any of the constraining elements. The simplest ones are `Width` and `Height`, e.g.:

```csharp
container
    .Width(1, Unit.Inch)
    .Image(ImageElement.Image)
```

Please notice that because the Image element uses a proper scaling setting by default, you do not need to use both Width and Height, as image aspect ratio is preserved.
