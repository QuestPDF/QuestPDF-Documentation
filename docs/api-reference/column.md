# Column

- The `Column` element is a multi-element container. You can add any elements you want to it.
- The algorithm places elements one underneath another. Each element may take the entire column width.
- This container renders its elements on multiple pages when necessary.

```c#
.Column(column =>
{
    column.Item().Background(Colors.Grey.Medium).Height(50);
    column.Item().Background(Colors.Grey.Lighten1).Height(100);
    column.Item().Background(Colors.Grey.Lighten2).Height(150);
});
```

![example](/api-reference/column.png =350x)

Use the `Spacing` method to add some space between elements:

```c#
.Column(column =>
{
    column.Spacing(15);

    column.Item().Background(Colors.Grey.Medium).Height(50);
    column.Item().Background(Colors.Grey.Lighten1).Height(100);
    column.Item().Background(Colors.Grey.Lighten2).Height(150);
});
```

![example](/api-reference/column-spacing.png =350x)