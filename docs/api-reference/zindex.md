---
outline: false
---


# Z-Index

By default, the library draws content in the order it is defined, which may not always be the desired behavior.
This element allows you to alter the rendering order, ensuring that the content is displayed in the correct sequence.

The default z-index is 0, unless a different value is inherited from a parent container.
Higher values are rendered above lower values.

## Example

The following example shows how to use the `ZIndex` element to create visually appealing pricing tables.

```c#{11}
container
    .PaddingVertical(15)
    .Border(2)
    .Row(row =>
    {
        row.RelativeItem()
            .Background(Colors.Grey.Lighten3)
            .Element(c => AddPricingItem(c, "Community", "Free"));
        
        row.RelativeItem()
            .ZIndex(1) // -1 or 0 or 1
            .Padding(-15)
            .Border(1)
            .Background(Colors.Grey.Lighten1)
            .PaddingTop(15)
            .Element(c => AddPricingItem(c, "Professional", "$699"));
        
        row.RelativeItem()
            .Background(Colors.Grey.Lighten3)
            .Element(c => AddPricingItem(c, "Enterprise", "$1999")); 

        void AddPricingItem(IContainer container, string name, string formattedPrice)
        {
            container
                .Padding(25)
                .Column(column =>
                {
                    column.Item().AlignCenter().Text(name).FontSize(24).Black();
                    column.Item().AlignCenter().Text(formattedPrice).FontSize(20).SemiBold();
                    
                    column.Item().PaddingHorizontal(-25).PaddingVertical(10).LineHorizontal(1);
                    
                    foreach (var i in Enumerable.Range(1, 4))
                    {
                        column.Item()
                            .PaddingTop(10)
                            .AlignCenter()
                            .Text(Placeholders.Label())
                            .FontSize(16)
                            .Light();
                    }
                });
        }
    });
```

<br>

#### `Without` Z-Index Element (Default Behavior)

![example](/api-reference/zindex-zero.webp)

<br>

#### With Z-Index `1` Element (Correct Implementation)

![example](/api-reference/zindex-positive.webp)

<br>

#### With Z-Index `-1` Element (Incorrect Implementation)

![example](/api-reference/zindex-negative.webp)
