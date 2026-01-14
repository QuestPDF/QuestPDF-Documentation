# Show once

The ShowOnce element provides fine-grained control over content rendering across multiple pages. 

By default, all elements are fully rendered once and do not repeat. 
However, in specific contexts such as headers, footers, or decorative elements positioned before and after content slots, elements may be repeated on every page. 
To prevent this automatic repetition, use the ShowOnce element.

<!--@include: tip-show-once-skip-once.md-->


### Example

The following example demonstrates how to use ShowOnce to create a professional invoice header that shows different content on the first page compared to subsequent pages:

```csharp{7,22}
container
    .Decoration(decoration =>
    {
        decoration.Before().Column(column =>
        {
            column.Item()
                .ShowOnce()
                .Row(row =>
                {
                    row.ConstantItem(80).AspectRatio(4 / 3f).Placeholder();
                    row.ConstantItem(10);
                    row.RelativeItem()
                        .AlignMiddle()
                        .Column(innerColumn =>
                        {
                            innerColumn.Item().Text("Invoice #1234").FontSize(24).Bold();
                            innerColumn.Item().Text($"Generated on {DateTime.Now:d}").FontSize(16).Light();
                        });
                });
            
            column.Item()
                .SkipOnce()
                .Text("Invoice #1234").FontSize(24).Bold();
        });
        
        // generate dummy content
        decoration.Content()
            .PaddingTop(15)
            .ExtendHorizontal()
            .Column(column =>
            {
                column.Spacing(10);
                
                foreach (var i in Enumerable.Range(1, 15))
                {
                    column.Item()
                        .Height(30)
                        .Background(Colors.Grey.Lighten3)
                        .AlignCenter()
                        .AlignMiddle()
                        .Text($"{i}");
                }
            });
    });
```

![example](/api-reference/show-once-0.webp)
![example](/api-reference/show-once-1.webp)
