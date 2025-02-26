# Code pattern: document code structure

Organizing your code effectively is crucial for maintainability and readability. 
A recommended approach is to encapsulate your document generation within a single class, while breaking down the document structure into well-named private methods.

This pattern allows you to separate the overall document structure from the implementation details of individual sections, making your code more modular and easier to maintain as your documents grow in complexity.

```c#{16-25}
public class MyReport
{
    public byte[] GenerateReport()
    {
        return Document
            .Create(document =>
            {
                document.Page(page =>
                {
                    page.Size(PageSizes.A5);
                    page.DefaultTextStyle(x => x.FontSize(20));
                    page.Margin(25);

                    page.Content()
                        .PaddingBottom(15)
                        .Column(column =>
                        {
                            column.Item().Element(ReportTitle);
                            column.Item().PageBreak();
                            column.Item().Element(RedSection);
                            column.Item().PageBreak();
                            column.Item().Element(GreenSection);
                            column.Item().PageBreak();
                            column.Item().Element(BlueSection);
                        });

                    page.Footer().AlignCenter().Text(text => text.CurrentPageNumber());
                });
            })
            .GeneratePdf();
    }

    private void ReportTitle(IContainer container)
    {
        container.Extend()
            .AlignCenter()
            .AlignMiddle()
            .Text("Multi-section report")
            .FontSize(48)
            .Bold();
    }
    
    // dumb implementation of different document sections
    
    private void RedSection(IContainer container)
    {
        container.Grid(grid =>
        {
            grid.Columns(3);
            grid.Spacing(15);
            
            grid.Item(3 ).Text("Red section")
                .FontColor(Colors.Red.Darken2).FontSize(32).Bold();

            grid.Item(3).Text(Placeholders.Paragraph()).Light();

            foreach (var i in Enumerable.Range(0, 6))
                grid.Item().AspectRatio(4 / 3f).Background(Colors.Red.Lighten4);
        });
    }
    
    private void GreenSection(IContainer container)
    {
        container.Grid(grid =>
        {
            grid.Columns(3);
            grid.Spacing(15);
            
            grid.Item(3).Text("Green section")
                .FontColor(Colors.Green.Darken2).FontSize(32).Bold();

            grid.Item(3).Text(Placeholders.Paragraph()).Light();

            foreach (var i in Enumerable.Range(0, 12))
                grid.Item().AspectRatio(4 / 3f).Background(Colors.Green.Lighten4);
        });
    }
    
    private void BlueSection(IContainer container)
    {
        container.Grid(grid =>
        {
            grid.Columns(3);
            grid.Spacing(15);
            
            grid.Item(3).Text("Blue section")
                .FontColor(Colors.Blue.Darken2).FontSize(32).Bold();

            grid.Item(3).Text(Placeholders.Paragraph()).Light();

            foreach (var i in Enumerable.Range(0, 18))
                grid.Item().AspectRatio(4 / 3f).Background(Colors.Blue.Lighten4);
        });
    }
}
```

<object data="/patterns-and-practices/code-pattern-document-structure.pdf" type="application/pdf" class="pdf-viewer">
  <p>Unable to display PDF file. <a href="/patterns-and-practices/code-pattern-document-structure.pdf">Download</a> instead.</p>
</object>
