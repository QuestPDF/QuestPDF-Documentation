---
outline: false
---


# Debug area

The DebugArea element helps you visually debug document layouts by drawing a labeled box around its content. 
This aids in understanding spacing, alignment and pinpointing specific sections of the document during development.

<!--@include: tip-debugging.md--> 


## API

You can specify text and color to better distinguish between various debug elements:

```c#{2}
container
    .Debug("Grid example", Colors.Blue.Medium)
    // content
```

It is also possible to skip the color (it is red by default), and even the label:

```c#{2,6}
container
    .Debug("Grid example")
    // content

container
    .Debug()
    // content
```

<!--@include: tip-color.md--> 

## Example

```c#{5}
container
    .Width(250)
    .Height(250)
    .Padding(25)
    .DebugArea("Grid example", Colors.Blue.Medium)
    .Grid(grid =>
    {
        grid.Columns(3);
        grid.Spacing(5);

        foreach (var _ in Enumerable.Range(0, 8))
            grid.Item().Height(50).Placeholder();
    });
```

![example](/api-reference/debug-area.webp =375x)