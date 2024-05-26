# Border

- This container renders a border around the area provided by its parent.
- Use multiple invocations to specify the thickness and colour of the border.
- The border is virtual; it does not take space, nor move its child.

```c#
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

## Simple example

```c#{3-7}
.Padding(25)

.BorderLeft(6)
.BorderTop(9)
.BorderRight(12)
.BorderBottom(15)
.BorderColor(Colors.Green.Darken3)

.Background(Colors.Grey.Lighten2)

.AlignCenter()
.AlignMiddle()
.Text("Text")
.FontSize(20);
```

![example](/api-reference/border-simple.png =200x)


## Specifying multiple borders

Use the `Container` API to divide multiple border configurations:

```c#{6}
.Padding(25)

.BorderTop(5)
.BorderColor(Colors.Blue.Darken1)

.Container()

.BorderBottom(5)
.BorderColor(Colors.Green.Darken1)

.Background(Colors.Grey.Lighten2)

.AlignCenter()
.AlignMiddle()
.Text("Text")
.FontSize(20);
```

![example](/api-reference/border-separate.png =200x)