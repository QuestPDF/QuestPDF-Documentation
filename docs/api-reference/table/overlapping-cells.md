# Overlapping Cells

This example demonstrates how to create complex structures by overlapping multiple cells, spanning them across rows and columns, and applying dynamic styling.

```c#
.Border(1)
.BorderColor(Colors.Grey.Lighten1)
.Table(table =>
{
    table.ColumnsDefinition(columns =>
    {
        // hour column
        columns.ConstantColumn(60);
        
        // day columns
        foreach (var i in Enumerable.Range(0, 5))
            columns.RelativeColumn();
    });
    
    // even/odd columns background
    foreach (var column in Enumerable.Range(0, 7))
    {
        var backgroundColor = column % 2 == 0 ? Colors.Grey.Lighten3 : Colors.White;
        table.Cell().Column((uint)column).RowSpan(24).Background(backgroundColor); 
    }
    
    // hours and hour lines
    foreach (var hour in Enumerable.Range(6, 10))
    {
        table.Cell().Column(1).Row((uint)hour)
            .PaddingVertical(5).PaddingHorizontal(10).AlignRight()
            .Text($"{hour}");
        
        table.Cell().Row((uint)hour).ColumnSpan(6)
            .Border(1).BorderColor(Colors.Grey.Lighten1).Height(20);
    }
    
    // dates and day names
    foreach (var i in Enumerable.Range(0, 5))
    {
        table.Cell()
            .Column((uint) i + 2).Row(1).Padding(5)
            .Column(column =>
            {
                column.Item().AlignCenter().Text($"{17  + i}").FontSize(24).Bold();
                column.Item().AlignCenter().Text(dayNames[i]).Light();
            });
    }
    
    // standup events
    foreach (var i in Enumerable.Range(1, 4))
        AddEvent((uint)i, 8, 1, "Standup", Colors.Blue.Lighten4, Colors.Blue.Darken3);
    
    // other events
    AddEvent(2, 11, 2, "Interview", Colors.Red.Lighten4, Colors.Red.Darken3);
    AddEvent(3, 12, 3, "Demo", Colors.Red.Lighten4, Colors.Red.Darken3);
    AddEvent(5, 5, 17, "PTO", Colors.Green.Lighten4, Colors.Green.Darken3);

    void AddEvent(uint day, uint hour, uint length, string name, Color backgroundColor, Color textColor)
    {
        table.Cell()
            .Column(day + 1).Row(hour).RowSpan(length)
            .Padding(5).Background(backgroundColor).Padding(5)
            .AlignCenter().AlignMiddle() 
            .Text(name).FontColor(textColor);
    }
});
```

![example](/api-reference/table-overlapping-cells.webp)