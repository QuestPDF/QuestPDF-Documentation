# Quick start

## Installation

The library is available as a nuget package. You can install it as any other nuget package from your IDE, try to search by `QuestPDF`. You can find package details [on this webpage](https://www.nuget.org/packages/QuestPDF/).

[![quest pdf logo](/nuget.svg =200x)](https://www.nuget.org/packages/QuestPDF/)


```xml
// Package Manager
Install-Package QuestPDF

// .NET CLI
dotnet add package QuestPDF

// Package reference in .csproj file
<PackageReference Include="QuestPDF" Version="2022.9.0" />
```

## Implementation

How easy it is to start and prototype with QuestPDF? Really easy thanks to its minimal API! Please analyse the code below:

```csharp
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

And compare it to the produced PDF file:

![example](/minimal-api.png =300x)


## Are you ready for more?

The Fluent API of QuestPDF scales really well. It is easy to create and maintain even most complex documents. Read [the Getting started tutorial](/getting-started.html) to learn QuestPDF basics and implement an invoice under 200 lines of code. You can also investigate and play with the code from [the example repository](https://github.com/QuestPDF/example-invoice).

![invoice](/getting-started/invoice.png =500x)
