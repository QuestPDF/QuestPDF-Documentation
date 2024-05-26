# Merging documents

## Original page numbers

Each document is considered as separate in terms of page numbering.
That means, all page number related APIs will return values based on original documents.
All documents will simply be merged together.

For example: let's suppose that two documents are merged, first with 2 pages and second with 3 pages.
The resulting document will have 5 pages, and page numbers will be: 1, 2, 1, 2, 3.

```c#{6}
Document
    .Merge(
        GenerateReport("Short Document 1", 5),
        GenerateReport("Medium Document 2", 10),
        GenerateReport("Long Document 3", 15))
    .UseOriginalPageNumbers()
    .GeneratePdf("merged.pdf");
```

<object data="/api-reference/document-merge-original.pdf" type="application/pdf" class="pdf-viewer">
  <p>Unable to display PDF file. <a href="/api-reference/document-merge-original.pdf">Download</a> instead.</p>
</object>


## Continuous page numbers

Content from all documents will be merged together, and considered as one/single document. 
That means, all page number related APIs will return continuous numbers.

For example: let's suppose that two documents are merged, first with 2 pages and second with 3 pages.
The resulting document will have 5 pages, and page numbers will be: 1, 2, 3, 4, 5.

```c#{6}
Document
    .Merge(
        GenerateReport("Short Document 1", 5),
        GenerateReport("Medium Document 2", 10),
        GenerateReport("Long Document 3", 15))
    .UseContinuousPageNumbers()
    .GeneratePdf("merged.pdf");
```

<object data="/api-reference/document-merge-continuous.pdf" type="application/pdf" class="pdf-viewer">
  <p>Unable to display PDF file. <a href="/api-reference/document-merge-continuous.pdf">Download</a> instead.</p>
</object>


## Generating sample document

The following code is used to generate sample documents that will be merged together.

```c#
static Document GenerateReport(string title, int itemsCount)
{
    return Document.Create(document =>
    {
        document.Page(page =>
        {
            page.Size(PageSizes.A5);
            page.Margin(0.5f, Unit.Inch);
            
            page.Header()
                .Text(title)
                .Bold()
                .FontSize(24)
                .FontColor(Colors.Blue.Accent2);
            
            page.Content()
                .PaddingVertical(20)
                .Column(column =>
                {
                    column.Spacing(10);

                    foreach (var i in Enumerable.Range(0, itemsCount))
                    {
                        column
                            .Item()
                            .Width(200)
                            .Height(50)
                            .Background(Colors.Grey.Lighten3)
                            .AlignMiddle()
                            .AlignCenter()
                            .Text($"Item {i}")
                            .FontSize(16);
                    }
                });
            
            page.Footer()
                .AlignCenter()
                .PaddingVertical(20)
                .Text(text =>
                {
                    text.DefaultTextStyle(TextStyle.Default.FontSize(16));
                    
                    text.CurrentPageNumber();
                    text.Span(" / ");
                    text.TotalPages();
                });
        });
    });
}
```