# Complex Graphics

QuestPDF supports various built-in drawing capabilities, but there may be times when you need to include more sophisticated or custom graphics in your PDF. 
One powerful way to achieve this is by embedding SVG content dynamically. 
This allows you to draw custom shapes, gradients, and other visual elements that go beyond available functionalities.


## Example

This example shows how to draw a rounded rectangle with a linear gradient behind text content.

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

![example](/api-reference/complex-graphics.webp =240x)
