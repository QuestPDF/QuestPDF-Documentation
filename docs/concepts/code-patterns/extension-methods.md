# Code pattern: extension methods

When you find yourself implementing the same styling or content patterns repeatedly across different documents, extension methods offer the perfect solution. 
They allow you to define your styling once and reuse it throughout your codebase, ensuring visual consistency while reducing duplication.

#### Defining extension methods

```c#
public static class TableExtensions
{
    private static IContainer TableCellStyle(this IContainer container, string backgroundColor)
    {
        return container
            .Border(1)
            .BorderColor(Colors.Black)
            .Background(backgroundColor)
            .Padding(10);
    }
    
    public static void TableLabelCell(this IContainer container, string text)
    {
        container
            .TableCellStyle(Colors.Grey.Lighten3)
            .Text(text)
            .Bold();
    }
    
    public static IContainer TableValueCell(this IContainer container)
    {
        return container.TableCellStyle(Colors.Transparent);
    }
}
```


#### Using extension methods

```c#
container
    .Border(1)
    .Table(table =>
    {
        table.ColumnsDefinition(columns =>
        {
            columns.RelativeColumn(2);
            columns.RelativeColumn(3);
            columns.RelativeColumn(2);
            columns.RelativeColumn(3);
        });
        
        table.Cell().TableLabelCell("Product name");
        table.Cell().TableValueCell().Text(Placeholders.Label());
        
        table.Cell().TableLabelCell("Description");
        table.Cell().TableValueCell().Text(Placeholders.Sentence());
        
        table.Cell().TableLabelCell("Price");
        table.Cell().TableValueCell().Text(Placeholders.Price());
        
        table.Cell().TableLabelCell("Date of production");
        table.Cell().TableValueCell().Text(Placeholders.ShortDate());
        
        table.Cell().ColumnSpan(2).TableLabelCell("Photo of the product");
        table.Cell().ColumnSpan(2).TableValueCell().AspectRatio(16 / 9f).Image(Placeholders.Image);
    });
```

![example](/patterns-and-practices/code-pattern-extension-methods.webp)
