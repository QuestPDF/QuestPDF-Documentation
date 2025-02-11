# Table

QuestPDF’s table component provides a robust, flexible way to create complex, dynamic layouts in your PDF documents.
Whether you need a basic grid or a detailed multi-page report with headers and footers, tables give you complete control over cell positioning, spanning, styling, and more.

## Introduction

The Table component in QuestPDF organizes content into rows and columns. 
You start by defining a set of columns and then proceed to add content to the cells in each row. 

Below is a simple example that demonstrates how to create a table with a header row and a few data rows:

```c#
.Table(table =>
{
    table.ColumnsDefinition(columns =>
    {
        columns.ConstantColumn(50);
        columns.RelativeColumn();
        columns.ConstantColumn(125);
    });

    table.Header(header =>
    {
        header.Cell().BorderBottom(2).Padding(8).Text("#");
        header.Cell().BorderBottom(2).Padding(8).Text("Product");
        header.Cell().BorderBottom(2).Padding(8).AlignRight().Text("Price");
    });
    
    foreach (var i in Enumerable.Range(0, 6))
    {
        var price = Math.Round(Random.Shared.NextDouble() * 100, 2);
         
        table.Cell().Padding(8).Text($"{i + 1}");
        table.Cell().Padding(8).Text(Placeholders.Label());
        table.Cell().Padding(8).AlignRight().Text($"${price}");
    }
});
```

![example](/api-reference/table-simple.webp =500x)


## Columns Definition

When building tables, one of the first steps is deciding how the columns should scale. 
QuestPDF provides two main column types:

| Column Type                | Description                                              |
|----------------------------|----------------------------------------------------------|
| table.**RelativeColumn()** | Adjusts its width proportionally to the available space. |
| table.**ConstantColumn()** | Has fixed width, defined in points (or other units.      |

```c#{3-8}
.Table(table =>
{
    table.ColumnsDefinition(columns =>
    {
        columns.ConstantColumn(150);
        columns.RelativeColumn(2);
        columns.RelativeColumn(3);
    });

    table.Cell().ColumnSpan(3)
        .Background(Colors.Grey.Lighten2).Element(CellStyle)
        .Text("Total width: 450px");
    
    table.Cell().Element(CellStyle).Text("Constant: 150px");
    table.Cell().Element(CellStyle).Text("Relative: 2*");
    table.Cell().Element(CellStyle).Text("Relative: 3*");
    
    table.Cell().Element(CellStyle).Text("150px");
    table.Cell().Element(CellStyle).Text("120px");
    table.Cell().Element(CellStyle).Text("180px");

    static IContainer CellStyle(IContainer container)
        => container.Border(1).Padding(10);
});
```

![example](/api-reference/table-columns-definition.webp =500x)


## Manual cell placement

QuestPDF provides an automatic cell placement mechanism that simplifies the process of creating tables.

For more advanced layout scenarios, it is possible to specify the exact position of each cell.
This allows you to place cells at specific locations, merge multiple rows or columns, and therefore craft sophisticated table layouts. 

```c#{3-6}
table
    .Cell()
    .Row(1) // optional
    .Column(2)  // optional
    .RowSpan(3)  // optional
    .ColumnSpan(4)  // optional
    .Text("Cell content");
```

Here’s an example showcasing a confusion matrix layout where cells are placed strategically:

```c#
.Table(table =>
{
    table.ColumnsDefinition(columns =>
    {
        columns.ConstantColumn(75);
        columns.ConstantColumn(150);
        columns.ConstantColumn(200);
        columns.ConstantColumn(200);
    });

    table.Cell().Row(1).Column(3).ColumnSpan(2)
        .Element(HeaderCellStyle)
        .Text("Predicted condition").Bold();
    
    table.Cell().Row(3).Column(1).RowSpan(2)
        .Element(HeaderCellStyle).RotateLeft()
        .Text("Actual\ncondition").Bold().AlignCenter();

    table.Cell().Row(2).Column(3)
        .Element(HeaderCellStyle)
        .Text("Positive (PP)");
    
    table.Cell().Row(2).Column(4)
        .Element(HeaderCellStyle)
        .Text("Negative (PN)");

    table.Cell().Row(3).Column(2)
        .Element(HeaderCellStyle).Text("Positive (P)");
    
    table.Cell().Row(4).Column(2)
        .Element(HeaderCellStyle)
        .Text("Negative (N)");

    table.Cell()
        .Row(3).Column(3).Element(GoodCellStyle)
        .Text("True positive (TP)");
    
    table.Cell()
        .Row(3).Column(4).Element(BadCellStyle)
        .Text("False negative (FN)");

    table.Cell().Row(4).Column(3)
        .Element(BadCellStyle).Text("False positive (FP)");
    
    table.Cell().Row(4).Column(4)
        .Element(GoodCellStyle).Text("True negative (TN)");

    static IContainer CellStyle(IContainer container, Color color)
        => container.Border(1).Background(color).PaddingHorizontal(10).PaddingVertical(15).AlignCenter().AlignMiddle();

    static IContainer HeaderCellStyle(IContainer container) 
        => CellStyle(container, Colors.Grey.Lighten4 );
    
    static IContainer GoodCellStyle(IContainer container) 
        => CellStyle(container, Colors.Green.Lighten4).DefaultTextStyle(x => x.FontColor(Colors.Green.Darken2));
    
    static IContainer BadCellStyle(IContainer container) 
        => CellStyle(container, Colors.Red.Lighten4).DefaultTextStyle(x => x.FontColor(Colors.Red.Darken2));
});
```

![example](/api-reference/table-manual-cell-placement.webp =675x)

