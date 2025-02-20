# Line

The Line component allows you to render simple yet customizable vertical and horizontal lines within your layout. 

These lines can serve as visual dividers, helping to structure and improve the readability of your content. 
You can specify the thickness of the line and optionally customize its color.

## Vertical

Renders a vertical line with a specified thickness.

```c#{8-9}
container
    .Row(row =>
    {
        row.AutoItem().Text("Text on the left");
        
        row.AutoItem()
            .PaddingHorizontal(15)
            .LineVertical(3)
            .LineColor(Colors.Blue.Medium); // optional
        
        row.AutoItem().Text("Text on the right");
    });
```

![example](/api-reference/line-vertical.webp =360x)


## Horizontal

Renders a horizontal line with a specified thickness.

```c#{8-9}
container
    .Column(column =>
    {
        column.Item().Text("Text above the line");
        
        column.Item()
            .PaddingVertical(10)
            .LineHorizontal(2)
            .LineColor(Colors.Blue.Medium); // optional
        
        column.Item().Text("Text below the line");
    });
```

![example](/api-reference/line-horizontal.webp =215x)