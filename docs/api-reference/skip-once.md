# Skip once

- This container changes the default rendering behaviour.
- Its child is not visible on the first occurrence page.
- If the parent is visible on more than one page, the element is visible on the second page of occurrence and all following ones.

```csharp
.SkipOnce()
```

Example:
```csharp{9-12,14-17}
.RenderDocument(container =>
{
    container.Page(page =>
    {
        // page configuration details

        page.Header().Column(column =>
        {
            column
                .Item()
                .ShowOnce()
                .Text("This header is visible on the first page.");
                
            column
                .Item()
                .SkipOnce()
                .Text("This header is visible on the second page and all following.");
        });
        
        page.Content()
            .PaddingVertical(10)
            .Text(Placeholders.Paragraphs())
            .FontColor(Colors.Grey.Medium);
        
        page.Footer().Text(text =>
        {
            text.Span("Page ");
            text.CurrentPageNumber();
            text.Span(" out of ");
            text.TotalPages();
        });
    });
})
```

![example](/api-reference/skip-once-first.png =300x)
![example](/api-reference/skip-once-second.png =300x)
