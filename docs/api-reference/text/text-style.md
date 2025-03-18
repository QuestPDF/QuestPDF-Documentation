# Text Style

## Font Size

Font size measures the height of text characters, determining how large or small the text appears.

It's worth noting that different fonts may render text with different visual sizes, even when assigned the same numerical font size.

```c#{7,11,15}
.Column(column =>
{
    column.Spacing(10);

    column.Item()
        .Text("This is small text (16pt)")
        .FontSize(16);

    column.Item()
        .Text("This is medium text (24pt)")
        .FontSize(24);

    column.Item()
        .Text("This is large text (36pt)")
        .FontSize(36);
});
```

![example](/api-reference/text-font-size.webp =409x)


## Font Family

A font family is a collection of related fonts that share a consistent design style but may vary in weight, style, or width.

Examples of font families include Arial, Times New Roman, and Calibri.

```c#{8,11}
.Column(column =>
{
    column.Spacing(10);

    column.Item().Text("This is text with default font (Lato)");

    column.Item().Text("This is text with Times New Roman font")
        .FontFamily("Times New Roman");

    column.Item().Text("This is text with Courier New font")
        .FontFamily("Courier New");
});
```

![example](/api-reference/text-font-family.webp =458x)


## Font Fallback

The Font Fallback option is a list of alternative fonts that are used when specific glyphs are unavailable in the primary font. This ensures that text is displayed correctly across different systems and environments.

A common example is the display of non-Latin characters, such as Arabic or Chinese, which may not be supported by all fonts.

```c#{3}
container
    .Text("The Arabic word for programming is البرمجة.")
    .FontFamily("Lato", "Noto Sans Arabic");
```

![example](/api-reference/text-font-fallback.webp =430x)

It's also useful for displaying emojis, which are not universally supported by all fonts.

```c#{3}
container
    .Text("Popular emojis include 😊, 😂, ❤️, 👍, and 😎.")
    .FontFamily("Lato", "Noto Emoji");
```

![example](/api-reference/text-font-fallback-emoji.webp =459x)

## Font Color

The font color determines the color applied to text characters, affecting their visual appearance.

It also influences the default color of text decorations, such as underlines.

```c#{4,6,8}
.Text(text =>
{
    text.Span("Each pixels consists of three sub-pixels: ");
    text.Span("red").FontColor(Colors.Red.Medium);
    text.Span(", ");
    text.Span("green").FontColor(Colors.Green.Medium);
    text.Span(" and ");
    text.Span("blue").FontColor(Colors.Blue.Medium);
    text.Span(".");
});
```

![example](/api-reference/text-font-color.webp =563x)


## Background Color

Sets a solid background color for the text.

This color fills the area behind the text or other elements, enhancing contrast and providing visual emphasis.

```c#{4}
.Text(text =>
{
    text.Span("The term ");
    text.Span("algorithm").BackgroundColor(Colors.Yellow.Lighten3).Bold();
    text.Span("  ");
});
```

![example](/api-reference/text-font-background.webp =490x)


## Font Weight

Determines the thickness of the text characters, ranging from light to bold, to create visual hierarchy or emphasis.

Please note that not all fonts support every weight. If the specified weight isn't available, the library selects the closest available option.

| Name          | CSS Value | Example Text                                   |
|---------------|-----------|------------------------------------------------|
| Thin          | 100       | <span style="font-weight: 100">Example</span>  |
| ExtraLight    | 200       | <span style="font-weight: 200">Example</span>  |
| Light         | 300       | <span style="font-weight: 300">Example</span>  |
| NormalWeight  | 400       | <span style="font-weight: 400">Example</span>  |
| Medium        | 500       | <span style="font-weight: 500">Example</span>  |
| SemiBold      | 600       | <span style="font-weight: 600">Example</span>  |
| Bold          | 700       | <span style="font-weight: 700">Example</span>  |
| ExtraBold     | 800       | <span style="font-weight: 800">Example</span>  |
| Black         | 900       | <span style="font-weight: 900">Example</span>  |
| ExtraBlack    | 1000      | <span style="font-weight: 1000">Example</span> |


```c#{4,6,8,10}
.Text(text =>
{
    text.Span("This sentence demonstrates ");
    text.Span("bold").Bold();
    text.Span(", ");
    text.Span("normal").NormalWeight();
    text.Span(", ");
    text.Span("light").Light();
    text.Span(" and ");
    text.Span("thin").Thin();
    text.Span(" font weights.");
});
```

![example](/api-reference/text-font-weight.webp =494x)

:::warning
QuestPDF does not currently support fonts with variable weights.
:::


## Italic

Renders text with an italic effect, where letters are slightly slanted to the right.

Commonly used for emphasis or to distinguish specific words.

```c#{4}
.Text(text =>
{
    text.Span("In this sentence, the word ");
    text.Span("important").Italic();
    text.Span(" is emphasized using italics.");
});
```

![example](/api-reference/text-font-italic.webp =490x)


## Decorations

Applies decorative lines on text. Commonly used to emphasize specific words or phrases.

### Positions

It is also possible to customize the decoration position:
- Underline,
- Strikethrough,
- Overline.

```c#{4,6,8}
.Text(text =>
{
    text.Span("There are a couple of available text decorations: ");
    text.Span("underline").Underline().FontColor(Colors.Red.Medium);
    text.Span(", ");
    text.Span("strikethrough").Strikethrough().FontColor(Colors.Green.Medium);
    text.Span(" and ");
    text.Span("overline").Overline().FontColor(Colors.Blue.Medium);
    text.Span(". ");
});
```

![example](/api-reference/text-decoration-types.webp =468x)

### Styles

It is also possible to customize the decoration line style:
- DecorationSolid,
- DecorationDouble,
- DecorationWavy,
- DecorationDotted,
- DecorationDashed.

```c#{4,6,8,10,12}
.Text(text =>
{
    text.Span("Moreover, the decoration can be ");
    text.Span("solid").Underline().DecorationSolid().FontColor(Colors.Indigo.Medium);
    text.Span(", ");
    text.Span("double").Underline().DecorationDouble().FontColor(Colors.Blue.Medium);
    text.Span(", ");
    text.Span("wavy").Underline().DecorationWavy().FontColor(Colors.LightBlue.Medium);
    text.Span(", ");
    text.Span("dotted").Underline().DecorationDotted().FontColor(Colors.Cyan.Medium);
    text.Span(" or ");
    text.Span("dashed").Underline().DecorationDashed().FontColor(Colors.Green.Medium);
    text.Span(".");
});
```

![example](/api-reference/text-decoration-styles.webp =455x)

### Styling

By default, the decoration line color is the same as the text color, and the decoration thickness is determined by the font. 
However, these properties can be customized.

```c#{6-9}
.Text(text =>
{
    text.Span("This text contains a ");
    
    text.Span("seriuos")
        .Underline()
        .DecorationWavy()
        .DecorationColor(Colors.Red.Medium)
        .DecorationThickness(2);
    
    text.Span(" typo.");
});
```

![example](/api-reference/text-decoration-advanced.webp =337x)


## Subscript

Subscript displays text slightly below the baseline, often in a smaller size. 
Commonly used for chemical formulas or mathematical notations

```c#{4}
.Text(text =>
{
    text.Span("H");
    text.Span("2").Subscript();
    text.Span("O is the chemical formula for water.");
});
```

![example](/api-reference/text-subscript.webp =384x)


## Superscript

Superscript displays text slightly above the baseline, often in a smaller size.
Typically used for exponents, footnotes, or ordinal indicators

```c#{4}
.Text(text =>
{
    text.Span("E = mc");
    text.Span("2").Superscript();
    text.Span(" is the equation of mass-energy equivalence.");
});
```

![example](/api-reference/text-superscript.webp =504x)


## Line Height

Adjusts the vertical spacing between lines of text, affecting readability and overall text layout.
The added space is proportional to the text size.

```c#{16}
.Column(column =>
{
    column.Spacing(20);

    float[] lineHeights = [0.75f, 1f, 2f];
    var paragraph = Placeholders.Paragraph();
    
    foreach (var lineHeight in lineHeights)
    {
        column
            .Item()
            .Background(Colors.Grey.Lighten3)
            .Padding(5)
            .Text(paragraph)
            .FontSize(16)
            .LineHeight(lineHeight);
    }
});
```

![example](/api-reference/text-line-height.webp =495x)


## Letter Spacing

Adjusts the horizontal spacing between characters in the text, affecting readability and overall visual style.

The adjustment is proportional to the text size.

```c#
.Column(column =>
{
    column.Spacing(20);
    
    var letterSpacing = new[] { -0.08f, 0f, 0.2f };
    var paragraph = Placeholders.Sentence();

    foreach (var spacing in letterSpacing)
    {
        column
            .Item()
            .Background(Colors.Grey.Lighten3)
            .Padding(5)
            .Text(paragraph)
            .FontSize(18)
            .LetterSpacing(spacing);
    }
});
```

![example](/api-reference/text-letter-spacing.webp =485x)


## Word Spacing

Adjusts the horizontal spacing between words in the text, affecting readability and overall visual style.
The adjustment is proportional to the text size.

```c#
.Column(column =>
{
    column.Spacing(20);
    
    var wordSpacing = new[] { -0.2f, 0f, 0.4f };
    var paragraph = Placeholders.Sentence();

    foreach (var spacing in wordSpacing)
    {
        column.Item()
            .Background(Colors.Grey.Lighten3)
            .Padding(5)
            .Text(paragraph)
            .FontSize(16)
            .WordSpacing(spacing);
    }
});
```

![example](/api-reference/text-word-spacing.webp =491x)


## Font Features

Font features are a set of typographic features that can be applied to text to enhance its appearance. 
They are used to control various aspects of text rendering.

Font features are always encoded as 4-character long strings. For example, the ligatures feature is encode as `liga`, while the kernig feature as `kern`.
For a list of available features, refer to the `QuestPDF.Helpers.FontFeatures` class.

::: tip
Please note that fonts usually support only a subset of font features.
If you try to enable a feature that is not supported by the font, it will be ignored.
Moreover, some fonts have features enabled by default, and you may not see any difference when enabling them.
:::

### Example

Let's analyze the `StandardLigatures` font feature, which replaces specific pairs of letters (such as 'fi' or 'fl') with a single, combined glyph to enhance aesthetics.

```c#{15,27}
.Row(row =>
{
    row.Spacing(25);

    row.RelativeItem()
        .Background(Colors.Grey.Lighten3)
        .Padding(10)
        .Column(column =>
        {
            column.Item().Text("Without ligatures").FontSize(16);
            
            column.Item()
                .Text("fly and fight")
                .FontSize(32)
                .DisableFontFeature(FontFeatures.StandardLigatures);
        });

    row.RelativeItem()
        .Background(Colors.Grey.Lighten3)
        .Padding(10)
        .Column(column =>
        {
            column.Item().Text("With ligatures").FontSize(16);
            
            column.Item().Text("fly and fight")
                .FontSize(32)
                .EnableFontFeature(FontFeatures.StandardLigatures);
        });
});
```

![example](/api-reference/text-font-features.webp =500x)
