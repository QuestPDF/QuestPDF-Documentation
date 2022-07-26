# Prototyping

## Text

It is a very common scenario when we know how the document layout should look like, however, we do not have appropriate data to fill it. The Quest PDF library provides a set of helpers to generate random text of different kinds:

```csharp
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

```csharp
// bright color, lighten-2
Placeholders.BackgroundColor();

// medium
Placeholders.Color();
```

Example usage to create a colorful matrix:

```csharp
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

![example](/images/patterns-and-practices/random-colors.png =300x)

## Image

Use this simple function to generate random image with required size:

```csharp
// both functions return a byte array containing a JPG file
Placeholders.Image(400, 300);
Placeholders.Image(new Size(400, 300));

// example usage
.Padding(25)
.Width(300)
.AspectRatio(3 / 2f)
.Image(Placeholders.Image);
```

![example](/images/patterns-and-practices/image-placeholder.png =350x)