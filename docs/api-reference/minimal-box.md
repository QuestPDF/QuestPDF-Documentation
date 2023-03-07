# Minimal box

The `MinimalBox` element relaxes the size constraints provided by its parent. It makes sure that its child is rendered with the minimum necessary space only.

```csharp{3-3}
.Border(4)
.BorderColor(Colors.Blue.Medium)
.MinimalBox()
.Background(Colors.Grey.Lighten2)
.Padding(15)
.Text("Test of the \n box element")
.FontSize(20);
```

Without using the `MinimalBox` element, notice that the text element occupies the entire space provided by its parent, as shown below:

![example](/api-reference/minimal-box-without.png =300x)

With the `MinimalBox` element, notice that the text element takes the minimum necessary space only, as shown below:

![example](/api-reference/minimal-box-with.png =300x)