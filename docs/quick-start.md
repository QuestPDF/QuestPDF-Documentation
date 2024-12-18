# Quick start

## What is QuestPDF?

### Modern approach for PDF generation

QuestPDF is a modern C# library that takes a fresh approach to PDF document generation. Instead of relying on HTML conversion like many other solutions, it provides a dedicated layout engine optimized specifically for creating PDF documents.

### Component-Based Architecture

At its core, QuestPDF works by composing simple elements (like text, images, tables, and grids) into more complex layouts. Think of it as building with LEGO blocks – each piece has a clear purpose, and you can combine them confidently to create sophisticated documents. 

### Code-focused Paradigm

Since the library uses pure C# language, you can leverage familiar programming concepts like loops and conditionals to create dynamic documents. It promotes best practices such as modular design and reusability while seamlessly integrating with source control systems for collaboration and versioning.

## Installation

QuestPDF is available as a NuGet package. You can install it through your IDE by searching for QuestPDF:
- [Visual Studio](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-visual-studio)
- [Visual Code](https://code.visualstudio.com/docs/csharp/package-management)
- [JetBrains Rider](https://www.jetbrains.com/help/rider/Using_NuGet.html)

Or use one of the following methods:

```c#
// Package Manager
Install-Package QuestPDF

// .NET CLI
dotnet add package QuestPDF

// Package reference in .csproj file
<PackageReference Include="QuestPDF" Version="2024.12.0" />
```

Check the package details [on the NuGet website](https://www.nuget.org/packages/QuestPDF/):

[![quest pdf logo](/nuget.svg =150x)](https://www.nuget.org/packages/QuestPDF/)

## Implementation

QuestPDF's minimal API makes it incredibly easy to create and prototype PDF documents. Here's a simple example that demonstrates its intuitive syntax:

```c#
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

// code in your main method
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


## Are you ready for more?

QuestPDF's Fluent API scales seamlessly with your document complexity. Whether you're creating simple reports or sophisticated documents, the intuitive syntax remains consistent and maintainable. To explore its full potential, check out [the Getting started tutorial](/getting-started), where you'll learn to create a professional invoice in less than 200 lines of code. You can also examine and experiment with the code hosted on [the GitHub repository](https://github.com/QuestPDF/example-invoice).

![invoice](/getting-started/invoice.png =500x)

## Learn from the Community

We are incredibly grateful to the YouTube Community for their positive reviews and recommendations of the QuestPDF library. Your support and feedback are invaluable and motivate us to keep improving and expanding this project. Thank you for helping us grow and reach more developers!

<iframe width="560" height="315" src="https://www.youtube.com/embed/_M0IgtGWnvE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/T89A_7dz1P8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/-iYvZvpLX0g" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/bhR4Cmg16gs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
