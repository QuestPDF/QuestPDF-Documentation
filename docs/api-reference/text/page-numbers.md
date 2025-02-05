# Page Numbers

## Document related

The following methods allow you to inject page numbers into any text container.

| Method                       | Description                                                                                                                                                                                      |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **CurrentPageNumber**        | Appends text showing the current page number.                                                                                                                                                    |
| **TotalPages**               | Appends text showing the total number of pages in the document.                                                                                                                                  |

```c#{13-18}
Document.Create(document =>
{
    document.Page(page =>
    {
        page.Size(PageSizes.A5);
        page.Margin(25);

        // content
        
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

![example](/api-reference/text-page-number.webp =420x)


## Section related

The following methods allow you to display page numbers relative to a specific section of the document.

| Method                       | Description                                                                                                                                                                                      |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **BeginPageNumberOfSection** | Appends text showing the number of the first page of the specified <see cref="ElementExtensions.Section">Section</see>.                                                                          |
| **EndPageNumberOfSection**   | Appends text showing the number of the last page of the specified <see cref="ElementExtensions.Section">Section</see>.                                                                           |
| **PageNumberWithinSection**  | Appends text showing the page number relative to the beginning of the given <see cref="ElementExtensions.Section">Section</see>. For a section spanning pages 20 to 50, page 35 will show as 15. |
| **TotalPagesWithinSection**  | Appends text showing the total number of pages within the given <see cref="ElementExtensions.Section">Section</see>. For a section spanning pages 20 to 50, the total is 30 pages.               |

::: tip
[Section](/api-reference/section) defines part of the document that can be further referenced by name, e.g. for page numbering or linking.
:::

First, define a section somewhere in the document:

```c#{2}
container
    .Section("customSection")
    // content of custom section
```

Then, refer to this location position in your list of contents:

```c#
container
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

## Custom formatting

It is possible to format page numbers to a specified format, e.g. with leading zeros or as Roman numerals.

```c#{4}
container
    .Text(text =>
    {
        text.CurrentPageNumber().Format(FormatWithLeadingZeros);
    });

// helper function
static string FormatWithLeadingZeros(int? pageNumber)
{
    const int expectedLength = 3;
    pageNumber ??= 1;
    return pageNumber.Value.ToString($"D{expectedLength}");
}
```

::: warning
Please note that the formatting function accepts a nullable integer (int?). 
QuestPDF employs a two-pass rendering algorithm, meaning that page numbers are only determined during the second pass. 
During the first pass, your formatting method will receive null, indicating that the page number has not yet been determined. 
Please ensure that any text you return matches the expected output length.
:::