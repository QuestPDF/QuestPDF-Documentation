# Row

- This container divides available space into individual columns.
- Columns can have a fixed size (provided in points) or be proportional.
- You can use pageable content inside each column.
- If the content of any column wraps, the entire container wraps.

```csharp
.Row(row =>
{
    row.ConstantItem(100)
        .Background("#DDD")
        .Padding(10)
        .ExtendVertical()
        .Text("This column is 100 points wide");

    row.RelativeItem()
        .Background("#BBB")
        .Padding(10)
        .Text("This column takes 1/3 of the available space");

    row.RelativeItem(2)
        .Background("#DDD")
        .Padding(10)
        .Text("This column takes 2/3 of the available space");
});
```

![example](/api-reference/row-example.png =740x)

You can specify the spacing between each column by using the `Spacing()` method:

```csharp
.Row(row =>
{
    row.Spacing(20);
    row.RelativeItem(2).Border(1).Background(Colors.Grey.Lighten1);
    row.RelativeItem(3).Border(1).Background(Colors.Grey.Lighten2);
    row.RelativeItem(4).Border(1).Background(Colors.Grey.Lighten3);
});
```

![example](/api-reference/row-spacing.png =370x)
