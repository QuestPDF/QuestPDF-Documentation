# Achieving different header/footer on the first page

It is a common requirement to have a special header on the first page on your document. Then all consecutive pages should have a normal header. This requirement can be easily achieved by using the `ShowOnce` and tge `SkipOnce` elements, like so:

```csharp{8-9}
container.Page(page =>
{
    page.Size(PageSizes.A6);
    page.Margin(30);
    
    page.Header().Column(column =>
    {
        column.Item().ShowOnce().Background(Colors.Blue.Lighten2).Height(60);
        column.Item().SkipOnce().Background(Colors.Green.Lighten2).Height(40);
    });
    
    page.Content().PaddingVertical(10).Column(column =>
    {
        column.Spacing(10);

        foreach (var _ in Enumerable.Range(0, 13))
            column.Item().Background(Colors.Grey.Lighten2).Height(40);
    });
    
    page.Footer().AlignCenter().Text(text =>
    {
        text.DefaultTextStyle(x => x.Size(16));
        
        text.CurrentPageNumber();
        text.Span(" / ");
        text.TotalPages();
    });
});
```

The code above produces the following results:

![example](/images/patterns-and-practices/special-header-on-first-page-1.png =297x)
![example](/images/patterns-and-practices/special-header-on-first-page-2.png =297x)
![example](/images/patterns-and-practices/special-header-on-first-page-3.png =297x)

::: tip
Please notice that you can use the `SkipOnce` and `ShowOnce` elements multiple times to achieve more complex requirements. For example:
1) `.SkipOnce().ShowOnce()` displays child element only on the second page.
2) `.SkipOnce().SkipOnce()` displays child element starting at third page.
3) `.ShowOnce().SkipOnce()` displays nothing (invocation order is important!).
   :::