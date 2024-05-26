# Basic fonts

The library offers a list of simple and popular fonts.
```c#
Fonts.Calibri
Fonts.Candara
Fonts.Arial
// and more...
```

Example:

```c#
var fonts = new[]
{
    Fonts.Calibri,
    Fonts.Candara,
    Fonts.Arial,
    Fonts.TimesNewRoman,
    Fonts.Consolas,
    Fonts.Tahoma,
    Fonts.Impact,
    Fonts.Trebuchet,
    Fonts.ComicSans
};

container.Padding(25).Grid(grid =>
{
    grid.Columns(3);

    foreach (var font in fonts)
    {
        grid.Item()
            .Border(1)
            .BorderColor(Colors.Grey.Medium)
            .Padding(10)
            .Text(font)
            .FontFamily(font).FontSize(16);
    }
});
```

![example](/patterns-and-practices/defined-fonts.png =500x)

