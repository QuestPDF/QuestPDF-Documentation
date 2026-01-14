# Table: Header And Foot

When working with larger tables that span multiple pages, it is often helpful to define a dedicated table header and footer. 
QuestPDF makes this straightforward: headers and footers are repeated on each page so readers can instantly understand the table context, even if content extends beyond one page. 

Keep in mind that header and footer rows are separate from the table’s main content rows, so they do not count toward your column structure or row indices in the body of the table.

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
            
            columns.ConstantColumn(80);
            columns.ConstantColumn(80);
            
            columns.ConstantColumn(80);
            columns.ConstantColumn(80);
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

#### Page 1:

![example](/api-reference/table-header-and-footer-0.webp)

#### Page 2:

![example](/api-reference/table-header-and-footer-1.webp)
