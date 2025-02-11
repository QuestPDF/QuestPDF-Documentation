# Basics

This container consists of multiple page-related slots.

```c#
Document.Create(document =>
{
    document.Page(page =>
    {
        page.Size(PageSizes.A5);
        page.Margin(25);

        page.Header().Text("Header");

        page.Content().Text("Hello, World!");
        
        page.Footer()
            .PaddingTop(25)
            .AlignCenter()
            .Text(text =>
            {
                text.CurrentPageNumber();
                text.Span(" / ");
                text.TotalPages();
            });
    });
});
```

It is possible to create document with pages of different sizes:

```c#
Document.Create(document =>
{
    document.Page(page =>
    {
        page.Size(PageSizes.A4);
        page.Margin(25);

        page.Content().AlignCenter().AlignMiddle().Text("A4 PAGE");
    });

    document.Page(page =>
    {
        page.Size(PageSizes.A5.Landscape());
        page.Margin(25);

        page.Content().AlignCenter().AlignMiddle().Text("A5 PAGE");
    });
});
```