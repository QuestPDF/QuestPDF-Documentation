# Page

This container allows you to define your page layout by configuring margins, watermarks, and different content sections such as header, footer, and the main content area. 
You can easily create pages of various sizes and orientations while controlling text styles and content direction.

Below is a minimal example showing how to create a simple document with a header, main content, and footer.

```c#
Document.Create(document =>
{
    document.Page(page =>
    {
        page.Size(PageSizes.A4);
        page.Margin(2, Unit.Centimetre);
        page.DefaultTextStyle(x => x.FontSize(24));

        page.Header()
            .Text("Hello, World!")
            .FontSize(48).Bold();

        page.Content()
            .PaddingVertical(25)
            .Text(Placeholders.LoremIpsum())
            .Justify();

        page.Footer()
            .AlignCenter() 
            .Text(text =>
            {
                text.CurrentPageNumber();
                text.Span(" / ");
                text.TotalPages();
            });
    });
})
```

![example](/api-reference/page-simple.webp =396x)
