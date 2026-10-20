---
outline: false
---


# Debug area

The DebugArea element helps you visually debug document layouts by drawing a labeled box around its content. 
This aids in understanding spacing, alignment and pinpointing specific sections of the document during development.

<!--@include: tip-debugging.md--> 


## API

You can specify text and color to better distinguish between various debug elements:

```csharp{2}
container
    .DebugArea("Grid example", Colors.Blue.Medium)
    // content
```

It is also possible to skip the color (it is red by default), and even the label:

```csharp
.DebugArea("Grid example")
.DebugArea()
```

<!--@include: tip-color.md--> 

## Example

```csharp{5}
container
    .Width(250)
    .Height(250)
    .Padding(25)
    .DebugArea("Grid example", Colors.Blue.Medium)
    .Column(column =>
    {
        column.Spacing(5);

        foreach (var itemsInRow in new[] { 3, 3, 2 })
        {
            column.Item().Row(row =>
            {
                row.Spacing(5);

                foreach (var _ in Enumerable.Range(0, itemsInRow))
                    row.RelativeItem().Height(50).Placeholder();

                if (itemsInRow < 3)
                    row.RelativeItem(3 - itemsInRow);
            });
        }
    });
```

![example](/api-reference/debug-area.webp)