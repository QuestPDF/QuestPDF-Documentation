# Document settings

It is possible to fine-tuning of the document generation process:

```c#{9-16}
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Content().Text("Your invoice content");
        });
    })
    .WithSettings(new DocumentSettings
    {
        PdfA = false,
        CompressDocument = true,
        ImageCompressionQuality = ImageCompressionQuality.High,
        ImageRasterDpi = 288,
        ContentDirection = ContentDirection.LeftToRight
    })
    .GeneratePdf("document.pdf");
```

| Property                    | Description                                                                                                                                                                                                                                                            |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **PdfA**                    | Determines whether the document should be PDF/A-3b conformant. If `true`, it includes XMP metadata, a document UUID, and sRGB output intent information. This increases document length and makes it non-reproducible, but ensures compliance with PDF/A-3b standards. |
| **CompressDocument**        | Indicates whether the generated document should be additionally compressed. Compression may significantly reduce file size with a minor increase in generation time.                                                                                                   |
| **ImageCompressionQuality** | Controls the trade-off between file size and image quality. If the image is opaque, it is encoded using JPEG with the selected quality setting. If the image contains an alpha channel, it is always encoded in PNG format, ignoring this setting.                     |
| **ImageRasterDpi**          | Defines the DPI (dots per inch) at which images and non-PDF-supported features are rasterized. A higher DPI results in better fidelity but increases file size and memory usage. This setting also controls the resolution of generated images. Default is `288 DPI`.  |
| **ContentDirection**        | Specifies the default text direction for content layout (e.g., Left-to-Right or Right-to-Left).                                                                                                                                                                        |
