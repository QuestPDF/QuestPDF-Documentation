# Page

This container consists of multiple page-related slots.

## Main slots

Main slots (`Header`, `Content` and `Footer`) can be used to specify page content:
- The `Header` element is always visible at the top of each page.
- The `Content` element is drawn on the space between the `Header` and the `Footer`.
- The `Footer` element is always visible at the bottom of each page.

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
Please be careful! When the combined heights of the header and footer elements is greater than the total page height, there is insufficient space for the content, in which case a layout exception is thrown.
:::

![example](/api-reference/page-example.png =298x)

## Watermark slots

The watermark slots (background and foreground) can be used to add content behind or in front of the main content, respectively.

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

Let's consider a more advanced example that adds additional visual elements on the side of actual content. This can be easily achieved with watermark slots:

```csharp{10-30}
document.Page(page =>
{
    const float horizontalMargin = 1.5f;
    const float verticalMargin = 1f;
    
    page.Size(PageSizes.A4);
    page.MarginVertical(verticalMargin, Unit.Inch);
    page.MarginHorizontal(horizontalMargin, Unit.Inch);

    page.Background()
        .PaddingVertical(verticalMargin, Unit.Inch)
        .RotateRight()
        .Decoration(decoration =>
        {
            decoration.Before().RotateRight().RotateRight().Element(DrawSide);
            decoration.Content().Extend();
            decoration.After().Element(DrawSide);

            void DrawSide(IContainer container)
            {
                container
                    .Height(horizontalMargin, Unit.Inch)
                    .AlignMiddle()
                    .Row(row =>
                    {   
                        row.AutoItem().PaddingRight(16).Text("COMPANY NAME").FontSize(16).FontColor(Colors.Red.Medium);
                        row.RelativeItem().PaddingTop(12).ExtendHorizontal().LineHorizontal(2).LineColor(Colors.Red.Medium);
                    });
            }
        });
    
    page.Content().Column(column =>
    {
        column.Spacing(25);

        foreach (var i in Enumerable.Range(1, 100))
            column.Item().Background(Colors.Grey.Lighten2).Height(75).AlignCenter().AlignMiddle().Text(i.ToString()).FontSize(16);
    });
});
```

That produces the following result:

![example](/api-reference/page-slots-advanced.png =595x)

## Page settings

It is possible to create a document containing pages having different settings. For example, the following code inserts an A4 page followed by an A3 page, both with different margins:

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

You easily change page orientation as illustrated below:

```csharp
// default is portrait
page.Size(PageSizes.A3);

// explicit portrait orientation
page.Size(PageSizes.A3.Portrait());

// change to landscape orientation
page.Size(PageSizes.A3.Landscape());
```

## Continuous page size

It is possible to define a page size with known width but dynamic height. In the following example, the resulting page has a constant width (equal to the width of an A4 page, but its height depends on the content:

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
Because of practical layout limitations, the maximum page height is limited to 14400 points (around 5 meters).
:::

## Global text style

The QuestPDF library provides a default set of styles that are applied to text.

```csharp
.Text("Text with library default styles")
```

You can adjust the text style by providing additional arguments:

```csharp
.Text("Red semibold text of size 20").FontSize(20).SemiBold()
```

The above option above overrides the default style. To get more control you can set a default text style in your document. Please notice that all changes are additive as shown in the following example

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

It is possible to globally specify content direction for entire documents. 

::: tip
To learn more about how the Content direction works, please read the documentation for the [ContentDirection](/api-reference/content-direction) element.
:::

```csharp
document.Page(page =>
{
    // default setting
    page.ContentFromLeftToRight();
    
    // optional RTL mode
    page.ContentFromRightToLeft();
});
```

A further example follows:

```csharp{8}
document.Page(page =>
{
    page.Size(PageSizes.A5);
    page.Margin(20);
    page.PageColor(Colors.White);
    
    page.DefaultTextStyle(x => x.FontFamily("Calibri").FontSize(20));
    page.ContentFromRightToLeft();
    
    page.Content().Column(column =>
    {
        column.Spacing(20);

        column.Item()
            .Text("مثال على الفاتورة") // example invoice
            .FontSize(32).FontColor(Colors.Blue.Darken2).SemiBold();
        
        column.Item().Table(table =>
        {
            table.ColumnsDefinition(columns =>
            {
                columns.RelativeColumn();
                columns.ConstantColumn(75);
                columns.ConstantColumn(100);
            });

            table.Cell().Element(HeaderStyle).Text("وصف السلعة"); // item description
            table.Cell().Element(HeaderStyle).Text("كمية"); // quantity
            table.Cell().Element(HeaderStyle).Text("سعر"); // price

            var items = new[]
            {
                "دورة البرمجة", // programming course
                "دورة تصميم الرسومات", // graphics design course
                "تحليل وتصميم الخوارزميات", // analysis and design of algorithms
            };
            
            foreach (var item in items)
            {
                var price = Placeholders.Random.NextDouble() * 100;
                                    
                table.Cell().Text(item);
                table.Cell().Text(Placeholders.Random.Next(1, 10));
                table.Cell().Text($"USD${price:F2}");
            }

            static IContainer HeaderStyle(IContainer x) => x.BorderBottom(1).PaddingVertical(5);
        });
    });
});
```

![example](/api-reference/page-content-direction-rtl.png =420x)
