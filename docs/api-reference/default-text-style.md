# Default text style

For professional documents, it is important to keep consistent typography. At the same time, documents that contain many text elements (e.g. reports) may become troublesome to configure, even with techniques such as [global text styles](/api-reference/page#global-text-style) or [DSL extensions](/concepts/creating-dsl) (creating more complex structures defined as C# extension methods).

This element allows you to override text styles in all its children at once.

```csharp{1}
.DefaultTextStyle(x => x.Bold().Underline())
.Column(column =>
{ 
    column.Item().Text("Default style applies to all children");
    column.Item().Text("You can override certain styles").Underline(false).FontColor(Colors.Green.Darken2);
    
    column.Item().PaddingTop(10).Border(1).Grid(grid =>
    {
        grid.Columns(4);

        foreach (var i in Enumerable.Range(1, 16))
        {
            grid.Item()
                .Border(1)
                .BorderColor(Colors.Grey.Lighten1)
                .Background(Colors.Grey.Lighten3)
                .Width(50)
                .Height(50)
                .AlignCenter()
                .AlignMiddle()
                .Text(i)
                .FontSize(16 + i / 4);   
        }
    });
```

Please notice that this element extends existing styles with additional configuration. Those styles can be extended/overridden on later stages of the code.

![example](/images/api-reference/default-text-style.png =220x)