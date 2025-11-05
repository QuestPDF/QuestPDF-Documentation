# Document Settings

QuestPDF provides comprehensive control over the document generation process through the `DocumentSettings` class. These settings allow you to fine-tune various aspects of your PDF output, including compliance standards, compression, image quality, and content direction.

```csharp
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Content().Text("Your document content");
        });
    })
    .WithSettings(new DocumentSettings
    {
        PDFA_Conformance = PDFA_Conformance.PDFA_3B,
        PDFUA_Conformance = PDFUA_Conformance.None,
        CompressDocument = true,
        ImageCompressionQuality = ImageCompressionQuality.High,
        ImageRasterDpi = 288,
        ContentDirection = ContentDirection.LeftToRight
    })
    .GeneratePdf("document.pdf");
```

| Property                    | Description                                                                                                                                                                                                                                                           |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **PDFA_Conformance**        | Specifies the PDF/A archival standard compliance level. Note: This setting makes the document non-reproducible.                                                                                                                                                       |
| **PDFUA_Conformance**       | Sets the PDF/UA (Universal Accessibility) compliance level for accessibility standards. Note: This setting makes the document non-reproducible.                                                                                                                       |
| **CompressDocument**        | Indicates whether the generated document should be additionally compressed. Compression may significantly reduce file size with a minor increase in generation time.                                                                                                  |
| **ImageCompressionQuality** | Controls the trade-off between file size and image quality. If the image is opaque, it is encoded using JPEG with the selected quality setting. If the image contains an alpha channel, it is always encoded in PNG format, ignoring this setting.                    |
| **ImageRasterDpi**          | Defines the DPI (dots per inch) at which images and non-PDF-supported features are rasterized. A higher DPI results in better fidelity but increases file size and memory usage. This setting also controls the resolution of generated images. Default is `288 DPI`. |
| **ContentDirection**        | Specifies the default text direction for content layout (e.g., Left-to-Right or Right-to-Left).                                                                                                                                                                       |