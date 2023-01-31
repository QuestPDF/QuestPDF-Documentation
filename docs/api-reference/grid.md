# Grid

- The `Grid` element builds an entire layout based on multiple `Row` elements placed inside a `Column`.
- Space is divided into multiple columns (12 by default).
- Each item can take multiple columns.
- If there is not enough space for the item in a row, it is pushed to the next row.
- If there is more space than necessary, items can be aligned to the left, center or right.
- It is possible to insert space between elements.

```csharp
.Grid(grid =>
{
    grid.VerticalSpacing(15);
    grid.HorizontalSpacing(15);
    grid.AlignCenter();
    grid.Columns(10); // 12 by default

    grid.Item(6).Background(Colors.Blue.Lighten1).Height(50);
    grid.Item(4).Background(Colors.Blue.Lighten3).Height(50);

    grid.Item(2).Background(Colors.Teal.Lighten1).Height(70);
    grid.Item(3).Background(Colors.Teal.Lighten2).Height(70);
    grid.Item(5).Background(Colors.Teal.Lighten3).Height(70);

    grid.Item(2).Background(Colors.Green.Lighten1).Height(50);
    grid.Item(2).Background(Colors.Green.Lighten2).Height(50);
    grid.Item(2).Background(Colors.Green.Lighten3).Height(50);
});
```

![example](/api-reference/grid.png =400x)