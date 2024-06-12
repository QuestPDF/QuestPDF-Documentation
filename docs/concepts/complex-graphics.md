# Complex graphics

While QuestPDF aims to support all typical use cases, it also provides a way to implement custom graphics. This section will guide you through the process of creating custom graphics.

We suggest using the dynamic SVG content to achieve the desired results. SVG is a powerful and flexible format that can be easily integrated into the PDF document.

The `Svg()` method provides the size of the available space as an argument. You can use this information to generate the SVG content dynamically.

```csharp
.Padding(25)
.Layers(layers =>
{
    layers.Layer().Svg(size =>
    {
        return $"""
                <svg width="{size.Width}" height="{size.Height}" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="{size.Width}" height="{size.Height}" rx="20" ry="20" style="stroke:black; stroke-width:2; stroke-dasharray:3,3,6,3; fill:#AACCEE;" />
                </svg>
                """;
    });

    layers.PrimaryLayer()
        .PaddingVertical(25)
        .PaddingHorizontal(50)
        .AlignCenter()
        .AlignMiddle()
        .Text("Text")
        .FontSize(20);
});
```

![example](/patterns-and-practices/complex-graphics.png =300x)

You can also extract the code into a separate method to make it more reusable:

```csharp
public static class ComplexBorderExtensions
{
    public static void DashedBorder(this IContainer container, Action<IContainer> content)
    {
        container.Layers(layers =>
        {
            layers.Layer().Svg(size =>
            {
                return $"""
                        <svg width="{size.Width}" height="{size.Height}" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="0" width="{size.Width}" height="{size.Height}" rx="20" ry="20" style="stroke:black; stroke-width:5; stroke-dasharray:5,5,10,5; fill:#AACCEE;" />
                        </svg>
                        """;
            });
            
            layers.PrimaryLayer()
                .AlignCenter()
                .AlignMiddle()
                .Text("Text")
                .FontSize(30);
        });
    }
}
```

And use it as follows:

```csharp
.Padding(25)
.DashedBorder(content =>
{
    content
        .AlignCenter()
        .AlignMiddle()
        .Text("Text")
        .FontSize(30);
});
```