---
outline: false
---


# Border

The Border element adds a solid border around its content with configurable thickness and color. 
It's commonly used to visually separate or highlight content sections.

It is virtual and doesn't affect layout calculations or content positioning. 
Half of the border thickness extends inward from the content edge, and half extends outward.

## API

### Thickness

| Method               | Description                                                |
|----------------------|------------------------------------------------------------|
| **Border**           | Sets a uniform border (all edges) for its content.         |
| **BorderVertical**   | Sets a vertical border (left and right) for its content.   |
| **BorderHorizontal** | Sets a horizontal border (top and bottom) for its content. |
| **BorderLeft**       | Sets a border on the left side of its content.             |
| **BorderRight**      | Sets a border on the right side of its content.            |
| **BorderTop**        | Sets a border on the top side of its content.              |
| **BorderBottom**     | Sets a border on the bottom side of its content.           |

Each method requires a thickness value as a parameter. Optionally, you can specify the unit value (default is `Unit.Points`).

```c#
container.Border(1);
container.Border(1, Unit.Millimeters);
```

<!--@include: tip-unit.md--> 


### Color

| Method          | Description                          |
|-----------------|--------------------------------------|
| **BorderColor** | Adjusts color of the border element. |

<!--@include: tip-color.md-->


## Example

### Simple border

```c#{4-8}
container
    .Width(150)
    .Padding(25)  
    .BorderLeft(4)
    .BorderTop(6)
    .BorderRight(8) 
    .BorderBottom(10)
    .BorderColor(Colors.LightBlue.Darken3)
    .Background(Colors.Grey.Lighten3)
    .Padding(25) 
    .Text("Text");
```

![example](/api-reference/border-simple.webp =150x)


### Multiple borders

Use the `Container` method to apply multiple borders to the same content.

```c#{5-6,8,10-11}
container
    .Width(150)
    .Padding(25)

    .BorderTop(5)
    .BorderColor(Colors.LightBlue.Darken3)

    .Container()

    .BorderBottom(10)
    .BorderColor(Colors.LightBlue.Darken1)
    
    .Background(Colors.Grey.Lighten3)
    .Padding(25)
    .Text("Text")
    .FontSize(20);
```

![example](/api-reference/border-many.webp =150x)
