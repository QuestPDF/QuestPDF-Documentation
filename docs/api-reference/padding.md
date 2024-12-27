---
outline: false
---


# Padding

For positive values, the Padding element adds empty space around its content. 

```c#{3-5}
container
    .Width(250)
    .PaddingVertical(10)
    .PaddingLeft(20)
    .PaddingRight(40)
    .Background(Colors.Grey.Lighten2)
    .Text("Sample text");
```

![example](/api-reference/padding-simple.webp =250x)


## Negative padding

For negative values, it pushes content beyond the edges, increasing available space (similar to negative HTML margins).

```c#{3,5}
container
    .Width(250)
    .Padding(50)
    .Background(Colors.Grey.Lighten2)
    .PaddingHorizontal(-25)
    .Text("Sample text with negative padding");
```

![example](/api-reference/padding-negative.webp =250x)


## API

| Method                | Description                                                        |
|-----------------------|--------------------------------------------------------------------|
| **Padding**           | Adds empty space around its content.                               |
| **PaddingHorizontal** | Adds empty space horizontally (left and right) around its content. |
| **PaddingVertical**   | Adds empty space vertically (top and bottom) around its content.   |
| **PaddingTop**        | Adds empty space above its content.                                |
| **PaddingBottom**     | Adds empty space below its content.                                |
| **PaddingLeft**       | Adds empty space to the left of its content.                       |
| **PaddingRight**      | Adds empty space to the right of its content.                      |
