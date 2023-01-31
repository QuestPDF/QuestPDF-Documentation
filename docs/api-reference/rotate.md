# Rotate

## Constrained
- This container changes content rotation in 90 degree increments.
- The content is always placed within the same space and size constraints.

There are two methods available: `.RotateLeft()` and `.RotateRight()`

Example:

```csharp{17-18}
.Padding(20)
.Grid(grid =>
{
    grid.Columns(2);
    grid.Spacing(10);
    
    foreach (var turns in Enumerable.Range(0, 4))
    {
        grid.Item()
            .Width(200)
            .Height(200)
            .Background(Colors.Grey.Lighten2)
            .Padding(10)
            .Element(element =>
            {
                foreach (var x in Enumerable.Range(0, turns))
                    element = element.RotateRight();

                return element;
            })
            .MinimalBox()
            .Background(Colors.White)
            .Padding(10)
            .Text($"Rotated {turns * 90}°")
            .FontSize(20);
    }
});
```

![example](/api-reference/rotate-constrained.png =350x)

## Free
- This container allows you to rotate its child by any specified angle (in degrees).
- The content is always placed within the same space and size constraints.
- The rendered child appears floating below or above other content.

Example:

```csharp{9}
.Padding(25)
.Background(Colors.Grey.Lighten2)

.AlignCenter()
.AlignMiddle()

.Background(Colors.White)

.Rotate(30)

.Width(100)
.Height(100)
.Background(Colors.Blue.Medium);
```

![example](/api-reference/rotate-free.png =300x)

You can apply an additional translation to change the rotation origin point:

```csharp{9-10,14-15}
.Padding(25)
.Background(Colors.Grey.Lighten2)

.AlignCenter()
.AlignMiddle()

.Background(Colors.White)

.TranslateX(50)
.TranslateY(50)

.Rotate(30)

.TranslateX(-50)
.TranslateY(-50)

.Width(100)
.Height(100)
.Background(Colors.Blue.Medium);
```

![example](/api-reference/rotate-free-origin.png =300x)