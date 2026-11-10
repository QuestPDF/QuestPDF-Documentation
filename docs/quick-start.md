# Quick start

Create a console project, add the QuestPDF package and generate your first PDF.

## Installation

Run these commands in your terminal:

```bash
dotnet new console -n HelloPdf
cd HelloPdf
dotnet add package QuestPDF
```

Already have a project? Run only `dotnet add package QuestPDF` in its folder, or search for `QuestPDF` in the NuGet package manager of [Visual Studio](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-visual-studio), [Visual Studio Code](https://code.visualstudio.com/docs/csharp/package-management) or [JetBrains Rider](https://www.jetbrains.com/help/rider/Using_NuGet.html).

## Implementation

Replace the contents of `Program.cs` with the following code:

```csharp
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

QuestPDF.Settings.License = LicenseType.Evaluation;

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

Then run the project:

```bash
dotnet run
```

The program saves `hello.pdf` in the folder it runs from, here `HelloPdf`. The document looks like this:

![example](/minimal-api.webp)

## License

The Evaluation license lets you try every feature before choosing a license, and is not permitted in production. QuestPDF is free for individuals, non-profits, FOSS projects and organizations under $1M USD in annual gross revenue: see [License configuration](/license/configuration.md) and [Pricing](/pricing).

## Are you ready for more?

QuestPDF's Fluent API scales seamlessly with your document complexity. To explore its full potential, check out [the In-Depth Invoice Tutorial](/invoice-tutorial.md), where you'll learn to create a professional invoice in less than 200 lines of code.

![invoice](/getting-started/invoice.webp)
