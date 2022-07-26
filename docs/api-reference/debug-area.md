# Debug area

- This container can be used to inspect space taken by its children.
- It does not alter document's layout.

```csharp
// You can specify text and color,
// to better distinguish between various debug elements:
.Debug("Grid example", Colors.Blue.Medium)

// You can skip color, by default it is red:
.Debug("Grid example")

// Or use default style:
.Debug()
```

Example:

```csharp{4}
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

![example](/images/api-reference/debug.png =420x)