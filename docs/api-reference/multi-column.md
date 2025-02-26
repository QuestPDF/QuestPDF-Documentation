---
outline: false
---


# Multi Column Layout

A multi-column layout arranges content into vertical columns, similar to newspaper or magazine formatting. 
This approach optimizes horizontal space and enhances readability, especially for wide containers or screens. 

::: warning
Multi-column layouts require significant computational resources, which may impact performance.
:::


## Example

**The Content() method** provides access to the container where your primary content will be distributed across multiple columns.
This container serves as the main content area for your multi-column layout and supports all available layout elements.

**The Columns() method** defines the number of vertical columns in your layout. 
This setting establishes the basic structure of the grid layout.

**The Spacing() method** configures the horizontal space between adjacent columns. 
This setting affects the visual presentation of your column arrangement. 
Positive values increase separation between columns, while negative values may cause overlap (though this is rarely desirable).

```c#
container.MultiColumn(multiColumn =>
{
    multiColumn.Columns(3);
    multiColumn.Spacing(25);

    multiColumn
        .Content()
        .Column(column =>
        {
            column.Spacing(15);

            foreach (var sectionId in Enumerable.Range(0, 3))
            {
                foreach (var textId in Enumerable.Range(0, 3))
                    column.Item().Text(Placeholders.Paragraph()).Justify();

                column.Item().AspectRatio(21 / 9f).Image(Placeholders.Image);
            }
        });
});
```

![example](/api-reference/multicolumn-example.webp =650x)


## Spacer

Use the Spacer approach to create a visual break between content sections, improving readability and aesthetics.
The container's dimensions are determined by the height of the columns and the configured spacing. 
It supports all available layout elements.

```c#{6-10}
container.MultiColumn(multiColumn =>
{
    multiColumn.Columns(2);
    multiColumn.Spacing(50);

    multiColumn
        .Spacer()
        .AlignCenter()
        .LineVertical(2)
        .LineColor(Colors.Grey.Medium);
    
    multiColumn
        .Content()
        .Column(column =>
        {
            column.Spacing(15);

            foreach (var textId in Enumerable.Range(0, 5))
                column.Item().Text(Placeholders.Paragraph()).Justify();
        });
});
```

![example](/api-reference/multicolumn-spacer.webp =450x)



## Balance height

The BalanceHeight() method controls how content is distributed across columns. 
This feature helps create a more aesthetically pleasing and professional layout by ensuring columns have similar heights.

```c#{4}
container.MultiColumn(multiColumn =>
{
    multiColumn.Spacing(30);
    multiColumn.BalanceHeight();

    multiColumn
        .Content()
        .Column(column =>
        {
            column.Spacing(15);
            
            foreach (var textId in Enumerable.Range(0, 8))
                column.Item().Text(Placeholders.Paragraph()).Justify();
        });
});
```


#### BalanceHeight disabled

The layout occupies the entire vertical space, often leaving the last column shorter or empty if there is less content to fill it.

![example](/api-reference/multicolumn-balance-height-without.webp =396x)


#### BalanceHeight enabled

The layout engine distributes elements so that each column ends up with approximately the same height.

![example](/api-reference/multicolumn-balance-height-with.webp =396x)
