# Rotate

## Constrained

Constrained rotation enables you to rotate an element by exactly 90 degrees, either clockwise or counterclockwise, while maintaining the content within the same space and size constraints.

| Method          | Description                                      |
|-----------------|--------------------------------------------------|
| **RotateLeft**  | Rotates its content 90 degrees counterclockwise. |
| **RotateRight** | Rotates its content 90 degrees clockwise.        |

::: warning
When applying rotation, be aware that it changes the dimensional behavior of your elements. 
What was previously considered width may become height and vice versa. 
This affects how other properties like alignment and padding work on the rotated element.
:::
 
```c#{4}
container.Row(row =>
{
    row.AutoItem()
        .RotateLeft()
        .AlignCenter()
        .Text("Definition")
        .Bold().FontColor(Colors.Blue.Darken2);
    
    row.AutoItem()
        .PaddingHorizontal(15)
        .LineVertical(2).LineColor(Colors.Blue.Medium);
    
    row.RelativeItem()
        .Background(Colors.Blue.Lighten5)
        .Padding(15)
        .Text(text =>
        {
            text.Span("A variable").Bold();
            text.Span(" is a named storage location in memory that holds a value which can be modified during program execution.");
        });
});
```

![example](/api-reference/rotate.webp)

## Free

Rotates its content clockwise by a given angle.

```c#{24}
container
    .Background(Colors.Grey.Lighten2)
    .Padding(25)
    .Row(row =>
    {
        row.Spacing(25);
        
        AddIcon(0);
        AddIcon(30);
        AddIcon(45);
        AddIcon(80);

        void AddIcon(float angle)
        {
            const float itemSize = 100;
            
            row.AutoItem()
                .Width(itemSize)
                .AspectRatio(1)
                
                .TranslateX(itemSize / 2)
                .TranslateY(itemSize / 2)
                
                .Rotate(angle)
                
                .TranslateX(-itemSize / 2)
                .TranslateY(-itemSize / 2)
                
                .Svg("Resources/compass.svg");
        }
    });
```

![example](/api-reference/rotate-free.webp)
