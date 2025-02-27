# Ensure space

This element helps maintain visual consistency by shifting content to the next page when there is insufficient space available.

There are two ways to use this element:
1)  **Without minimal height** - this option is useful when you want to prevent content from being split across multiple pages.

    ```c#
    container
        .EnsureSpace()
        // content
    ```

2)  **With minimal height** - This option is particularly useful for structured elements like tables, where displaying only a single row at the bottom of a page could negatively impact readability. 
    The argument represents the minimum height in points that the element should occupy on a page.

    ```c#
    container
        .EnsureSpace(200) 
        // content
    ```



### Example

```c#{7}
container.Column(column =>
{
    column.Item().Text(Placeholders.LoremIpsum()).FontColor(Colors.Grey.Medium).Light();
    column.Item().Height(20); 
    
    column.Item()
        .EnsureSpace()
        .Table(table =>
        {
            table.ColumnsDefinition(columns =>
            {
                columns.ConstantColumn(40);
                columns.RelativeColumn();
            });

            foreach (var i in Enumerable.Range(1, 12))
            {
                table.Cell().Text($"{i}.");
                table.Cell().Text(Placeholders.Sentence());
            }
        });
});
```

#### Without EnsureSpace

<object data="/api-reference/ensure-space-disabled.pdf" type="application/pdf" class="pdf-viewer" style="height: 700px">
  <p>Unable to display PDF file. <a href="/api-reference/ensure-space-disabled.pdf">Download</a> instead.</p>
</object>

#### With EnsureSpace

<object data="/api-reference/ensure-space-enabled.pdf" type="application/pdf" class="pdf-viewer" style="height: 700px">
  <p>Unable to display PDF file. <a href="/api-reference/ensure-space-enabled.pdf">Download</a> instead.</p>
</object>