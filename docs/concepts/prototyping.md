# Prototyping

Placeholders in QuestPDF let you quickly generate random text, numbers, colors, and images. 
They are useful for prototyping document layouts or creating test data when real information is not yet available. 

This guide outlines how to use each type of placeholder.



## Text

QuestPDF provides a range of text placeholders that cover common scenarios:

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
Placeholders.WebpageUrl();

Placeholders.Time();
Placeholders.ShortDate();
Placeholders.LongDate();
Placeholders.DateTime();

Placeholders.Integer();
Placeholders.Decimal();
Placeholders.Percent();
```

#### Example

```c#
.Column(column =>
{
    column.Spacing(15);

    AddItem("Name", Placeholders.Name());
    AddItem("Email", Placeholders.Email());
    AddItem("Phone", Placeholders.PhoneNumber());
    AddItem("Date", Placeholders.ShortDate());
    AddItem("Time", Placeholders.Time());
    
    void AddItem(string label, string value)
    {
        column.Item().Text(text =>
        {
            text.Span($"{label}: ").Bold();
            text.Span(value);
        });
    }
});
```

![example](/patterns-and-practices/placeholders-text.webp)


## Colors

QuestPDF can produce random colors based on the Material Design palette, returning them as a string in the `#RRGGBB` format.

```c#
// bright color (lighten-2)
Placeholders.BackgroundColor();

// medium intensity color
Placeholders.Color();
```

#### BackgroundColor example

```c#{11}
.Grid(grid =>
{
    grid.Columns(5);
    grid.Spacing(5);

    foreach (var _ in Enumerable.Range(0, 25))
    {
        grid.Item()
            .Height(50)
            .Width(50)
            .Background(Placeholders.BackgroundColor());
    }
});
```

![example](/patterns-and-practices/placeholders-color-background.webp)


#### Color example

```c#{7}
.Column(column =>
{
    column.Spacing(10);

    foreach (var i in Enumerable.Range(0, 5))
    {
        column.Item()
            .Text(Placeholders.Sentence())
            .FontColor(Placeholders.Color());
    }
});
```

![example](/patterns-and-practices/placeholders-color.webp)


## Image

The image `Placeholders.Image` method generates a soft color gradient. 
It returns a byte array in JPEG format and can be embedded directly in QuestPDF elements.

Use these placeholders to simulate images in your layout, ensuring you can test image placement, sizing, and alignment before real images become available.

```c#
.Width(200)
.Column(column =>
{
    column.Spacing(10);

    // provide an exact image resolution
    column.Item()
        .Image(Placeholders.Image(100, 50));
    
    // specify physical width and height of the image
    column.Item()
        .Width(200)
        .Height(150)
        .Image(Placeholders.Image);
    
    // specify target physical width and aspect ratio
    column.Item()
        .Width(200)
        .AspectRatio(3 / 2f)
        .Image(Placeholders.Image);
});
```

![example](/patterns-and-practices/placeholders-image.webp)
