# Complex Graphics

QuestPDF supports various built-in drawing capabilities, but there may be times when you need to include more sophisticated or custom graphics in your PDF. 
One powerful way to achieve this is by embedding SVG content dynamically. 
This allows you to draw custom shapes, gradients, and other visual elements that go beyond available functionalities.


## Rounded Rectangle

This example shows how to draw a custom rectangle behind the text. 
It fills the available space, has rounded corners, and a gradient fill.

```c#{3-17}
.Layers(layers =>
{
    layers.Layer().Svg(size =>
    {
        return $"""
                <svg width="{size.Width}" height="{size.Height}" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop stop-color="#00E5FF" offset="0%"/>
                        <stop stop-color="#2979FF" offset="100%"/>
                      </linearGradient>
                    </defs>
                
                    <rect x="0" y="0" width="{size.Width}" height="{size.Height}" rx="{size.Height / 2}" ry="{size.Height / 2}" fill="url(#backgroundGradient)" />
                </svg>
                """;
    });

    layers.PrimaryLayer()
        .PaddingVertical(10)
        .PaddingHorizontal(20)
        .Text("QuestPDF")
        .FontColor(Colors.White)
        .FontSize(32)
        .ExtraBlack();
});
```

![example](/api-reference/complex-graphics-rounded-rectangle-with-gradient.webp =240x)


## Dotted Line

This example creates structure similar to a table of contents with dotted lines connecting the page numbers to the titles.

```c#{15-22}
.Column(column =>
{
    column.Spacing(5);
    
    foreach (var i in Enumerable.Range(1, 5))
    {
        var pageNumber = i * 7 + 4;
        
        column.Item().Row(row =>
        {
            row.AutoItem().Text($"{i}.");
            row.ConstantItem(10);
            row.AutoItem().Text(Placeholders.Label());

            row.RelativeItem().PaddingHorizontal(3).TranslateY(20).Height(2).Svg(size =>
            {
                return $"""
                        <svg width="{size.Width}" height="{size.Height}" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0" y1="0" x2="{size.Width}" y2="0" fill="none" stroke="black" stroke-width="2" stroke-dasharray="2 6" />
                        </svg>
                        """;
            });

            row.AutoItem().Text($"{pageNumber}");
        });
    }
});
```

![example](/api-reference/complex-graphics-dotted-line.webp =500x)
