---
outline: false
---


# Scale

| Method              | Description                                                                                                                                     |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **Scale**           | Scales its inner content proportionally.                                                                                                        |
| **ScaleHorizontal** | Scales the available horizontal space (along the X axis), causing content to appear expanded or squished, rather than simply larger or smaller. |
| **ScaleVertical**   | Scales the available vertical space (along the Y axis), causing content to appear expanded or squished, rather than simply larger or smaller.   |


### Scaling Factor

Values greater than one enlarge the content, while values less than one reduce it.

```c#{12}
container
    .Scale(1.5f)
    // enlarged content by 50%
```


### Interaction with Other Elements

Although this adjustment modifies the space available to its inner content, some elements might use their own strategies to fill that space.

For example, an Image with the <see cref="Infrastructure.ImageScaling.FitWidth" /> setting may retain its size, but its quality could vary based on the DPI setting.
In contrast, text will not only appear smaller or bigger; but also a different number of words may fit each line.


## Example

Please note that all content inside the container is scaled proportionally: including text, images, padding, etc.

```c#{12}
container
    .Width(300)
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
                .Text($"Content scale: {scale}")
                .FontSize(20);
        }
    });
```

![example](/api-reference/scale.webp =350x)
