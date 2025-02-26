# Execution order

QuestPDF uses a fluent API with method chaining to define your document's structure and appearance.
The execution order of these chained methods is strict, meaning that rearranging them may lead to different visual outcomes. 

```c#
container.Column(column =>
{
    column.Spacing(25);

    column.Item()
        .Border(1)
        .Background(Colors.Blue.Lighten4)
        .Padding(15)
        .Text("border → background → padding");
    
    column.Item()
        .Border(1)
        .Padding(15)
        .Background(Colors.Blue.Lighten4)
        .Text("border → padding → background");

    column.Item()
        .Background(Colors.Blue.Lighten4)
        .Padding(15)
        .Border(1)
        .Text("background → padding → border");
    
    column.Item()
        .Padding(15)
        .Border(1)
        .Background(Colors.Blue.Lighten4)
        .Text("padding → border → background");
});
```

![example](/patterns-and-practices/code-pattern-execution-order.webp =400x)
