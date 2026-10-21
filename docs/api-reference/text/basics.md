# Text

## Simple usage

In most cases, text content can be added using the following shorthand. The text will inherit the default style.

<<< @/snippets/text/basic.cs{csharp}

![Without any styling, the text uses the default style: "Sample text" in regular black letters.](/api-reference/text-basic.webp){.example}

## Customization

The `Text` method returns a descriptor that allows further customization of the text style.

<<< @/snippets/text/customization.cs{7-8,12-14,18-20 csharp}

![Three grey boxes: the first text is blue, the second is bold and underlined, and the third is smaller and centred in its box.](/api-reference/text-basic-descriptor.webp){.example}


## Rich text formatting

It is also possible to format specific parts of the text content using spans:

<<< @/snippets/text/rich.cs{7,9,11,13 csharp}

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

<<< @/snippets/text/hyperlink.cs{8,10,12 csharp}

<object data="/api-reference/text-hyperlink.pdf" type="application/pdf" class="pdf-viewer">
  <p>Unable to display PDF file. <a href="/api-reference/text-hyperlink.pdf">Download</a> instead.</p>
</object>
