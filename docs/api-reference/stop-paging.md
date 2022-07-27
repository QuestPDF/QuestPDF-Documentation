# Stop paging

This container is active when its child requires more than one page to draw. Where the content spans multiple pages, only the first page is visibile. Rest of the content, that normally would be visible on the next pages, is omitted.

```csharp{20}
.Padding(25)
.DefaultTextStyle(x => x.FontSize(14))
.Decoration(decoration =>
{
    decoration
        .Before()
        .Text(text =>
        {
            text.DefaultTextStyle(x => x.SemiBold().FontColor(Colors.Blue.Medium));
            
            text.Span("Page ");
            text.CurrentPageNumber();
        });
    
    decoration
        .Content()
        .Column(column =>
        {
            column.Spacing(25);
            column.Item().StopPaging().Text(Placeholders.LoremIpsum());
            column.Item().ExtendHorizontal().Height(75).Background(Colors.Grey.Lighten2);
        });
});
```

First, let's analyse the results where the `StopPaging` element is **NOT** applied. Part of the text is moved to the next page:

![example](/api-reference/stop-paging-without-1.png =300x)
![example](/api-reference/stop-paging-without-2.png =300x)

However, where the `StopPaging` **IS** applied, the text that does not fit on the first page, is omitted. This behaviour is true for all structures that span multiple pages.

![example](/api-reference/stop-paging-with-1.png =300x)
![example](/api-reference/stop-paging-with-2.png =300x)