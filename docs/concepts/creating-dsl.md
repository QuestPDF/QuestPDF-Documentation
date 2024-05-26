# Creating a DSL

The existing Fluent API offers a clear and easy-to-understand way of describing a document's structure. When working on the document, you may find that many parts use similar styles, for example borders or backgrounds. This is especially so when you want to maintain document consistency. To make future modifications easy, you can reuse the styling code by extracting it into separate extension methods. This way, you can assign a meaningful name to a document's structure without increasing code complexity.

In the example below, we will create a simple table where label cells have a grey background, and value cells have a white background. First, let's create corresponding extension methods:

```c#
static class SimpleExtension
{
    private static IContainer Cell(this IContainer container, bool dark)
    {
        return container
            .Border(1)
            .Background(dark ? Colors.Grey.Lighten2 : Colors.White)
            .Padding(10);
    }
    
    // displays only text label
    public static void LabelCell(this IContainer container, string text) => container.Cell(true).Text(text).Medium();
    
    // allows you to inject any type of content, e.g. image
    public static IContainer ValueCell(this IContainer container) => container.Cell(false);
}
```

Now, you can employ the newly created domain-specific language (DSL) to build the table:

```c#
.Grid(grid =>
{
    grid.Columns(10);
    
    for(var i=1; i<=4; i++)
    {
        grid.Item(2).LabelCell(Placeholders.Label());
        grid.Item(3).ValueCell().Image(Placeholders.Image(200, 150));
    }
});
```

This example produces the following output:

![example](/patterns-and-practices/domain-specific-language.png =600x)

::: tip
Please note that this example only illustrates the concept of using extension methods to build custom API elements. You can use this approach to build and reuse more complex structures. For example, extension methods can take arguments.
:::
