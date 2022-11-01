# Page

This container consists of multiple page-related slots.

## Main slots

Main slots (header, content and footer) can be used to specify page content:
- The header element is always visible at the top on each page.
- The footer element is always visible at the bottom on each page.
- The content element is drawn on the rest of the space (between the header and the footer.).

```csharp
.Page(page =>
{
    page.MarginHorizontal(40);
    page.MarginVertical(60);

    page.Header()
        .Height(60)
        .Background(Colors.Grey.Lighten1)
        .AlignCenter()
        .AlignMiddle()
        .Text("Header");

    page.Content()
        .Background(Colors.Grey.Lighten2)
        .AlignCenter()
        .AlignMiddle()
        .Text("Content");

    page.Footer()
        .Height(30)
        .Background(Colors.Grey.Lighten1)
        .AlignCenter()
        .AlignMiddle()
        .Text("Footer");
});
```

::: danger
Please be careful! When the total height of the header and footer element is greater than the total page's height, there is not space enough for the content. In such a case, the layout exception is thrown.
:::

![example](/api-reference/page-example.png =298x)

## Watermark slots

The watermark slots (background and foreground) can be used to add content on the back or on the front of the main content.

```csharp{10-14,16-20}
.Page(page =>
{
    page.Size(PageSizes.A4);
    page.Margin(1, Unit.Inch);
    page.DefaultTextStyle(TextStyle.Default.FontSize(16));
    page.PageColor(Colors.White);

    const string transparentBlue = "#662196f3";

    page.Background()
        .AlignTop()
        .ExtendHorizontal()
        .Height(200)
        .Background(transparentBlue);
    
    page.Foreground()
        .AlignBottom()
        .ExtendHorizontal()
        .Height(250)
        .Background(transparentBlue);
    
    page.Header()
        .Text("Background and foreground")
        .Bold().FontColor(Colors.Blue.Darken2).FontSize(36);
    
    page.Content().PaddingVertical(25).Column(column =>
    {
        column.Spacing(25);

        foreach (var i in Enumerable.Range(0, 100))
            column.Item().Background(Colors.Grey.Lighten2).Height(75);
    });
});
```

![example](/api-reference/page-background-foreground.png =300x)

## Page settings

It is possible to put pages of various settings within the single document. Please notice that the example below declares two consecutive page sizes (A4 and A3) with various margin values:

```csharp{10-13,21-24}
public class StandardReport : IDocument
{
    // metadata

    public void Compose(IDocumentContainer container)
    {
        container
            .Page(page =>
            {
                page.MarginVertical(80);
                page.MarginHorizontal(100);
                page.PageColor(Colors.Grey.Medium); // transparent is default
                page.Size(PageSizes.A3);
                    
                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeBigContent);
                page.Footer().AlignCenter().PageNumber();
            })
            .Page(page =>
            {
                // you can specify multiple page types in the document
                // with independent configurations
                page.Margin(50)
                page.Size(PageSizes.A4);
                    
                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeSmallContent);
                page.Footer().AlignCenter().PageNumber();
            });
    }

    // content implementation
}
```

You easily change page orientation:
```csharp
// default is portrait
page.Size(PageSizes.A3);

// explicit portrait orientation
page.Size(PageSizes.A3.Portrait());

// change to landscape orientation
page.Size(PageSizes.A3.Landscape());
```

## Continuous page size

It is possible to define a page size with known width but dynamic height. In this example, the resulting page has constant width equal to A4 page's width, but its height depends on the content:

```csharp{13}
public class StandardReport : IDocument
{
    // metadata

    public void Compose(IDocumentContainer container)
    {
        container
            .Page(page =>
            {
                page.MarginVertical(40);
                page.MarginHorizontal(60);
                
                page.ContinuousSize(PageSizes.A4.Width);
                    
                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeContent);
                page.Footer().AlignCenter().PageNumber();
            });
    }

    // content implementation
}
```

::: danger
Because of the practical layout limitations, the maximum page height is limited to 14400 points (around 5 meters).
:::

## Global text style

The QuestPDF library provides a default set of styles that applied to text.

```csharp
.Text("Text with library default styles")
```

You can adjust the text style by providing additional argument:

```csharp
.Text("Red semibold text of size 20").FontSize(20).SemiBold()
```

The option above introduces overrides the default style. To get more control you can set a default text style in your document. Please notice that all changes are additive:

```csharp{9-10,22-23,27-28}
public class SampleReport : IDocument
{
    public DocumentMetadata GetMetadata() => new DocumentMetadata();

    public void Compose(IDocumentContainer container)
    {
        container.Page(page =>
        {
            // all text in this set of pages has size 20
            page.DefaultTextStyle(TextStyle.Default.FontSize(20));
            
            page.Margin(20);
            page.Size(PageSizes.A4);
            page.PageColor(Colors.White);

            page.Content().Column(column =>
            {
                column.Item().Text(Placeholders.Sentence());
                
                column.Item().Text(text =>
                {
                    // text in this block is additionally semibold
                    text.DefaultTextStyle(x => x.SemiBold());

                    text.Line(Placeholders.Sentence());
                    
                    // this text has size 20 but also semibold and red
                    text.Span(Placeholders.Sentence()).FontColor(Colors.Red.Medium);
                });
            });
        });
    }
}
```

![example](/patterns-and-practices/global-text-style.png =595x)

## Global content direction (RTL)

Most languages (such as English, German, Polish, etc.) are using the left-to-right writing direction. However, there are languages (e.g. Arabic) that use the right-to-left content direction. 

The RTL mode applies to many elements in the document layout:
1) Text position (aligned to the right).
2) Text direction where text starts on the right side and ends on the left side.
3) Text word-wrapping algorithm that needs to take into account direction of text when breaking a line.
4) Order of elements in collections, e.g. the first item in a row should be placed most to the right (in RTL) or to the left (int LTR).
5) Default content position (aligned to the right).

It is possible to enable the RTL mode globally in the document:

```csharp{7}
document.Page(page =>
{
    page.Size(PageSizes.A5);
    page.Margin(20);
    page.PageColor(Colors.White);
    
    page.ContentFromRightToLeft();
    
    page.Content().Column(column =>
    {
        column.Spacing(20);
        
        // in RTL: elements are ordered from right to left
        column.Item().Row(row =>
        {
            row.Spacing(10);
            
            row.AutoItem().AlignMiddle().Width(20).Height(20).Image(Placeholders.Image);
            
            // text automatically detects the type of content: LTR vs RTL 
            row.RelativeItem()
                .Text("Document title")
                .FontSize(24).FontColor(Colors.Blue.Accent1).SemiBold();
        });
        
        // in RTL: elements are ordered from right to left, top to bottom
        column.Item().Table(table =>
        {
            table.ColumnsDefinition(columns =>
            {
                columns.RelativeColumn();
                columns.RelativeColumn();
                columns.RelativeColumn();
                columns.RelativeColumn();
            });

            foreach (var i in Enumerable.Range(0, 9))
            {
                var width = (i % 4 == 0) ? 2 : 1;

                table
                    .Cell()
                    .ColumnSpan((uint)width)
                    .Background(i % 4 == 0 ? Colors.Grey.Lighten1 : Colors.Grey.Lighten2)
                    .Padding(5)
                    .AlignCenter()
                    .Text(i)
                    .FontSize(20);
            }
        });
    });
```

The result with left-to-right content direction:

![example](/api-reference/page-content-direction-ltr.png =420x)

The result with right-to-left content direction:

![example](/api-reference/page-content-direction-rtl.png =420x)
