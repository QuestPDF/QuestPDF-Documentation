# Inlined

```csharp{16-24}
// this method just generates blocks with random size and color for examples below
void RandomBlock(IContainer container)
{
    container
        .Width(Placeholders.Random.Next(1, 5) * 20)
        .Height(Placeholders.Random.Next(1, 5) * 20)
        .Border(1)
        .BorderColor(Colors.Grey.Darken2)
        .Background(Placeholders.BackgroundColor());
}

// example usage:
.Padding(20)
.Border(1)
.Background(Colors.Grey.Lighten3)
.Inlined(inlined =>
{
    inlined.Spacing(20);
    inlined.AlignLeft();
    inlined.BaselineBottom();

    foreach (var _ in Enumerable.Range(0, 20))
        inlined.Item().Element(RandomBlock);
});
```

![example](/images/api-reference/inlined-left-bottom.png =400x)

Available spacing settings:
```csharp
.VerticalSpacing(30)
.HorizontalSpacing(40)

// sets both vertical and horizontal alignment
.Spacing(20)
```

Available horizontal alignments:
```csharp
.AlignLeft()
.AlignRight()
.AlignCenter()
.AlignJustify()
.AlignSpaceAround()
```

Available baseline alignments:
```csharp
.BaselineBottom()
.BaselineMiddle()
.BaselineTop()
```

More examples:
```csharp{3-5}
.Inlined(inlined =>
{
    inlined.Spacing(20);
    inlined.AlignJustify();
    inlined.BaselineMiddle();

    foreach (var _ in Enumerable.Range(0, 20))
        inlined.Item().Element(RandomBlock);
});
```
![example](/images/api-reference/inlined-justify-middle.png =400x)

```csharp{3-6}
.Inlined(inlined =>
{
    inlined.VerticalSpacing(50);
    inlined.HorizontalSpacing(20);
    inlined.AlignSpaceAround();
    inlined.BaselineTop();

    foreach (var _ in Enumerable.Range(0, 20))
        inlined.Item().Element(RandomBlock);
});
```

![example](/images/api-reference/inlined-space-around-top.png =400x)