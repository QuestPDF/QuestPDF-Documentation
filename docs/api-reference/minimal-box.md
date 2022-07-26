# Minimal box

The `MinimalBox` element loosens the size constraints provided by its parent. It makes sure that its child is rendered only with necessary space, no bigger.

```csharp{3-3}
.Border(4)
.BorderColor(Colors.Blue.Medium)
.MinimalBox()
.Background(Colors.Grey.Lighten2)
.Padding(15)
.Text("Test of the \n box element")
.FontSize(20);
```

Without using the `MinimalBox` element (notice that the text element takes entire space provided by its parent):

![example](/images/api-reference/minimal-box-without.png =300x)

With using the `MinimalBox` element (notice that the text element takes only necessary space):

![example](/images/api-reference/minimal-box-with.png =300x)