# Barcodes

QuestPDF provides robust support for generating various types of barcodes in your PDF documents through integration with the ZXing.Net library. 
This implementation leverages vector graphics via SVG, ensuring your barcodes remain sharp and scannable at any resolution.

::: info
This section provides examples of how to integrate the ZXing.Net library with QuestPDF.
This library is available under the "Apache-2.0" license. 

We extend our thanks to the authors and maintainers of that project for their contributions to the open-source community.

- [ZXing.Net NuGet page](https://www.nuget.org/packages/ZXing.Net)
- [ZXing.Net GitHub page](https://github.com/micjahn/ZXing.Net/)
- [Original project in Java](https://github.com/zxing/zxing)
- [Tutorial about common standards in barcodes](https://github.com/zxing/zxing/wiki/Barcode-Contents)
:::

::: warning
Please note that the ZXing.Net library is not included in the QuestPDF package. 
You need to install it separately via the NuGet package manager.
:::


## Supported formats

The ZXing.Net supports the following list of formats:
- **1D product**: UPC-A, UPC-E, EAN-8, EAN-13, UPC/EAN Extension 2/5,
- **1D industrial**: Code 39, Code 93, Code 128, Codabar, ITF,
- **2D**: QR Code, Data Matrix, Aztec, PDF 417, MaxiCode, RSS-14, RSS-Expanded.


## Barcode

Linear barcodes (like EAN-8, EAN-13, Code 128, etc.) are perfect for encoding numeric or alphanumeric data in a compact format. 
Here's how to implement an EAN-8 barcode:

```c#{34-42}
using ZXing;
using ZXing.OneD;
using ZXing.Rendering;

// somewhere in your document's implementation
.Background(Colors.Grey.Lighten3)
.Padding(25)
.Row(row =>
{
    var productId = Random.Shared.NextInt64() % 10_000_000;
    
    row.Spacing(20);

    row.RelativeItem().Text(text =>
    {
        text.ParagraphSpacing(10);
        
        text.Span("Product ID: ").Bold();
        text.Line(productId.ToString("D7"));
        
        text.Span("Name: ").Bold();
        text.Line(Placeholders.Label());

        text.Span("Description: ").Bold();
        text.Span(Placeholders.Sentence());
    });

    row.AutoItem()
        .Background(Colors.White)
        .AlignCenter()
        .AlignMiddle()
        .Width(200)
        .Height(75)
        .Svg(size =>
        {
            var content = productId.ToString("D7");
            
            var writer = new EAN8Writer();
            var eanCode = writer.encode(content, BarcodeFormat.EAN_8, (int)size.Width, (int)size.Height);
            var renderer = new SvgRenderer { FontName = "Lato", FontSize = 16 };
            return renderer.Render(eanCode, BarcodeFormat.EAN_8, content).Content;
        });
});
```

![example](/api-reference/barcode.webp =550x)


## QR Code

QR codes are versatile 2D barcodes that can encode larger amounts of data, including URLs, text, and more. 
Here's how to create a QR code:

```c#{28-34}
using ZXing;
using ZXing.QrCode;
using ZXing.Rendering;

// somewhere in your document's implementation
.Background(Colors.Grey.Lighten3)
.Padding(25)
.Row(row =>
{
    const string url = "https://en.wikipedia.org/wiki/Algorithm";
    
    row.Spacing(20);

    row.RelativeItem()
        .AlignMiddle()
        .Text(text =>
        {
            text.Justify();
            text.Span("In mathematics and computer science, ");
            text.Span("an algorithm").Bold().BackgroundColor(Colors.White);
            text.Span(" is a finite sequence of mathematically rigorous instructions, typically used to solve a class of specific problems or to perform a computation. ");
            text.Hyperlink("Learn more", url).Underline().FontColor(Colors.Blue.Darken2);
        });
    
    row.ConstantItem(5, Unit.Centimetre)
        .AspectRatio(1)
        .Background(Colors.White)
        .Svg(size =>
        {
            var writer = new QRCodeWriter();
            var qrCode = writer.encode(url, BarcodeFormat.QR_CODE, (int)size.Width, (int)size.Height);
            var renderer = new SvgRenderer { FontName = "Lato" };
            return renderer.Render(qrCode, BarcodeFormat.EAN_13, null).Content;
        });
});
```

![example](/api-reference/qrcode.webp =550x)
