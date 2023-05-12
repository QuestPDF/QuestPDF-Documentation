# Document settings

You can modify the PDF document metadata by returning the `DocumentSettings` object from the `IDocument.GetSettings()` method. There are several properties available, and some of them have default values (see below).

```csharp
public class DocumentSettings
{
    public bool PdfA { get; set; } = false;
    public ImageCompressionQuality ImageCompressionQuality { get; set; } = ImageCompressionQuality.VeryHigh;
    public int ImageRasterDpi { get; set; } = DefaultRasterDpi * 2;
    public ContentDirection ContentDirection { get; set; } = ContentDirection.LeftToRight;

    public static DocumentSettings Default => new DocumentSettings();
}
```


## PdfA

Gets or sets a value indicating whether or not make the document PDF/A-2b conformant. 

If true, include XMP metadata, a document UUID, and sRGB output intent information. This adds length to the document and makes it non-reproducable, but are necessary features for PDF/A-2b conformance.


## ImageCompressionQuality

Encoding quality controls the trade-off between size and quality. 

When the image is opaque, it will be encoded using the JPEG format with the selected quality setting. When the image contains an alpha channel, it is always encoded using the PNG format and this option is ignored. 

The default value is "very high quality".


## ImageRasterDpi 

The DPI (pixels-per-inch) at which images and features without native PDF support will be rasterized. 

A larger DPI would create a PDF that reflects the original intent with better fidelity, but it can make for larger PDF files too, which would use more memory while rendering, and it would be slower to be processed or sent online or to printer. 

When generating images, this parameter also controls the resolution of the generated content. 

The default value is 144.

## ContentDirection

Set the global document's content direction. The default value is `from left to right`.
