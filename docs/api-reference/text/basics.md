# Text

## Simple usage

In most cases, text content can be added using the following shorthand. The text will inherit the default style.

```csharp
container
    .Text("Hello, World!");
```

![Without any styling, the text uses the default style: "Sample text" in regular black letters.](/api-reference/text-basic.webp){.example}

## Customization

The `Text` method returns a descriptor that allows further customization of the text style.

```csharp{7-8,12-14,18-20}
.Column(column =>
{
    column.Spacing(10);

    column.Item()
        .Element(CellStyle)
        .Text("Text with blue color")
        .FontColor(Colors.Blue.Darken1);

    column.Item()
        .Element(CellStyle)
        .Text("Bold and underlined text")
        .Bold()
        .Underline();

    column.Item()
        .Element(CellStyle)
        .Text("Centered small text")
        .FontSize(12)
        .AlignCenter();

    static IContainer CellStyle(IContainer container) =>
        container.Background(Colors.Grey.Lighten3).Padding(10);
});
```

![Three grey boxes: the first text is blue, the second is bold and underlined, and the third is smaller and centred in its box.](/api-reference/text-basic-descriptor.webp){.example}


## Rich text formatting

It is also possible to format specific parts of the text content using spans:

```csharp{5,7,9,11}
container
    .Text(text =>
    {
        text.Span("The ");
        text.Span("chemical formula").Underline();
        text.Span(" of ");
        text.Span("sulfuric acid").BackgroundColor(Colors.Amber.Lighten3);
        text.Span(" is H");
        text.Span("2").Subscript();
        text.Span("SO");
        text.Span("4").Subscript();
        text.Span(".");
    });
```

![One sentence with mixed formatting: "chemical formula" is underlined, "sulfuric acid" has a yellow highlight, and the 2 and 4 in H2SO4 are subscript.](/api-reference/text-rich.webp){.example}


## Typography pattern

The typography pattern helps maintain consistent text styling across your documents.

```csharp
public static class Typography
{
    public static TextStyle Title => TextStyle
        .Default
        .FontFamily("Helvetica")
        .FontColor(Colors.Black)
        .FontSize(20)
        .Bold();

    public static TextStyle Headline => TextStyle
        .Default
        .FontFamily("Helvetica")
        .FontColor(Colors.Blue.Medium)
        .FontSize(14);

    public static TextStyle Normal => TextStyle
        .Default
        .FontFamily("Helvetica")
        .FontColor("#000000")
        .FontSize(10)
        .LineHeight(1.25f)
        .AlignLeft();
}

```

Then, a predefined typography can be used in the following way:

```csharp{3}
container
    .Text("Report #123")
    .Style(Typography.Title);
    
// instead of

container    
    .Text("Report #123")
    .FontFamily("Helvetica")
    .FontColor(Colors.Black)
    .FontSize(20)
    .Bold();
```


## Hyperlinks

Hyperlink is a clickable text that redirects the user to a specific webpage.

```csharp{8,10,12}
.Text(text =>
{
    var hyperlinkStyle = TextStyle.Default
        .FontColor(Colors.Blue.Medium)
        .Underline();

    text.Span("To learn more about QuestPDF, please visit its ");
    text.Hyperlink("homepage", "https://www.questpdf.com/").Style(hyperlinkStyle);
    text.Span(", ");
    text.Hyperlink("GitHub repository", "https://github.com/QuestPDF/QuestPDF").Style(hyperlinkStyle);
    text.Span(" and ");
    text.Hyperlink("NuGet package page", "https://www.nuget.org/packages/QuestPDF").Style(hyperlinkStyle);
    text.Span(".");
});
```

<object data="/api-reference/text-hyperlink.pdf" type="application/pdf" class="pdf-viewer">
  <p>Unable to display PDF file. <a href="/api-reference/text-hyperlink.pdf">Download</a> instead.</p>
</object>
