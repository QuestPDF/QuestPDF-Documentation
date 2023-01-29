# Border

- This container renders a border around the area provided by its parent.
- Use multiple invocations to specify the thickness and colour of the border.
- The border is virtual; it does not take space, nor move its child.

```csharp
// apply border around all sides
.Border(1)

// apply border along specified sides
.BorderVertical(2)
.BorderHorizontal(3)

.BorderLeft(4)
.BorderRight(5)
.BorderTop(6)
.BorderBottom(7)

// change colour of the border
.BorderColor("#00FF00")
.BorderColor(Colors.Green.Darken1)
```