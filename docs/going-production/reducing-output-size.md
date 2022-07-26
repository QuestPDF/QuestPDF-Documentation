# Reducing output size

## Use loss compression for images

By default, QuestPDF uses a lossless compression algorithm. If your document contains a lot of images, the output file size can become bigger than expected. Please consider using the loss compression. It is done by changing the `DocumentMetadata.ImageQuality` property. The precise instruction how this property works can be found in [this section](/concepts/document-metadata).

## Perform manual font subsetting

QuestPDF is a layout engine that uses the SkiaSharp library to render final PDF file. Therefore, it derives some limitations. One of them is how fonts are handled. By default, SkiaSharp embeds all fonts within the PDF document. Each font may consist of thousands of glyphs, with style and weight variations. Therefore, using even a single font may increase the output size to over 1,5MB.

When designing the document, please try to limit number of fonts used.

Consider performing a manual font sub-setting. This is a process where you alter the font file by removing all unnecessary glyphs. For example, if your document uses only english characters, there is no reason to embed Chinese glyphs. They are just taking space. By predicting which characters will appear in your document, you can easily optimize fonts.

::: tip
Current discussion about font-subsetting can be found in [this GitHub issue](https://github.com/QuestPDF/QuestPDF/issues/31). Moreover, **Pietervdw** (thank you for your help!) created [a detailed instruction](https://github.com/QuestPDF/QuestPDF/issues/31#issuecomment-1018476317) showing how to perform manual font-subsetting.
:::

::: tip
I am planning to implement automated font-subsetting in QuestPDF. Therefore, in the future, this problem will be properly solved. However, taking into account the complexity of this domain, I am planning to focus on other library aspects first. Stay tuned!
:::