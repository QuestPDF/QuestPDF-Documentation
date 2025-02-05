# Paragraph Style

## Text Alignment

Determines how text is positioned horizontally within its container.

```c#{3,10}
container
    .Text("Sample text")
    .AlignCenter();
    
// or

container
    .Text(text => 
    {
        text.AlignCenter();
        text.Span(Placeholders.Paragraph());
    });
```

Available alignment options:

| Alignment Type  | Description                                                                                                                                                                                                                    |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **AlignLeft**   | Aligns text horizontally to the left side.                                                                                                                                                                                     |
| **AlignCenter** | Aligns text horizontally to the center, ensuring equal space on both left and right sides.                                                                                                                                     |
| **AlignRight**  | Aligns content horizontally to the right side.                                                                                                                                                                                 |
| **AlignStart**  | Aligns the text horizontally to the start of the container. <br><br> This method sets the horizontal alignment of the text to the start (left for left-to-right languages, right for right-to-left languages).                 |
| **AlignEnd**    | Aligns the text horizontally to the end of the container. <br><br> This method sets the horizontal alignment of the text to the end (right for left-to-right languages, left for right-to-left languages).                     |
| **Justify**     | Justifies the text within its container. This method sets the horizontal alignment of the text to be justified, meaning it aligns along both the left and right margins, creating a clean, block-like appearance for the text. |

Example:

```c#{8,13,18,23}
.Column(column =>
{
    column.Spacing(20);
    
    column.Item()
        .Element(CellStyle)
        .Text("This is an example of left-aligned text, showcasing how the text starts from the left margin and continues naturally across the container.")
        .AlignLeft();

    column.Item()
        .Element(CellStyle)
        .Text("This text is centered within its container, creating a balanced look, especially for titles or headers.")
        .AlignCenter();

    column.Item()
        .Element(CellStyle)
        .Text("This example demonstrates right-aligned text, often used for dates, numbers, or aligning text to the right margin.")
        .AlignRight();

    column.Item()
        .Element(CellStyle)
        .Text("Justified text adjusts the spacing between words so that both the left and right edges of the text block are aligned, creating a clean, newspaper-like look.")
        .Justify();

    static IContainer CellStyle(IContainer container) 
        => container.Background(Colors.Grey.Lighten3).Padding(10);
});
```

![example](/api-reference/text-paragraph-alignment.webp =400x)


## Paragraph Spacing

Adjusts the vertical gap between successive paragraphs (separated by line breaks),
helping to visually separate blocks of text for improved readability.

```c#{3,10}
container
    .Text(Placeholders.Paragraphs())
    .ParagraphFirstLineIndentation(40);

// or

container
    .Text(text => 
    {
        text.ParagraphSpacing(20);
        text.Span(Placeholders.Paragraphs());
    });
```

![example](/api-reference/text-paragraph-spacing.webp =498x)


## First Line Indentation

Specifies the horizontal offset of the first line in a paragraph.
Commonly used to visually separate paragraphs in a block of text.

```c#{3,10}
container
    .Text(Placeholders.Paragraphs())
    .ParagraphFirstLineIndentation(40);

// or

container
    .Text(text => 
    {
        text.ParagraphFirstLineIndentation(20);
        text.Span(Placeholders.Paragraphs());
    });
```

![example](/api-reference/text-paragraph-first-line-indentation.webp =497x)


## Clamp Line With Ellipsis

Limits the number of visible lines in a paragraph, truncating overflow text with an ellipsis or by hiding it to maintain layout consistency.

```c#{17,25}
container
    .Column(column =>
    {
        column.Spacing(10);
    
        var paragraph = Placeholders.Paragraph();
    
        column.Item()
            .Background(Colors.Grey.Lighten3)
            .Padding(5)
            .Text(paragraph);
        
        column.Item()
            .Background(Colors.Grey.Lighten3)
            .Padding(5)
            .Text(paragraph)
            .ClampLines(3);
    });

// or

container
    .Text(text => 
    {
        text.ClampLines(3);
        text.Span(Placeholders.Paragraphs());
    });
```

![example](/api-reference/text-paragraph-clamp-lines.webp =599x)

It is also possible to customize the ellipsis:

```c#{3}
container
    .Text(Placeholders.Paragraph())
    .ClampLines(3, " [...]");
```

![example](/api-reference/text-paragraph-clamp-lines-custom-ellipsis.webp =574x)
