# Style inheritance

The `DefaultTextStyle` API allows you to define text styles that are automatically inherited by all child elements unless explicitly overridden. 

This hierarchical approach simplifies style management, ensuring consistency across document sections while enabling easy local customizations. 

It reduces repetitive code, enhances maintainability, and provides flexibility to adjust styles at different levels of the document structure.

```c#{1,11,34}
.DefaultTextStyle(style => style.FontSize(20))
.Column(column =>
{
    column.Spacing(10);
    
    column.Item().Text("Products").ExtraBold().Underline().DecorationThickness(2);
    
    column.Item().Text("Comments: " + Placeholders.Sentence());
    
    column.Item()
        .DefaultTextStyle(style => style.FontSize(14))
        .Table(table =>
        {
            table.ColumnsDefinition(columns =>
            {
                columns.ConstantColumn(30);
                columns.RelativeColumn(1);
                columns.RelativeColumn(2);
            });
    
            table.Header(header =>
            {
                header.Cell().Element(Style).Text("ID");
                header.Cell().Element(Style).Text("Name");
                header.Cell().Element(Style).Text("Description");

                IContainer Style(IContainer container)
                {
                    return container
                        .Background(Colors.Grey.Lighten3)
                        .BorderBottom(1)
                        .PaddingHorizontal(5)
                        .PaddingVertical(10)
                        .DefaultTextStyle(x => x.Bold().FontColor(Colors.Blue.Medium));
                }
            });

            foreach (var i in Enumerable.Range(0, 5))
            {
                table.Cell().Element(Style).Text(i.ToString()).Bold();
                table.Cell().Element(Style).Text(Placeholders.Label());
                table.Cell().Element(Style).Text(Placeholders.Sentence());
            }
        
            IContainer Style(IContainer container) => container.container.Padding(5);
        });
});
```

![example](/api-reference/text-style-inheritance.webp =600x)