---
title: "About"
---

![quest pdf logo](./images/logo.svg =400x)

QuestPDF is a modern library that may help you with generating PDF documents in your .NET application by using friendly, discoverable and predictable C# fluent API.


## Introduction

QuestPDF presents a new approach to PDF document generation. Unlike other libraries, it does not rely on the HTML-to-PDF conversion which in many cases is not reliable. Instead, it implements its own layouting engine that is optimized to cover all paging-related requirements. Then, everything is rendered using the SkiaSharp library (a Skia port for .NET, used in Chrome, Android, MAUI, etc.).

The layouting engine is designed with a full paging support in mind. The document consists of many simple elements (e.g. border, background, image, text, padding, table, grid etc.) that are composed together to create more complex structures. This way, as a developer, you can understand the behaviour of every element and use them with full confidence. Additionally, the document and all its elements support paging functionality. For example, an element can be moved to the next page (if there is not enough space) or even be split between pages like table's rows.


## Installation

The library is available as a nuget package. You can install it as any other nuget package from your IDE, try to search by `QuestPDF`. You can find package details [on this webpage](https://www.nuget.org/packages/QuestPDF/).

[![quest pdf logo](./images/nuget.svg =200x)](https://www.nuget.org/packages/QuestPDF/)

Or use the following command in Visual Studio:

```
Install-Package QuestPDF
```

## Quick start

```csharp
Document
    .Create(container =>
    {
        container.Page(page =>
        {
            page.Size(PageSizes.A5);
            page.Margin(1.5f, Unit.Centimetre);
            
            page.Header()
                .Text("Hello PDF!", TextStyle.Default.SemiBold().Size(20));
            
            page.Content()
                .PaddingVertical(1, Unit.Centimetre)
                .Column(x =>
                {
                    x.Spacing(10);
                    
                    x.Item().Text(Placeholders.LoremIpsum());
                    x.Item().Image(Placeholders.Image(200, 100));
                });
        });
    })
    .GeneratePdf("hello.pdf");
```