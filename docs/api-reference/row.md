---
outline: false
---


# Row

Draws a collection of elements horizontally.

It supports paging functionality, allowing content to flow naturally across multiple pages when needed.
When required, child items are split across pages, ensuring that the content is not cut off.


## Item Types

For a row element with a width of 100 points that has three items (a relative item of size 1, a relative item of size 5, and a constant item of size 10 points),
the items will occupy sizes of 15 points, 75 points, and 10 points respectively.

| Method           | Description                                                                                          |
|------------------|------------------------------------------------------------------------------------------------------|
| **ConstantItem** | Adds a new item to the row element with a specified constant size.                                   |
| **RelativeItem** | Adds a new item to the row element. This item occupies space proportionally to other relative items. |
| **AutoItem**     | Adds a new item to the row element. The size of this item adjusts based on its content.              |


For ConstantItem, you can optionally specify the unit value (default is `Unit.Points`).

```c#
row.ConstantItem(5, Unit.Centimetre);
```

<!--@include: tip-unit.md--> 


## Basic usage

The Row element uses a lambda function to define its content.
Inside the lambda, you can add multiple items using the `Item` method.

```c#{4,6,11,16}
container
    .Padding(25)
    .Width(325)
    .Row(row =>
    {
        row.ConstantItem(100)
            .Background(Colors.Grey.Medium)
            .Padding(10)
            .Text("100pt");

        row.RelativeItem()
            .Background(Colors.Grey.Lighten1)
            .Padding(10)
            .Text("75pt");

        row.RelativeItem(2)
            .Background(Colors.Grey.Lighten2)
            .Padding(10)
            .Text("150pt");
    });
```

![example](/api-reference/row-simple.webp =375x)


## Spacing

You can adjust the horizontal spacing between items using the `Spacing` method.

```c#{7}
container
    .Padding(25)
    .Width(220)
    .Height(50)
    .Row(row =>
    {
        row.Spacing(10);

        row.RelativeItem(2).Background(Colors.Grey.Darken1);
        row.RelativeItem(3).Background(Colors.Grey.Medium);
        row.RelativeItem(5).Background(Colors.Grey.Lighten1);
    });
```

![example](/api-reference/row-spacing.webp =270x)

<br>

Optionally, you can specify the unit value (default is `Unit.Points`).

```c#
row.Spacing(5, Unit.Millimeters);
```

<!--@include: tip-unit.md--> 


## Custom spacing

You can adjust the spacing between items individually by adding an empty ConstantItem with a specific width.

```c#
.Row(row =>
{
    row.RelativeItem().Background(Colors.Grey.Darken1);
    row.ConstantItem(10);
    row.RelativeItem().Background(Colors.Grey.Medium);
    row.ConstantItem(20);
    row.RelativeItem().Background(Colors.Grey.Lighten1);
    row.ConstantItem(30);
    row.RelativeItem().Background(Colors.Grey.Lighten2);
});
```

![example](/api-reference/row-spacing-custom.webp =250x)
