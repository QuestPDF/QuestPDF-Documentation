# Optimization

Images can be a significant factor in the file size of your PDF documents.
QuestPDF provides several options to help you optimize images for the best balance between quality and file size.


## Image compression

Image compression is a setting that controls the balance between an image's file size and its visual fidelity during compression.
Higher quality values preserve more detail with larger file sizes, while lower values reduce file size at the cost of potential image degradation, such as blurriness or artifacts.

::: tip
Opaque images are JPEG-encoded based on this setting, while images with an alpha channel default to PNG format, disregarding this option.
:::

#### Available compression quality settings:

| Enum Value                           | JPEG Quality (out of 100) |
|--------------------------------------|---------------------------|
| ImageCompressionQuality.**Best**     | 100                       |
| ImageCompressionQuality.**VeryHigh** | 90                        |
| ImageCompressionQuality.**High**     | 75                        |
| ImageCompressionQuality.**Medium**   | 50                        |
| ImageCompressionQuality.**Low**      | 25                        |
| ImageCompressionQuality.**VeryLow**  | 10                        |

#### Example:

```c#{9,15}
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

![example](/api-reference/image-compression.webp =400x)


## Image DPI

Image DPI (dots-per-inch) is a measure of an image's resolution that indicates how many individual dots (or pixels) fit into one inch of a printed image.
Higher DPI values result in greater detail and sharpness, making images appear clearer when printed, while lower DPI values can cause images to look blurry or pixelated.

#### Calculation

The target resolution is computed by multiplying the DPI with the physical image size on the document.
Consider an image of dimensions 3x4 inches. Using a DPI value of 300, the final resolution translates to 900x1200 pixels.

If the input image has lower resolution that the one calculated from the DPI setting, it will NOT be rescaled.

#### Example

```c#{9,15}
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

![example](/api-reference/image-dpi.webp =400x)


## Global settings

It is possible to globally alter the default image compression quality and raster DPI for all images in the document.

```c#{9-16}
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Content().Image("photo.jpg");
        });
    })
    .WithSettings(new DocumentSettings
    {
        // default: ImageCompressionQuality.High;
        ImageCompressionQuality = ImageCompressionQuality.Medium,

        // default: 288
        ImageRasterDpi = 14
    })
    .GeneratePdf("image-global-settings.pdf");
```


## Using original image

When enabled, the library does not resize the image to achieve the target DPI, nor compress it with target image quality.

```c#{3}
container
    .Image("photo.jpg")
    .UseOriginalImage();
```
