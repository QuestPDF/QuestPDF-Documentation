# Layers

- This element allows putting elements below and above the main content.
- The paging algorithm is driven by the PrimaryLayer.
- You need to specify exactly one PrimaryLayer.

```csharp
.Layers(layers =>
{
    // layer below main content
    layers
        .Layer()
        .Height(100)
        .Width(100)
        .Background(Colors.Grey.Lighten3);

    layers
        .PrimaryLayer()
        .Padding(25)
        .Column(column =>
        {
            column.Spacing(5);

            foreach (var _ in Enumerable.Range(0, 7))
                column.Item().Text(Placeholders.Sentence());
        });

    // layer above the main content    
    layers
        .Layer()
        .AlignCenter()
        .AlignMiddle()
        .Text("Watermark")
        .FontSize(48).Bold().FontColor(Colors.Green.Lighten3);

    layers
        .Layer()
        .AlignBottom()
        .PageNumber("Page {number}")
        .FontSize(16).FontColor(Colors.Green.Medium);
});
```

![example](/api-reference/layers-1.png =400x)
![example](/api-reference/layers-2.png =400x)
