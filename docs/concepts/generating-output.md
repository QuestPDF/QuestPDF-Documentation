# Generating output

## Generating PDF files

The library supports generation of PDF files:

```c#
report.GeneratePdf("result.pdf");
```

## Generating XPS files

The library supports generation of XPS files:

```c#
report.GenerateXps("result.xps");
```


## Generating images

The default functionality of the library is generating PDF files based on specified document configuration. In some cases, you may need to generate a set of images instead. Such tasks can be done by additional extension methods:

```c#
// generate images as dynamic list of images
IEnumerable<byte[]> images = document.GenerateImages();

// generate images and save them as files with provided naming schema
document.GenerateImages(i => $"image-{i}.png");  
```

::: tip
Generated images are in the PNG format. In order to increase the resolution of generated images, please modify the value of the `DocumentMetadata.RasterDpi` property. When RasterDpi is set to 72, one PDF point corresponds to one pixel.
:::