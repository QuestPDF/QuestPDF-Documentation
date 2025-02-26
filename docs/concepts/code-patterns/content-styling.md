# Code pattern: content styling

When designing PDF documents, many elements often share similar styles. 
Instead of repeating styling code for each element, encapsulating the styling logic into reusable functions can improve maintainability and readability.

By defining local functions, you can ensure consistency across multiple elements while reducing redundancy. 
Below is an example demonstrating this approach:

```c#
container.Table(table =>
{
    table.ColumnsDefinition(columns =>
    {
        columns.ConstantColumn(50);
        columns.RelativeColumn(1);
        columns.RelativeColumn(2);
    });
    
    table.Header(header =>
    {
        header.Cell().Element(Style).Text("#");
        header.Cell().Element(Style).Text("Product Name");
        header.Cell().Element(Style).Text("Description");

        IContainer Style(IContainer container)
        {
            return container
                .Background(Colors.Blue.Lighten5)
                .Padding(10)
                .DefaultTextStyle(TextStyle.Default.FontColor(Colors.Blue.Darken4).Bold());
        }
    });

    foreach (var i in Enumerable.Range(1, 5))
    {
        table.Cell().Element(Style).Text(i.ToString());
        table.Cell().Element(Style).Text(Placeholders.Label());
        table.Cell().Element(Style).Text(Placeholders.Sentence());
    }

    IContainer Style(IContainer container)
    { 
        return container
            .BorderTop(2)
            .BorderColor(Colors.Blue.Lighten3)
            .Padding(10);
    }
});
```

![example](/patterns-and-practices/code-pattern-content-styling.webp =650x)
