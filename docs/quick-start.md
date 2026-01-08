# Quick start

QuestPDF is a modern C# library for PDF generation that provides a dedicated layout engine optimized specifically for creating PDF documents. Its component-based architecture lets you compose simple elements (such as text, images, tables, and grids) into sophisticated layouts through an intuitive, declarative API. Because it's pure C#, you get full access to familiar programming constructs, strong typing, and seamless IDE support.

## Installation

QuestPDF is available as a NuGet package. You can install it through your IDE by searching for phrase `QuestPDF`. If you are not familiar how to do that, please refer to the following guides: 
- [Visual Studio](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-visual-studio)
- [Visual Code](https://code.visualstudio.com/docs/csharp/package-management)
- [JetBrains Rider](https://www.jetbrains.com/help/rider/Using_NuGet.html)

Or use the following command in your terminal:

```c#
dotnet add package QuestPDF
```

## Implementation

QuestPDF's minimal API makes it incredibly easy to create and prototype PDF documents. Here's a simple example that demonstrates its intuitive syntax:

```c#
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

// set your license here:
// QuestPDF.Settings.License = LicenseType.Community;

Document.Create(container =>
{
    container.Page(page =>
    {
        page.Size(PageSizes.A4);
        page.Margin(2, Unit.Centimetre);
        page.PageColor(Colors.White);
        page.DefaultTextStyle(x => x.FontSize(20));
        
        page.Header()
            .Text("Hello PDF!")
            .SemiBold().FontSize(36).FontColor(Colors.Blue.Medium);
        
        page.Content()
            .PaddingVertical(1, Unit.Centimetre)
            .Column(x =>
            {
                x.Spacing(20);
                
                x.Item().Text(Placeholders.LoremIpsum());
                x.Item().Image(Placeholders.Image(200, 100));
            });
        
        page.Footer()
            .AlignCenter()
            .Text(x =>
            {
                x.Span("Page ");
                x.CurrentPageNumber();
            });
    });
})
.GeneratePdf("hello.pdf");
```

This code generates a PDF document with the following layout:

![example](/minimal-api.png =300x)

## License

::: warning SUSTAINABLE AND FAIR LICENSE
By offering free access to most users and premium licenses for larger organizations, the project maintains its commitment to excellence while ensuring sustainable, long-term development for all.

The library is free to use for any individual or business with less than 1 million USD annual gross revenue, or operates as a non-profit organization, or is a FOSS project.
:::

::: tip
For learning and evaluation, you can use the free QuestPDF Community license.

More details can be found on the [QuestPDF License and Pricing page](/license/).
:::



## Are you ready for more?

QuestPDF's Fluent API scales seamlessly with your document complexity. To explore its full potential, check out [the In-Depth Invoice Tutorial](/invoice-tutorial), where you'll learn to create a professional invoice in less than 200 lines of code.

![invoice](/getting-started/invoice.png =400x)
