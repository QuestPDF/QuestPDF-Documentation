# Column

- The Column element is a multi-element container. You can put any set of elements you want.
- The algorithm places element one underneath another. Each element may take the entire width.
- This container renders its elements on multiple pages when necessary.

```csharp
.Column(column =>
{
    column.Item().Background(Colors.Grey.Medium).Height(50);
    column.Item().Background(Colors.Grey.Lighten1).Height(100);
    column.Item().Background(Colors.Grey.Lighten2).Height(150);
});
```

![example](/images/api-reference/column.png =350x)

Use the Spacing property to add some space between elements:

```csharp
.Column(column =>
{
    column.Spacing(15);

    column.Item().Background(Colors.Grey.Medium).Height(50);
    column.Item().Background(Colors.Grey.Lighten1).Height(100);
    column.Item().Background(Colors.Grey.Lighten2).Height(150);
});
```

![example](/images/api-reference/column-spacing.png =350x)