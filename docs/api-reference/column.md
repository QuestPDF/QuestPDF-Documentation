---
outline: false
---


# Column

The Column element arranges content vertically, stacking items one below another. 

It supports paging functionality, allowing content to flow naturally across multiple pages when needed.
When required, child items are split across pages, ensuring that the content is not cut off.

## Basic usage

The Column element uses a lambda function to define its content. 
Inside the lambda, you can add multiple items using the `Item` method.

```c#{4-9}
container
    .Width(250)
    .Padding(25)
    .Column(column =>
    {
        column.Item().Background(Colors.Grey.Medium).Height(50);
        column.Item().Background(Colors.Grey.Lighten1).Height(75);
        column.Item().Background(Colors.Grey.Lighten2).Height(100);
    });
```

![example](/api-reference/column-simple.webp =250x)


## Spacing

You can adjust the vertical spacing between items using the `Spacing` method.

```c#{6}
container
    .Width(250)
    .Padding(25)
    .Column(column =>
    {
        column.Spacing(25);
        
        column.Item().Background(Colors.Grey.Medium).Height(50);
        column.Item().Background(Colors.Grey.Lighten1).Height(75);
        column.Item().Background(Colors.Grey.Lighten2).Height(100);
    });
```

![example](/api-reference/column-spacing.webp =250x)

<br>

Optionally, you can specify the unit value (default is `Unit.Points`).

```c#
column.Spacing(5, Unit.Millimeters);
```

<!--@include: tip-unit.md--> 
