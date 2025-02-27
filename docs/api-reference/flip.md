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

```c#{12}
container.Column(column =>
{
    column.Spacing(15);

    column.Item()
        .Text("Read the message below by putting a mirror on the right side of the screen.");
    
    column.Item()
        .AlignLeft()
        .Background(Colors.Red.Lighten5)
        .Padding(10)
        .FlipHorizontal()
        .Text("This is a secret message.")
        .FontColor(Colors.Red.Darken2);
});
```

![example](/api-reference/flip.webp =350x)