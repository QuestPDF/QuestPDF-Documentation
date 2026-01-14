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

![example](/api-reference/column-simple.webp)


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

![example](/api-reference/column-spacing.webp)

<br>

Optionally, you can specify the unit value (default is `Unit.Points`).

```c#
column.Spacing(5, Unit.Millimeters);
```

<!--@include: tip-unit.md--> 


## Custom spacing

You can adjust the spacing between items individually by adding an empty item with a specific height.

```c#
.Column(column =>
{
    column.Item().Background(Colors.Grey.Darken1).Height(50);
    column.Item().Height(10);
    column.Item().Background(Colors.Grey.Medium).Height(50);
    column.Item().Height(20);
    column.Item().Background(Colors.Grey.Lighten1).Height(50);
    column.Item().Height(30);
    column.Item().Background(Colors.Grey.Lighten2).Height(50);
});
```

![example](/api-reference/column-spacing-custom.webp)


## Uniform item width

By default, all items in a Column match the width of the widest item.
This ensures consistent visual alignment, but sometimes it can result in unwanted visual stretching.

To disable this behavior, use the `ShrinkHorizontal` API:

```c#{12}
.Column(column =>
{
    column.Spacing(15);
    
    column.Item()
        .Element(LabelStyle)
        .Text("REST API");
    
    column.Item()
        .Element(LabelStyle)
        .Text("Garbage Collection");
    
    column.Item()
        .Element(LabelStyle)
        .Text("Object-Oriented Programming");
    
    // use helper method to apply the same style to all labels
    static IContainer LabelStyle(IContainer container) => container
        .ShrinkHorizontal()
        .Background(Colors.Grey.Lighten3)
        .CornerRadius(15)
        .Padding(15);
});
```

#### Default behavior (consistent item width)

![example](/api-reference/column-uniform-width-enabled.webp)

#### Effect with ShrinkVertical applied

![example](/api-reference/column-uniform-width-disabled.webp)
