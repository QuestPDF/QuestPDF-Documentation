# Cell Style Pattern

This code pattern provides a structured approach to styling individual table cells in a consistent and reusable manner. 
It allows for defining cell appearance, such as background color, padding, and text styling, ensuring a cohesive visual experience across the table.

```c#{16-23,39-49}
.Table(table =>
{
    table.ColumnsDefinition(columns =>
    {
        columns.RelativeColumn();
        columns.ConstantColumn(125);
        columns.ConstantColumn(125);
    });

    table.Header(header =>
    {
        header.Cell().Element(CellStyle).Text("Day");
        header.Cell().Element(CellStyle).AlignCenter().Text("Weather");
        header.Cell().Element(CellStyle).AlignRight().Text("Temp");

        static IContainer CellStyle(IContainer container)
        {
            return container
                .Background(Colors.Blue.Darken2)
                .DefaultTextStyle(x => x.FontColor(Colors.White).Bold())
                .PaddingVertical(8)
                .PaddingHorizontal(16);
        }
    });

    foreach (var i in Enumerable.Range(0, 7))
    {
        var weatherIndex = Random.Shared.Next(0, weatherIcons.Length);

        table.Cell().Element(CellStyle)
            .Text(new DateTime(2025, 2, 26).AddDays(i).ToString("dd MMMM"));
        
        table.Cell().Element(CellStyle).AlignCenter().Height(24)
            .Svg($"Resources/WeatherIcons/{weatherIcons[weatherIndex]}");
        
        table.Cell().Element(CellStyle).AlignRight()
            .Text($"{Random.Shared.Next(-10, 35)}°");

        IContainer CellStyle(IContainer container)
        {
            var backgroundColor = i % 2 == 0 
                ? Colors.Blue.Lighten5 
                : Colors.Blue.Lighten4;

            return container
                .Background(backgroundColor)
                .PaddingVertical(8)
                .PaddingHorizontal(16);
        }
    }
});
```

![example](/api-reference/table-cell-style.webp)