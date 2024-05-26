# Table

The `Table` element is one of the most complex layout-related algorithms available in the QuestPDF library. It can achieve more sophisticated structures than any combination of the `Row` and the `Column` elements. It also greatly reduces code complexity. However, it is slightly slower to compute.

## Basic usage

Please analyse this example showing how to create a simple Table instance:
1) You start with a column definition that describes the width of each column.
2) Then, you can place any number of items inside. Each item has a corresponding position (`Row` and `Column`).

```c#{4-10,13-16}
.Border(1)
.Table(table =>
{
    table.ColumnsDefinition(columns =>
    {
        columns.RelativeColumn();
        columns.RelativeColumn();
        columns.RelativeColumn();
        columns.RelativeColumn();
    });

    // by using custom 'Element' method, we can reuse visual configuration
    table.Cell().Row(1).Column(4).Element(Block).Text("A");
    table.Cell().Row(2).Column(2).Element(Block).Text("B");
    table.Cell().Row(3).Column(3).Element(Block).Text("C");
    table.Cell().Row(4).Column(1).Element(Block).Text("D");
    
    // for simplicity, you can also use extension method described in the "Extending DSL" section
    static IContainer Block(IContainer container)
    {
        return container
            .Border(1)
            .Background(Colors.Grey.Lighten3)
            .ShowOnce()
            .MinWidth(50)
            .MinHeight(50)
            .AlignCenter()
            .AlignMiddle();
    }
});
```

![example](/api-reference/table-basic-usage.png =220x)

## Automated cell placement

You don't need to specify the position of every cell. When the algorithm detects that the cell does not have an assigned location, it places it in the nearest possible location.

```c#{11-14}
.Table(table =>
{
    table.ColumnsDefinition(columns =>
    {
        columns.RelativeColumn();
        columns.RelativeColumn();
        columns.RelativeColumn();
        columns.RelativeColumn();
    });

    table.Cell().Row(1).Column(1).Element(Block).Text("A");
    table.Cell().Row(2).Column(2).Element(Block).Text("B");
    table.Cell().Element(Block).Text("C");
    table.Cell().Element(Block).Text("D");
    
    // the Block() method, that defines default cell style, is omitted
});
```

![example](/api-reference/table-partial-automated-cell-placement.png =220x)


## Column definitions

Just as with the `Row` element, you can define [columns of constant and relative sizes](/api-reference/row).

**Important:** this example uses extension methods presented in [the Extending DSL section](/concepts/creating-dsl).

```c#{5-11}
container
    .Padding(10)
    .Table(table =>
    {
        table.ColumnsDefinition(columns =>
        {
            columns.ConstantColumn(50);
            columns.ConstantColumn(100);
            columns.RelativeColumn(2);
            columns.RelativeColumn(3);
        });

        table.Cell().ColumnSpan(4).LabelCell("Total width: 300px");
        table.Cell().ValueCell("50px");
        table.Cell().ValueCell("100px");
        table.Cell().ValueCell("100px");
        table.Cell().ValueCell("150px");
    });
```

![example](/api-reference/table-columns-definition.png =320x)

## Row spans and column spans

Cells can span multiple rows and/or multiple columns:

```c#{11-19}
.Table(table =>
{
    table.ColumnsDefinition(columns =>
    {
        columns.RelativeColumn();
        columns.RelativeColumn();
        columns.RelativeColumn();
        columns.RelativeColumn();
    });

    table.Cell().RowSpan(2).ColumnSpan(2).Element(Block).Text("1");
    table.Cell().ColumnSpan(2).Element(Block).Text("2");
    table.Cell().Element(Block).Text("3");
    table.Cell().Element(Block).Text("4");
    table.Cell().RowSpan(2).Element(Block).Text("5");
    table.Cell().ColumnSpan(2).Element(Block).Text("6");
    table.Cell().RowSpan(2).Element(Block).Text("7");
    table.Cell().Element(Block).Text("8");
    table.Cell().Element(Block).Text("9");
    
    // the Block() method, that defines default cell style, is omitted
});
```

![example](/api-reference/table-spans.png =220x)

## Overlapping cells

Cells can overlap one another. This situation is possible when you manually assign a cell's location:

```c#{10-12}
.Table(table =>
{
    table.ColumnsDefinition(columns =>
    {
        columns.RelativeColumn();
        columns.RelativeColumn();
        columns.RelativeColumn();
    });

    table.Cell().Row(1).RowSpan(3).Column(1).ColumnSpan(3).Background(Colors.Grey.Lighten3).MinHeight(150);
    table.Cell().Row(1).RowSpan(2).Column(1).ColumnSpan(2).Background(Colors.Grey.Lighten1).MinHeight(100);
    table.Cell().Row(3).Column(3).Background(Colors.Grey.Darken1).MinHeight(50);
});
```

![example](/api-reference/table-overlapping-cells.png =170x)

## Extend last cells to table bottom

This feature is very useful when creating complex table structures that are likely to page. It applies a special rule to the last cells within each column, extending them in such a way that they end at the bottom of the table. This behavior may improve the appearance of your table.

```c#{11}
.Table(table =>
{
    table.ColumnsDefinition(columns =>
    {
        columns.RelativeColumn();
        columns.RelativeColumn();
        columns.RelativeColumn();
        columns.RelativeColumn();
    });
    
    table.ExtendLastCellsToTableBottom();

    table.Cell().Row(1).Column(1).Element(Block).Text("A");
    table.Cell().Row(3).Column(1).Element(Block).Text("B");
    table.Cell().Row(2).Column(2).Element(Block).Text("C");
    table.Cell().Row(3).Column(3).Element(Block).Text("D");
    table.Cell().Row(2).RowSpan(2).Column(4).Element(Block).Text("E");
    
    // the Block() method, that defines default cell style, is omitted
});
```

Please notice that block "C" ends along with the "B" and "D" blocks:

![example](/api-reference/table-extend-last-cells-to-table-bottom.png =220x)


## Report example

Please review the following example to understand how to design report-like document structures.

**Important:** this example uses extension methods presented in [the Extending DSL section](/concepts/creating-dsl).

```c#
.MinimalBox()
.Border(1)
.Table(table =>
{
    table.ColumnsDefinition(columns =>
    {
        columns.ConstantColumn(100);
        columns.RelativeColumn();
        columns.ConstantColumn(100);
        columns.RelativeColumn();
    });
    
    table.ExtendLastCellsToTableBottom();

    table.Cell().RowSpan(3).LabelCell("Project");
    table.Cell().RowSpan(3).ShowEntire().ValueCell(Placeholders.Sentence());

    table.Cell().LabelCell("Report number");
    table.Cell().ValueCell(i.ToString());
    
    table.Cell().LabelCell("Date");
    table.Cell().ValueCell(Placeholders.ShortDate());

    table.Cell().LabelCell("Inspector");
    table.Cell().ValueCell("Marcin Ziąbek");

    table.Cell().ColumnSpan(2).LabelCell("Morning weather");
    table.Cell().ColumnSpan(2).LabelCell("Evening weather");

    table.Cell().ValueCell("Time");
    table.Cell().ValueCell("7:13");

    table.Cell().ValueCell("Time");
    table.Cell().ValueCell("18:25");

    table.Cell().ValueCell("Description");
    table.Cell().ValueCell("Sunny");

    table.Cell().ValueCell("Description");
    table.Cell().ValueCell("Windy");

    table.Cell().ValueCell("Wind");
    table.Cell().ValueCell("Mild");

    table.Cell().ValueCell("Wind");
    table.Cell().ValueCell("Strong");

    table.Cell().ValueCell("Temperature");
    table.Cell().ValueCell("17°C");

    table.Cell().ValueCell("Temperature");
    table.Cell().ValueCell("32°C");

    table.Cell().LabelCell("Remarks");
    table.Cell().ColumnSpan(3).ValueCell(Placeholders.Paragraph());
});
```

![example](/api-reference/table-report-example.png =1125x)


## Table header / footer

It is also possible to define table headers and footers. If your table contains more content and spans multiple pages, header and footer elements are repeated on each page.

Please note that header and footer sections have their own set of rows - they do not count in the content section.

```c#{43-60}
var pageSizes = new List<(string name, double width, double height)>()
{
    ("Letter (ANSI A)", 8.5f, 11),
    ("Legal", 8.5f, 14),
    ("Ledger (ANSI B)", 11, 17),
    ("Tabloid (ANSI B)", 17, 11),
    ("ANSI C", 22, 17),
    ("ANSI D", 34, 22),
    ("ANSI E", 44, 34)
};

const int inchesToPoints = 72;

container
.Padding(10)
.MinimalBox()
.Border(1)
.Table(table =>
{
    IContainer DefaultCellStyle(IContainer container, string backgroundColor)
    {
        return container
            .Border(1)
            .BorderColor(Colors.Grey.Lighten1)
            .Background(backgroundColor)
            .PaddingVertical(5)
            .PaddingHorizontal(10)
            .AlignCenter()
            .AlignMiddle();
    }
    
    table.ColumnsDefinition(columns =>
    {
        columns.RelativeColumn();
        
        columns.ConstantColumn(75);
        columns.ConstantColumn(75);
        
        columns.ConstantColumn(75);
        columns.ConstantColumn(75);
    });
    
    table.Header(header =>
    {
        // please be sure to call the 'header' handler!
        
        header.Cell().RowSpan(2).Element(CellStyle).ExtendHorizontal().AlignLeft().Text("Document type");
            
        header.Cell().ColumnSpan(2).Element(CellStyle).Text("Inches");
        header.Cell().ColumnSpan(2).Element(CellStyle).Text("Points");
            
        header.Cell().Element(CellStyle).Text("Width");
        header.Cell().Element(CellStyle).Text("Height");
            
        header.Cell().Element(CellStyle).Text("Width");
        header.Cell().Element(CellStyle).Text("Height");

        // you can extend existing styles by creating additional methods
        IContainer CellStyle(IContainer container) => DefaultCellStyle(container, Colors.Grey.Lighten3); 
    });

    foreach (var page in pageSizes)
    {
        table.Cell().Element(CellStyle).ExtendHorizontal().AlignLeft().Text(page.name);
                
        // inches
        table.Cell().Element(CellStyle).Text(page.width);
        table.Cell().Element(CellStyle).Text(page.height);
                
        // points
        table.Cell().Element(CellStyle).Text(page.width * inchesToPoints);
        table.Cell().Element(CellStyle).Text(page.height * inchesToPoints);
                
        IContainer CellStyle(IContainer container) => DefaultCellStyle(container, Colors.White).ShowOnce(); 
    }
});
```

Page 1:

![example](/api-reference/table-header-1.png =500x)

Page 2:

![example](/api-reference/table-header-2.png =500x)
