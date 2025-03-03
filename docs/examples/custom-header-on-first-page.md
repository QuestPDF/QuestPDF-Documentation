# Customizing Header/Footer on the first page

A common requirement in document design is to create a distinct header for the first page, with all subsequent pages sharing a standard header format. 
This can be easily accomplished using the [ShowOnce](/api-reference/show-once) and [SkipOnce](/api-reference/skip-once) elements in QuestPDF.

```c#{10-15}
Document
   .Create(document =>
   {
       document.Page(page =>
       {
           page.Size(PageSizes.A5);
           page.Margin(30);
           page.DefaultTextStyle(x => x.FontSize(20));

           page.Header().Column(column =>
           {
               column.Item().ShowOnce().Background(Colors.Blue.Lighten2).Height(80);
               column.Item().SkipOnce().Background(Colors.Green.Lighten2).Height(60);
           });

           page.Content().PaddingVertical(20).Column(column =>
           {
               column.Spacing(20);

               foreach (var _ in Enumerable.Range(0, 20))
                   column.Item().Background(Colors.Grey.Lighten3).Height(40);
           });

           page.Footer().AlignCenter().Text(text =>
           {
               text.CurrentPageNumber();
               text.Span(" / ");
               text.TotalPages();
           });
       });
   })
   .GeneratePdf("custom-header-on-first-page.pdf");
```

The code above produces the following results:

<object data="/patterns-and-practices/example-custom-header-on-first-page.pdf" type="application/pdf" class="pdf-viewer" style="height: 700px">
  <p>Unable to display PDF file. <a href="/patterns-and-practices/example-custom-header-on-first-page.pdf">Download</a> instead.</p>
</object>
