# Slots

## Main slots

Main slots (`Header`, `Content` and `Footer`) can be used to specify page content:
- The `Header` element is always visible at the top of each page.
- The `Content` element is drawn on the space between the `Header` and the `Footer`.
- The `Footer` element is always visible at the bottom of each page.

```c#
.Page(page =>
{
    page.MarginHorizontal(40);
    page.MarginVertical(60);

    page.Header()
        .Height(60)
        .Background(Colors.Grey.Lighten1)
        .AlignCenter()
        .AlignMiddle()
        .Text("Header");

    page.Content()
        .Background(Colors.Grey.Lighten2)
        .AlignCenter()
        .AlignMiddle()
        .Text("Content");

    page.Footer()
        .Height(30)
        .Background(Colors.Grey.Lighten1)
        .AlignCenter()
        .AlignMiddle()
        .Text("Footer");
});
```

::: danger
Please be careful! When the combined heights of the header and footer elements is greater than the total page height, there is insufficient space for the content, in which case a layout exception is thrown.
:::

![example](/api-reference/page-example.png =298x)

## Watermark slots

The watermark slots (background and foreground) can be used to add content behind or in front of the main content, respectively.

```c#{10-14,16-20}
.Page(page =>
{
    page.Size(PageSizes.A4);
    page.Margin(1, Unit.Inch);
    page.DefaultTextStyle(TextStyle.Default.FontSize(16));
    page.PageColor(Colors.White);

    const string transparentBlue = "#662196f3";

    page.Background()
        .AlignTop()
        .ExtendHorizontal()
        .Height(200)
        .Background(transparentBlue);
    
    page.Foreground()
        .AlignBottom()
        .ExtendHorizontal()
        .Height(250)
        .Background(transparentBlue);
    
    page.Header()
        .Text("Background and foreground")
        .Bold().FontColor(Colors.Blue.Darken2).FontSize(36);
    
    page.Content().PaddingVertical(25).Column(column =>
    {
        column.Spacing(25);

        foreach (var i in Enumerable.Range(0, 100))
            column.Item().Background(Colors.Grey.Lighten2).Height(75);
    });
});
```

![example](/api-reference/page-background-foreground.png =300x)

Let's consider a more advanced example that adds additional visual elements on the side of actual content. This can be easily achieved with watermark slots:

```c#{10-30}
document.Page(page =>
{
    const float horizontalMargin = 1.5f;
    const float verticalMargin = 1f;
    
    page.Size(PageSizes.A4);
    page.MarginVertical(verticalMargin, Unit.Inch);
    page.MarginHorizontal(horizontalMargin, Unit.Inch);

    page.Background()
        .PaddingVertical(verticalMargin, Unit.Inch)
        .RotateRight()
        .Decoration(decoration =>
        {
            decoration.Before().RotateRight().RotateRight().Element(DrawSide);
            decoration.Content().Extend();
            decoration.After().Element(DrawSide);

            void DrawSide(IContainer container)
            {
                container
                    .Height(horizontalMargin, Unit.Inch)
                    .AlignMiddle()
                    .Row(row =>
                    {   
                        row.AutoItem().PaddingRight(16).Text("COMPANY NAME").FontSize(16).FontColor(Colors.Red.Medium);
                        row.RelativeItem().PaddingTop(12).ExtendHorizontal().LineHorizontal(2).LineColor(Colors.Red.Medium);
                    });
            }
        });
    
    page.Content().Column(column =>
    {
        column.Spacing(25);

        foreach (var i in Enumerable.Range(1, 100))
            column.Item().Background(Colors.Grey.Lighten2).Height(75).AlignCenter().AlignMiddle().Text(i.ToString()).FontSize(16);
    });
});
```

That produces the following result:

![example](/api-reference/page-slots-advanced.png =595x)