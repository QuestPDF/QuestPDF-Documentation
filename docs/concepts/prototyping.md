# Prototyping

## Text

Often we know what a document layout should look like but we do not have appropriate data to fill it. The Quest PDF library provides a set of helpers to generate random text of different kinds:

```c#
using QuestPDF.Helpers;

Placeholders.LoremIpsum();
Placeholders.Label();
Placeholders.Sentence();
Placeholders.Question();
Placeholders.Paragraph();
Placeholders.Paragraphs();

Placeholders.Email();
Placeholders.Name();
Placeholders.PhoneNumber();

Placeholders.Time();
Placeholders.ShortDate();
Placeholders.LongDate();
Placeholders.DateTime();

Placeholders.Integer();
Placeholders.Decimal();
Placeholders.Percent();
```

## Colors

You can access a random color picked from the Material Design colors set. Colors are returned as text in the HEX format.

```c#
// bright color, lighten-2
Placeholders.BackgroundColor();

// medium
Placeholders.Color();
```

Example usage to create a colorful matrix:

```c#
.Padding(25)
.Grid(grid =>
{
    grid.Columns(5);
    
    Enumerable
        .Range(0, 25)
        .Select(x => Placeholders.BackgroundColor())
        .ToList()
        .ForEach(x => grid.Item().Height(50).Background(x));
});
```

![example](/patterns-and-practices/random-colors.png =300x)

## Image

Use this simple function to generate a random image with required size:

```c#
// both functions return a byte array containing a JPG file
Placeholders.Image(400, 300);
Placeholders.Image(new Size(400, 300));

// example usage
.Padding(25)
.Width(300)
.AspectRatio(3 / 2f)
.Image(Placeholders.Image);
```

![example](/patterns-and-practices/image-placeholder.png =350x)