---
outline: false
---


# Flip

| Method             | Description                                                                                                                                                    |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **FlipHorizontal** | Flips its content to create a mirror image along the Y axis, swapping elements from left to right. Elements on the left will appear on the right.              |
| **FlipVertical**   | Flips its content to create a mirror image along the X axis, moving elements from the top to the bottom. Elements at the top will be positioned at the bottom. |
| **FlipOver**       | Creates a mirror image of its content across both axes. Elements originally in the top-left corner will be positioned in the bottom-right corner.              |


## Example

```c#{19-23}
container
    .Width(350)
    .Height(350)
    .Padding(20)
    .Grid(grid =>
    {
        grid.Columns(2);
        grid.Spacing(10);

        foreach (var turns in Enumerable.Range(0, 4))
        {
            grid.Item()
                .Width(150)
                .Height(150)
                .Background(Colors.Grey.Lighten2)
                .Padding(10)
                .Element(element =>
                {
                    if (turns == 1 || turns == 2)
                        element = element.FlipHorizontal();

                    if (turns == 2 || turns == 3)
                        element = element.FlipVertical();

                    return element;
                })
                .Shrink()
                .Background(Colors.White)
                .Padding(10)
                .Text($"Flipped {turns}").FontSize(16);
        }
    });
```

![example](/api-reference/flip.webp =350x)