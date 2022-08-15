# Text

- Draws text with default or custom styling.
- Text always takes as little space as possible.
- If text is longer, the element may take the entire width and break to the next line.
- This element supports paging.

For most cases, that do not require any complex formatting, the simplified version of the text component is enough:

```csharp
.Text("Sample text")
.Text("Red big text").FontColor("#F00").FontSize(24)
```

When you want to change style in the middle of the text, inject page numbers or include custom components - use text block approach:

```csharp
.Text(text =>
{
    text.Span("This is a normal text, followed by an ");
    text.Span("underlined text.").Underline();
});
```

![example](/api-reference/text-simple-block.png =500x)

## Basic font style

You can define text style using available FluentAPI methods which are described below.

```csharp
.FontColor("#F00")
.FontFamily("Times New Roman")
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

You these fluent API methods to adjust text position:

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

Please notice that not all fonts support every weight. QuestPDF will match the closest weight available:

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

## Typography pattern

Please consider an example Typography class that describes text styling across all documents:

```csharp
// single typography class can help with keeping document look&feel consistent
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

You these fluent API methods to adjust text position:

```csharp
.Text(text =>
{
    // pick alignment
    text.AlignLeft();
    text.AlignCenter();
    text.AlignRight();
    
    text.Span("Sample text");
});
```

## Custom paragraph spacing

It is possible to specify additional spacing between paragraphs - blocks of text in different lines.

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

Use negative padding to adjust element position to your needs:

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
When injecting custom elements inside the text block, please remember to always constrain its size. Otherwise, the element will take entire space possible.
:::

## Page numbers

### Document

Use new text elements to inject page numbers: current page number where the text is located and number of all pages within the document.

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

It is also possible to access specific page

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

It is also possible to format page number using the `Format` method.

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

Please notice that the formatting function takes `int?` type. QuestPDF performs two-pass rendering algorithm. Only during the second pass, all page numbers are known and defined. In the first phase, your formatting method receives `null` to indicate that the page number is not determined yet. Please return any text that matches expected output in length.

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

The library supports text shaping capability, useful when generating advanced Unicode-capable text:

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
1) Display multiple text characters as a single glyph.
2) Are display in the right-to-left order.

```csharp{4}
.Padding(25)
.MinimalBox()
.Background(Colors.Grey.Lighten2)
.Text("ينا الألم. في بعض الأحيان ونظراً للالتزامات التي يفرضها علينا")
.FontFamily(Fonts.Calibri)
.FontSize(20);
```

![example](/api-reference/text-arabic.png =425x)

## Dealing with pageable text

The text element supports paging. That means part of the text may be moved to the next page if there is not enough space on the current one. There are several approaches to simplify the workflow with text:

To make sure that text is never paged and always filly visible on a single page, please use the `ShowEntire` element:

```csharp
.ShowEntire()
.Text("A long text here will not be paged.");
```

Sometimes, there is very little space on the page. It is enough to display a couple of lines but such a short text block may look incorrectly. In such cases, it is better to move the text block to the next page, instead of attempting to perform line breaking. Please adjust the minimum height in the `EnsureSpace` element to match the desired minimum number of lines to display at the end of the page.

```csharp
.EnsureSpace(50)
.Text("A long text here.");
```