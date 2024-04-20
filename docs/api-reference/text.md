# Text

- Draws text with default or custom styling.
- `Text` always takes as little space as possible.
- If the text string is long, the element may take the entire width and break to the next line.
- This element supports paging.

For most cases, that do not require any complex formatting, the simplified version of the `Text` component is enough as illustrated below.

```csharp
.Text("Sample text")
.Text("Red big text").FontColor("#F00").FontSize(24)
```

Use the "text block" approach when you want to change style in the middle of a text string, inject page numbers or include custom components, as shown below:

```csharp
.Text(text =>
{
    text.Span("This is a normal text, followed by some ");
    text.Span("underlined text.").Underline();
});
```

![example](/api-reference/text-simple-block.png =500x)

## Basic font style

You can define the text style using the following fluent API methods:

```csharp
.FontColor("#F00")
.FontFamily("Times New Roman")

// you can also provide fallback font families
.FontFamily("Times New Roman", "Calibri" "Noto Color Emoji") 

.FontSize(24)
.LineHeight(1.5f)
.Italic()
.BackgroundColor(Colors.Grey.Lighten5)
.Strikethrough()
.Underline()
.Subscript()
.Superscript()
```

## Default text style within a block

Use these fluent API methods to adjust text position:

```csharp
.Text(text =>
{
    text.DefaultTextStyle(x => x.FontSize(20).BackgroundColor(Colors.Green.Lighten3));
    
    text.Line("Text following default style.");
    text.Line("Text with altered style.").Underline();
});
```

## Font weight

You can easily set up font weight by using one of the following fluent API methods:

```csharp
.Weight(FontWeight.Normal)
.Thin()
.ExtraLight()
.Light()
.NormalWeight()
.Medium()
.SemiBold()
.Bold()
.ExtraBold()
.Black()
.ExtraBlack()
```

Please notice that not all fonts support every weight. QuestPDF will match the closest available weight:

![example](/api-reference/text-weight.png =200x)


## Subscript and superscript

```csharp{9,15}
.Text(text =>
{
    text.DefaultTextStyle(x => x.FontSize(20));
    text.ParagraphSpacing(10);

    var highlight = TextStyle.Default.BackgroundColor(Colors.Green.Lighten3);

    text.Span("E=mc").Style(highlight);
    text.Span("2").Superscript().Style(highlight);
    text.Span(" is the equation of mass–energy equivalence.");

    text.EmptyLine();
    
    text.Span("H").Style(highlight);
    text.Span("2").Subscript().Style(highlight);
    text.Span("O").Style(highlight);
    text.Span(" is the chemical formula for water.");
});
```

![example](/api-reference/text-subscript-superscript.png =500x)


## Line height

This settings changes spacing between text lines. Modify the value to make the text more compact or easier to read.

```csharp{3,14}
.Column(column =>
{
    var lineHeights = new[] { 0.8f, 1f, 1.5f };
    var paragraph = Placeholders.Paragraph();

    foreach (var lineHeight in lineHeights)
    {
        column
            .Item()
            .Border(1)
            .Padding(10)
            .Text(paragraph)
            .FontSize(16)
            .LineHeight(lineHeight);
    }
});
```

![example](/api-reference/text-line-height.png =500x)


## Letter spacing

Letter spacing allows you to increase or decrease space between characters. This setting is useful when you want to make the text more compact (by decreasing letter spacing) or easier to read (by increasing letter spacing):
- The value 0 corresponds to the normal spacing defined by a font.
- Positive values create additional space.
- Negative values reduce space between characters.

This settings uses relative units. Example: let's assume your text has font size 20. If letter spacing is set to 0.1, an additional space of 2 points will be added between characters.

```csharp{18}
.Column(column =>
{
    var letterSpacing = new[] { -0.05f, 0f, 0.2f };
    var paragraph = Placeholders.Sentence();

    foreach (var spacing in letterSpacing)
    {
        column
            .Item()
            .Border(1)
            .Padding(10)
            .Column(nestedColumn =>
            {
                nestedColumn
                    .Item()
                    .Text(paragraph)
                    .FontSize(18)
                    .LetterSpacing(spacing);

                nestedColumn
                    .Item()
                    .Text($"Letter spacing of {spacing} em")
                    .FontSize(14)
                    .Italic()
                    .FontColor(Colors.Blue.Medium);
            });
        
    }
});
```

![example](/api-reference/text-letter-spacing.png =500x)


## Typography pattern

Please consider an example Typography class that describes text styling across all documents:

```csharp
// single typography class can help with keeping a consistent look & feel in the document
public static class Typography
{
    public static TextStyle Title => TextStyle
        .Default
        .FontType("Helvetica")
        .FontColor(Colors.Black)
        .FontSize(20)
        .Bold();

    public static TextStyle Headline => TextStyle
        .Default
        .FontType("Helvetica")
        .FontColor(Colors.Blue.Medium)
        .FontSize(14);

    public static TextStyle Normal => TextStyle
        .Default
        .FontType("Helvetica")
        .FontColor("#000000")
        .FontSize(10)
        .LineHeight(1.25f)
        .AlignLeft();
}

```

Then, a predefined typography can be used in the following way:

```csharp
.Text("My text with predefined style").Style(Typography.Headline);
```

## Font alignment

Use the following fluent API methods to adjust text position:

```csharp
.Text(text =>
{
    // pick alignment
    text.AlignLeft();
    text.AlignCenter();
    text.AlignRight();
    text.AlignStart();
    text.AlignEnd();
    text.Justify();
    
    text.Span("Sample text");
});
```

You can also use the shorthand version:

```csharp
.Text("Sample text").Justify();
```

## Custom paragraph spacing

It is possible to specify additional spacing between paragraphs (blocks of text in different lines).

```csharp
.Text(text =>
{
    text.ParagraphSpacing(10);
    
    text.Line("Paragraph 1");
    text.Line("Paragraph 2");
    text.Line("Paragraph 3");
    text.Line(Placeholders.LoremIpsum());
});
```

![example](/api-reference/text-paragraph-spacing.png =500x)

## Injecting custom content

Sometimes you may need to inject custom components between text spans. Every injected element is aligned to the baseline.

```csharp
.Text(text =>
{
    text.Span("This is a random image aligned to the baseline: ");
    text.Element().Height(24).Width(48).Image(Placeholders.Image);
    text.Span(".");
});
```

![example](/api-reference/text-custom-element.png =450x)

Use negative padding to adjust element position to suit your needs:

```csharp{7}
.Text(text =>
{
    text.DefaultTextStyle(x => x.FontSize(20));
    text.Span("This is a random image aligned to the baseline: ");
    
    text.Element()
        .PaddingBottom(-6)
        .Height(24)
        .Width(48)
        .Image(Placeholders.Image);
    
    text.Span(".");
});
```

![example](/api-reference/text-custom-element-aligned.png =450x)

::: danger
When injecting custom elements inside a text block, please remember to always constrain its size. Otherwise, the element will take entire available space.
:::

## Page numbers

### Document

Use new text elements to inject pagination data, i.e. the current page number, the total page count in the document, etc.

```csharp
.Text(text =>
{
    text.CurrentPageNumber();
    text.TotalPages();
    
    // it is also possible to style the text
    text.CurrentPageNumber().Underline();
});
```

### Sections

It is possible to retrieve pagination data for a named section of your document.

```csharp
// define your section somewhere in the document:
.Section("customSection")

// refer to this location position in your list of contents:
.Text(text =>
{
    // page number where section begins
    text.BeginPageNumberOfSection("customSection");
    
    // page number where section ends
    text.EndPageNumberOfSection("customSection");
    
    // page number relative to section beginning
    // at section beginning page, method returns 1
    text.PageNumberWithinSection("customSection");
    
    // how many pages section takes
    text.TotalPagesWithinSection("customSection");
});
```

### Formatting

It is possible to format the page number using the `Format` method.

```csharp
.Text(text =>
{
    // assumes that FormatAsRomanNumeral 
    text.CurrentPageNumber().Format(FormatAsRomanNumeral);
    
    static string FormatAsRomanNumeral(int? pageNumber)
    {
        if (pageNumber == null)
            return "-------";
    
        // proper implementation
        return "MMXXII";
    }
});
```

Please note that the formatting function takes the `int?` type. QuestPDF uses a two-pass rendering algorithm whereby page numbers are only known during the second pass. In the first phase, your formatting method receives `null` to indicate that the page number is not yet determined. Please return any text that matches the expected output in length.

## Section link

```csharp
// define your section somewhere in the document:
.Section("customLocationName")

// create a hyperlink to that location
.Text(text =>
{
    text.SectionLink("Custom location link", "customLocationName");
});
```

## Hyperlink

```csharp
.Text(text =>
{
    text.Hyperlink("Please visit QuestPDF website", "https://www.questpdf.com");
});
```

## Unicode support

The library supports text shaping capability, which is useful when generating advanced Unicode-capable text:

```csharp{10}
.Padding(35)
.MinimalBox()
.Background(Colors.Grey.Lighten2)
.Text(text =>
{
    text.DefaultTextStyle(TextStyle.Default.FontSize(20));
    
    text.Span("Complex Unicode structure: ");
    
    text.Span("T̶̖̔͆͆̽̔ḩ̷̼̫̐̈́̀͜͝͝ì̶͇̤͓̱̣͇͓͉̎s̵̡̟̹͍̜͉̗̾͛̈̐́͋͂͝͠ͅ ̴̨͙͍͇̭̒͗̀́͝ì̷̡̺͉̼̏̏̉̌͝s̷͍͙̗̰̖͙̈̑̂̔͑͊̌̓̊̇͜ ̶̛̼͚͊̅͘ṭ̷̨̘̣̙̖͉͌̏̂̅͑̄̽̕͝ȅ̶̲̲̙̭͈̬̣͔̝͔̈́͝s̸̢̯̪̫͓̭̮̓̀͆͜ț̸̢͉̞̥̤̏̌̓͝")
        .FontFamily(Fonts.Calibri)
        .FontColor(Colors.Red.Medium);
    
    text.Span(".");
});
```

![example](/api-reference/text-unicode.png =400x)

## Advanced languages support

Text shaping capability also gives basic support for more advanced languages that:
1. Display multiple text characters as a single glyph.
2. Are displayed using right-to-left script.

```csharp{4}
var text = "في المعلوماتية أو الرياضيات، خوارزمية الترتيب هي خوارزمية تمكن من تنظيم مجموعة عناصر حسب ترتيب محدد.";
                  
.Padding(20)
.ContentFromRightToLeft()
.Text(text)
.FontFamily(Fonts.Calibri)
.FontSize(22);
```

![example](/api-reference/text-arabic.png =425x)

## Font fallback

Each font file contains a well-specified set of glyphs. Sometimes, to reduce font file size, more advanced glyphs are not present. For example, English uses around one hundred characters, whereas Chinese requires thousands of glyphs. Therefore, it is possible that text in a document may contain glyphs not available in the configured font. In such cases, an ugly character (usually a square with a question mark) is rendered.

You can define font fallback in the TexStyle object:

```csharp{4,11}
TextStyle
    .Default
    .FontFamily(Fonts.Calibri, "Segoe UI Emoji");
```


## Dealing with pageable text

The `Text` element supports paging. That means part of the text may be moved to the next page if there is not enough space on the current one. There are several approaches to simplify the workflow with text as described below.

To make sure that text is never paged and always fully visible on a single page, please use the `ShowEntire` element:

```csharp
.ShowEntire()
.Text("A long text here will not be paged.");
```

Sometimes, there is very little space on the page. It is enough to display a couple of lines but such a short text block may look awkward. In such cases, it is better to move the text block to the next page instead of attempting to perform line breaking. Please adjust the minimum height in the `EnsureSpace` element to match the desired minimum space to display at the end of the page.

```csharp
.EnsureSpace(50)
.Text("A long text here.");
```

## Forcing text direction (RTL)

QuestPDF automatically detects text direction and applies proper text alignment. However, it is possible to override text direction. 

```csharp
TextStyle.Default.DirectionAuto() // default
TextStyle.Default.DirectionFromLeftToRight()
TextStyle.Default.DirectionFromRightToLeft()
```

This may be useful with more advanced edge cases:

```csharp
.DefaultTextStyle(x => x.FontSize(24).FontFamily("Calibri"))
.Column(column =>
{
    column.Spacing(10);
    
    var word = "الجوريتم";
    var definition = "algorithm in Arabic";

    var text = $"{word} - {definition}";
    
    // text direction is automatically detected using the first word
    column.Item().Text(text);
    
    // it is possible to force specific content direction
    column.Item().Text(text).DirectionFromLeftToRight();
    column.Item().Text(text).DirectionFromRightToLeft();

    // to combine text in various content directions, split it into segments
    column.Item().Text(text =>
    {
        text.Span(word);
        text.Span(" - ");
        text.Span(definition);
    });
});
```

![example](/api-reference/text-direction-forced.png =300x)
