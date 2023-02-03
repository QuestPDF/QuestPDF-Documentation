# Colors

## Color definitions

In QuestPDF, several elements expect a color as part of the configuration. As in HTML, there are a couple of supported formats:
1. Standard format: `RRGGBB` or `#RRGGBB`
2. Shorthand format: `RGB` or `#RGB`, e.g. `#123` is an equivalent to `#112233`
3. Alpha support: `AARRGGBB` or `#AARRGGBB`
4. Shorthand alpha format: `ARGB` or `#ARGB`

## Material Design colors

You can access any color defined in the Material Design colors set. Please find more details [on the official webpage](https://material.io/design/color/the-color-system.html).

```csharp
// base colors:
Colors.Black
Colors.White
Colors.Transparent

// colors with medium brightness:
Colors.Green.Medium;
Colors.Orange.Medium;
Colors.Blue.Medium;

// darken colors:
Colors.Blue.Darken4
Colors.LightBlue.Darken3
Colors.Indigo.Darken2
Colors.Brown.Darken1

// lighten colors:
Colors.Pink.Lighten1
Colors.Purple.Lighten2
Colors.Teal.Lighten3
Colors.Cyan.Lighten4
Colors.LightGreen.Lighten5

// accent colors:
Colors.Lime.Accent1
Colors.Yellow.Accent2
Colors.Amber.Accent3
Colors.DeepOrange.Accent4
```

Example usage:

```csharp
var colors = new[]
{
    Colors.Green.Darken4,
    Colors.Green.Darken3,
    Colors.Green.Darken2,
    Colors.Green.Darken1,
    
    Colors.Green.Medium,
    
    Colors.Green.Lighten1,
    Colors.Green.Lighten2,
    Colors.Green.Lighten3,
    Colors.Green.Lighten4,
    Colors.Green.Lighten5,
    
    Colors.Green.Accent1,
    Colors.Green.Accent2,
    Colors.Green.Accent3,
    Colors.Green.Accent4,
};

container
    .Padding(25)
    .Height(100)
    .Row(row =>
    {
        foreach (var color in colors)
            row.RelativeItem().Background(color);
    });
```

![example](/patterns-and-practices/material-colors.png =450x)