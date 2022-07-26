# Ordered and bullet lists

Implementing lists is very simple with the `Column` and `Row` elements:

```csharp
.Column(column =>
{
    foreach (var i in Enumerable.Range(1, 8))
    {
        column.Item().Row(row =>
        {
            row.Spacing(5);
            row.AutoItem().Text($"{i}."); // text or image
            row.RelativeItem().Text(Placeholders.Sentence());
        });
    }
});
```

The result is as follows:

![example](/images/patterns-and-practices/ordered-list.png =500x)
