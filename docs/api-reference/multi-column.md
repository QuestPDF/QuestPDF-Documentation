# Multi Column Layout

A multi-column layout organizes content into vertical columns, similar to a newspaper or magazine layout.

This approach allows for efficient use of horizontal space and can improve readability, especially for wide containers or screens. The content flows from one column to the next, and the number of columns can be adjusted based on the container's width or specific design requirements.


::: warning
This layout is expensive to calculate and may cause significant performance reduction.
:::


## Example

```csharp
.MultiColumn(multiColumn =>
{
    // control number of columns, default is 2
    multiColumn.Columns(4);
    
    // control space between columns, default is 0
    multiColumn.Spacing(25);
    
    // set container primary content
    multiColumn
        .Content()
        .Column(column =>
        {
            column.Spacing(10);

            foreach (var sectionId in Enumerable.Range(0, 10))
            {
                foreach (var textId in Enumerable.Range(0, 3))
                    column.Item().Text(Placeholders.Paragraph()).Justify();

                foreach (var blockId in Enumerable.Range(0, 3))
                    column.Item().Width(50 + blockId * 10).Height(25).Background(Placeholders.BackgroundColor());
            }
        });
});
```

![example](/api-reference/multi-column.png =842x)

## Custom spacer

A custom spacer can be added between columns to create a visual separation. The spacer can be any layout element, such as a line or a text block.

```csharp{4,7-11}
.MultiColumn(multiColumn =>
{
        multiColumn.Columns(3);
        multiColumn.Spacing(25);
        multiColumn.BalanceHeight();
        
        multiColumn
            .Spacer()
            .AlignCenter()
            .LineVertical(2)
            .LineColor(Colors.Grey.Medium);
        
        multiColumn
            .Content()
            .Column(column =>
            {
                column.Spacing(10);

                foreach (var blockId in Enumerable.Range(0, 100))
                    column.Item().Height(50).Background(Placeholders.BackgroundColor());
            });
    });
```

![example](/api-reference/multi-column-spacer.png =420x)


## Balance height

Controls the content distribution across columns to achieve balanced heights:
- **When enabled:** content flow is adjusted to equalize column heights. Each column will have approximately the same height.
- **When disabled:** layout occupies the full vertical space. The last column may be shorter or empty, depending on content quantity.

```csharp{4}
.MultiColumn(multiColumn =>
{
    multiColumn.Columns(3);
    multiColumn.BalanceHeight(true); // enabled by default 
    multiColumn.Spacing(10);
    
    multiColumn
        .Content()
        .Column(column =>
        {
            column.Spacing(10);

            foreach (var sectionId in Enumerable.Range(0, 8))
                column.Item().Text(Placeholders.Paragraph());
        });
});
```

With `BalanceHeight(true)`:

![example](/api-reference/multi-column-balance-height-enabled.png =420x)

With `BalanceHeight(false)`:

![example](/api-reference/multi-column-balance-height-disabled.png =420x)