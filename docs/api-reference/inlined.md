# Inlined

The Inlined component arranges elements sequentially in a line, automatically wrapping to the next line when needed. 
This layout is particularly useful when you need to display a collection of elements horizontally with consistent spacing and alignment options.


#### Helper method

The following helper method generates sample blocks with random sizes and colors to demonstrate the Inlined component's capabilities:

```c#
void RandomBlock(IContainer container)
{
    container
        .Width(Random.Shared.Next(1, 4) * 25)
        .Height(Random.Shared.Next(1, 4) * 25)
        .Border(1)
        .BorderColor(Colors.Grey.Darken2)
        .Background(Placeholders.BackgroundColor());
}
```


#### Usage

```c#{5-13}
.Background(Colors.Grey.Lighten3)
.Padding(25)
.Border(1)
.Background(Colors.White)
.Inlined(inlined =>
{
    inlined.Spacing(25);
    inlined.BaselineMiddle();
    inlined.AlignCenter();
    
    foreach (var _ in Enumerable.Range(0, 15))
        inlined.Item().Element(RandomBlock);
});
```

![example](/api-reference/inlined.webp =450x)

## Spacing

| Option                | Description                                          |
|-----------------------|------------------------------------------------------|
| **Spacing**           | Sets the vertical and horizontal gaps between items. |
| **VerticalSpacing**   | Sets the vertical gaps between items.                |
| **HorizontalSpacing** | Sets the horizontal gaps between items.              |

## Horizontal alignment

| Option               | Description                                                                               |
|----------------------|-------------------------------------------------------------------------------------------|
| **AlignLeft**        | Aligns items horizontally to the left side.                                               |
| **AlignCenter**      | Aligns items horizontally to the center.                                                  |
| **AlignRight**       | Aligns items horizontally to the left right.                                              |
| **AlignJustify**     | Distributes items horizontally, ensuring even spacing from edge to edge of the container. |
| **AlignSpaceAround** | Spaces items equally in a horizontal arrangement, both between items and at the ends.     |

## Baseline alignment

| Option             | Description                                                                     |
|--------------------|---------------------------------------------------------------------------------|
| **BaselineTop**    | Positions items vertically such that their top edges align on a single line.    |
| **BaselineMiddle** | Positions items to have their centers in a straight horizontal liąne.           |
| **BaselineBottom** | Positions items vertically such that their bottom edges align on a single line. |
