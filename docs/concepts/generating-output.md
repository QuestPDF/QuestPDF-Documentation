# Generating output

The primary goal of the QuestPDF library is to generate PDF files. 
However, it also supports other output formats such as XPS, SVG and images.

::: warning
Please be aware that certain features may not be available on formats other than PDF.
:::


## Generating PDF files

There are several overloads for generating PDF files:

```c#
var document = Document.Create(document =>
{
    document.Page(page =>
    {
        page.Content().Text("Your invoice content");
    });
});

// generate PDF and save it to a file
document.GeneratePdf("document.pdf");

// generate PDF and return it as a byte array
var byteArray = document.GeneratePdf();

// generate PDF and save it to a stream
using var stream = new FileStream("document.pdf", FileMode.Create);
document.GeneratePdf(stream);
```


## Generating XPS files

The library also supports generating XPS files:

```c#
// generate XPS and save it to a file
document.GenerateXps("document.xps");

// generate XPS and return it as a byte array
var byteArray = document.GenerateXps();

// generate XPS and save it to a stream
using var stream = new FileStream("document.xps", FileMode.Create);
document.GenerateXps(stream);
```

::: warning
Please note that generating XPS files is only supported on Windows operating systems.
:::


## Generating SVG files

The library also supports generating SVG files.
Each page is represented as a separate SVG file.

```c#
ICollection<string> svgFiles = document.GenerateSvgFiles();
```


## Generating images

The library also supports generating images.
Each page is represented as a separate image file.

```c#
// generate images and return them as byte arrays
IEnumerable<byte[]> imagesAsByteArrays = document.GenerateImages();

// save images to files
document.GenerateImages(imageIndex => $"image{imageIndex}.png");
```

Optionally, you can provide additional generation settings:

| Property                    | Description                                                                                                                                                                                                                      |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **ImageFormat**             | The file format used to encode the images. Default is `PNG`.                                                                                                                                                                     |
| **ImageCompressionQuality** | Encoding quality controls the trade-off between size and quality. The default value is `high`.                                                                                                                                   |
| **RasterDpi**               | The DPI (pixels-per-inch) at which the document will be rasterized. This controls the resolution of produced images. Higher DPI results in superior image quality but may increase the output file size. Default value is `288`. |


```c#{3-8}
using QuestPDF.Infrastructure;

var imageGenerationSettings = new ImageGenerationSettings
{
    ImageFormat = ImageFormat.Png,
    ImageCompressionQuality = ImageCompressionQuality.High,
    RasterDpi = 288
};

IEnumerable<byte[]> imagesAsByteArrays = document.GenerateImages(imageGenerationSettings);

// or

document.GenerateImages(imageIndex => $"image{imageIndex}.png", imageGenerationSettings);
```
