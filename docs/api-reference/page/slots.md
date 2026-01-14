# Page Slots

The Page container is a multi-child container that allows you to define the layout of the page. 
It provides several slots that can be used to add content to the page.

## Main Slots

The main slots are Header, Content, and Footer.

| Slot               | Description                                                                                                                                                                                         |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| page.**Header()**  | Represents the segment at the very top of the page, just above the main content. This container does not support paging capability. It is expected to be fully displayed on every page.             |
| page.**Content()** | Represents the primary content, located between the header and footer. This container supports paging capability and determines the final length of the document.                                   |
| page.**Footer()**  | Represents the section at the very bottom of the page, just below the main content. This container does not support paging capability. It is expected to be fully displayed on every page. |


```c#
.Page(page =>
{
    document.Page(page =>
    {
        page.Size(PageSizes.A4);
        page.Margin(2, Unit.Centimetre);
        page.DefaultTextStyle(x => x.FontSize(24));
    
        page.Header()
            .Background(Colors.Grey.Lighten1)
            .Height(125)
            .AlignCenter()
            .AlignMiddle()
            .Text("Header");
        
        page.Content()
            .Background(Colors.Grey.Lighten2)
            .AlignCenter()
            .AlignMiddle()
            .Text("Content");
        
        page.Footer()
            .Background(Colors.Grey.Lighten1)
            .Height(75)
            .AlignCenter()
            .AlignMiddle()
            .Text("Footer");
    });
});
```

![example](/api-reference/page-main-slots.webp)


## Foreground Slot

Represents a layer drawn in front of the primary layer (header + content + footer), serving as a watermark.
It is not affected by the Margin configuration and always occupy the entire page.

```c#{18}
document.Page(page =>
{
    page.Size(PageSizes.A4);
    page.Margin(2, Unit.Centimetre);
    page.DefaultTextStyle(x => x.FontSize(20));

    page.Header()
        .PaddingBottom(1, Unit.Centimetre)
        .Text("Report")
        .FontSize(30)
        .Bold();
    
    page.Content()
        .Text(Placeholders.Paragraphs())
        .ParagraphSpacing(1, Unit.Centimetre)
        .Justify();

    page.Foreground().Svg("Resources/draft-foreground.svg").FitArea();
});
```

![example](/api-reference/page-foreground.webp)

## Background Slot

Represents a layer drawn behind the primary layer (header + content + footer).
It is not affected by the Margin configuration and always occupy the entire page.

```c#{5}
document.Page(page =>
{ 
    page.Size(PageSizes.A4.Landscape());

    page.Background().Svg("Resources/certificate-background.svg").FitArea();

    page.Content() 
        .PaddingLeft(10, Unit.Centimetre)
        .PaddingRight(5 , Unit.Centimetre)
        .AlignMiddle()
        .Column(column =>
        {
            column.Item().Height(50).Svg("Resources/questpdf-logo.svg");
            
            column.Item().Height(50);
            
            column.Item().Text("CERTIFICATE").FontSize(64).ExtraBlack();
            
            column.Item().Height(25);
            
            column.Item()
                .Shrink().BorderBottom(1).Padding(10)
                .Text("Marcin Ziąbek").FontSize(32).Italic();
            
            column.Item().Height(10); 
            
            column.Item()
                .Text($"has successfully completed the course \"QuestPDF Basics\" on {DateTime.Now:dd MMM yyyy}.")
                .FontSize(20).Light();
        });
});
```

![example](/api-reference/page-background.webp)
