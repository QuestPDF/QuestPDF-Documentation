# Line

## Vertical

`LineVertical` is virtual - it occupies the entire available height but no width.

```c#{6}
.Padding(15)
.DefaultTextStyle(x => x.FontSize(16))
.Row(row =>
{
    row.AutoItem().Text("Left text");
    row.AutoItem().PaddingHorizontal(10).LineVertical(1).LineColor(Colors.Grey.Medium);
    row.AutoItem().Text("Right text");
});
```

![example](/api-reference/line-vertical.png =175x)

## Horizontal

`LineHorizontal` is virtual - it occupies the entire available width but no height.

```c#{7}
.Padding(15)
.MinimalBox()
.DefaultTextStyle(x => x.FontSize(16))
.Column(column =>
{
    column.Item().Text("Above text");
    column.Item().PaddingVertical(5).LineHorizontal(1).LineColor(Colors.Grey.Medium);
    column.Item().Text("Below text");
});
```

![example](/api-reference/line-horizontal.png =100x)