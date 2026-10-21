# Layers

The Layers element adds content either underneath (as a background) or on top of (as a watermark) the main content.

The main layer supports paging, can span multiple pages, and determines the container's target length.
Additional layers can also span multiple pages: like the main layer, a long layer continues on the next page, but it is not repeated on each one. For content on every page, such as a watermark, use the page's [Background or Foreground slot](/api-reference/page/slots).

| Method           | Description                                      |
|------------------|--------------------------------------------------|
| **PrimaryLayer** | Sets the primary content for the container.      |
| **Layer**        | Specifies an additional layer for the container. |

::: warning
Exactly one `PrimaryLayer` must be defined.
:::

::: tip
The order of code execution determines the drawing order:
- If the layer is defined before the primary layer, it's drawn underneath the primary content (as a background).
- If defined after the primary layer, it's drawn in front of the primary content (as a watermark).
:::


### Example

A common use-case for this element is to add background content behind the main content.

```csharp{7-22}
.Column(column =>
{
    column.Item().PaddingBottom(15).Text("Proposed Business Card Design:").Bold();
    
    column.Item()
        .AspectRatio(4 / 3f)
        .Layers(layers =>
        {
            layers.Layer().Image("Resources/card-background.jpg").FitUnproportionally();

            layers.PrimaryLayer()
                .OffsetY(75)
                .Column(innerColumn =>
                {
                    innerColumn.Item()
                        .AlignCenter()
                        .Text("Horizon Ventures")
                        .Bold().FontSize(32).FontColor(Colors.Blue.Darken2);

                    innerColumn.Item().AlignCenter().Text("Your journey begins here");
                });
        });
});
```

![example](/api-reference/layers.webp)
