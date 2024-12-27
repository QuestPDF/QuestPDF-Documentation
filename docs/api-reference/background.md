# Background

Sets a solid background color behind its content.

```c#
.Background("#00FF00")
.Background(Colors.Green.Lighten2)
```

<!--@include: tip-color.md-->


## Example

```c#{30}
using QuestPDF.Helpers;

var colors = new[]
{
    Colors.LightBlue.Darken4,
    Colors.LightBlue.Darken3,
    Colors.LightBlue.Darken2,
    Colors.LightBlue.Darken1,

    Colors.LightBlue.Medium,

    Colors.LightBlue.Lighten1,
    Colors.LightBlue.Lighten2,
    Colors.LightBlue.Lighten3,
    Colors.LightBlue.Lighten4,
    Colors.LightBlue.Lighten5,

    Colors.LightBlue.Accent1,
    Colors.LightBlue.Accent2,
    Colors.LightBlue.Accent3,
    Colors.LightBlue.Accent4,
};

container
    .Height(100)
    .Width(280)
    .Row(row =>
    {
        foreach (var color in colors)
            row.RelativeItem().Background(color);
    });
```

![example](/api-reference/background.webp =280x)
