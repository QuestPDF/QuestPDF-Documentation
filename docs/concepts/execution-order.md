# Execution order

QuestPDF uses FluentAPI and method chaining to describe document's content. It is very important to remember that the order of methods is strict. That means, in many cases, changing order of invocations will produce different results. To better understand this behavior, let's analyse this simple example:

```csharp{7-8,13-14}
.Row(row =>
{
    row.Spacing(25);

    row.RelativeItem()
        .Border(1)
        .Padding(15)
        .Background(Colors.Grey.Lighten2)
        .Text("Lorem ipsum");
    
    row.RelativeItem()
        .Border(1)
        .Background(Colors.Grey.Lighten2)
        .Padding(15)
        .Text("dolor sit amet");
});
```

![example](/patterns-and-practices/execution-order-1.png =400x)

This is another good example showing how applying padding changes available space:

```csharp
.Padding(25)
.Border(2)
.Width(150)
.Height(150)

.Background(Colors.Blue.Lighten2)
.PaddingTop(50)

.Background(Colors.Green.Lighten2)
.PaddingRight(50)

.Background(Colors.Red.Lighten2)
.PaddingBottom(50)

.Background(Colors.Amber.Lighten2)
.PaddingLeft(50)

.Background(Colors.Grey.Lighten2);
```

![example](/patterns-and-practices/execution-order-2.png =200x)