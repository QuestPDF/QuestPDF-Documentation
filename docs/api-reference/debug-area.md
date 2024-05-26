# Debug area

- This container can be used to inspect the space taken by its children.
- The `Debug` container does not alter a document's layout.

```c#
// You can specify text and color,
// to better distinguish between various debug elements:
.Debug("Grid example", Colors.Blue.Medium)

// You can skip the color. By default it is red:
.Debug("Grid example")

// Or use default style:
.Debug()
```

Example:

```c#{4}
container
    .Padding(25)
    .Debug("Grid example", Colors.Blue.Medium)
    .Grid(grid =>
    {
        grid.Columns(3);
        grid.Spacing(5);

        foreach (var _ in Enumerable.Range(0, 8))
            grid.Item().Height(50).Placeholder();
    });
```

![example](/api-reference/debug.png =420x)