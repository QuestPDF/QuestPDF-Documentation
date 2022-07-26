# Border

- This container renders border on the area provided by its parent.
- Use multiple invocations to specify the thickness and colour of the border.
- Border is virtual, it does not take space, nor move its child.

```csharp
// apply border on all sides
.Border(1)

// apply border on specified sides
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