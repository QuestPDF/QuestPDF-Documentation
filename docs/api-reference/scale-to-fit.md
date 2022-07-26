# Scale to fit

This container attempts to scale down its child, so it fits in the available space. This approach is useful when your content usually fits in the available space. For special situations, instead of wrapping the content to the next page or causing the infinite layout exception, it may make the content a little smaller to preserve the document look and feel.

```csharp{13-15}
.Padding(25)
.Column(column =>
{
    var text = Placeholders.Paragraph();

    foreach (var i in Enumerable.Range(2, 5))
    {
        column
            .Item()
            .MinimalBox()
            .Border(1)
            .Padding(5)
            .Width(i * 40) // sizes from 80x40 to 240x120
            .Height(i * 20)
            .ScaleToFit()
            .Text(text);
    }
});
```

![example](/images/api-reference/scale-to-fit.png =275x)

::: danger
Please notice that this component scales the available space. That means that you may still encounter situations where the child does not fit, e.g. when a child tries to enforce a specific aspect ratio.

The process performs a binary search algorithm - in some cases may cause performance issues.
:::