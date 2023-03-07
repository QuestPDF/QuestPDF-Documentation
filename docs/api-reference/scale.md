# Scale
- This component scales its children.
- The layout rules, such as available space is also scaled so that the container follows all size constraints.

```csharp
.Scale(2f)

.ScaleHorizontal(2f)
.ScaleVertical(2f)
```

Example:

```csharp{10}
.Column(column =>
{
    var scales = new[] { 0.75f, 1f, 1.25f, 1.5f };

    foreach (var scale in scales)
    {
        column
            .Item()
            .Border(1)
            .Scale(scale)
            .Padding(10)
            .Text($"Content with {scale} scale.")
            .FontSize(20);
    }
});
```

![example](/api-reference/scale.png =400x)
