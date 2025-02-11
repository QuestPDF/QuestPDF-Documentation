# Page settings

## Styling

It is possible to create a document containing pages having different settings. For example, the following code inserts an A4 page followed by an A3 page, both with different margins:

```c#{10-13,21-24}
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

```c#
// default is portrait
page.Size(PageSizes.A3);

// explicit portrait orientation
page.Size(PageSizes.A3.Portrait());

// change to landscape orientation
page.Size(PageSizes.A3.Landscape());
```

## Continuous page size

It is possible to define a page size with known width but dynamic height. In the following example, the resulting page has a constant width (equal to the width of an A4 page, but its height depends on the content:

```c#{13}
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

```c#
.Text("Text with library default styles")
```

You can adjust the text style by providing additional arguments:

```c#
.Text("Red semibold text of size 20").FontSize(20).SemiBold()
```

The above option above overrides the default style. To get more control you can set a default text style in your document. Please notice that all changes are additive as shown in the following example

```c#{9-10,22-23,27-28}
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

```c#
document.Page(page =>
{
    // default setting
    page.ContentFromLeftToRight();
    
    // optional RTL mode
    page.ContentFromRightToLeft();
});
```

A further example follows:

```c#{8}
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
