# Flip
- This container makes a mirror image of its child.
- The container follows all layout rules and size constraints, and enforces them upon its child.

```c#
.FlipOver()

.FlipHorizontal()
.FlipVertical()
```

Example:

```c#{16-20}
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
            .Background(Colors.Grey.Lighten3)
            .Padding(10)
            .Element(element =>
            {
                if (turns == 1 || turns == 2)
                    element = element.FlipHorizontal();

                if (turns == 2 || turns == 3)
                    element = element.FlipVertical();
                
                return element;
            })
            .MinimalBox()
            .Background(Colors.White)
            .Padding(10)
            .Text($"Flipped {turns}").FontSize(16);
    }
});
```

![example](/api-reference/flip.png =350x)