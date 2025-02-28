---
outline: false
---


# Prevent page break

Attempts to keep the container's content together on its first page of occurrence.
If the content does not fit entirely on that page, it is moved to the next page.
If it spans multiple pages, all subsequent pages are rendered as usual without restriction.


## Example

This method is useful for ensuring that content remains visually coherent and is not arbitrarily split.

```c#{7}
container.Column(column =>
{
    column.Item().Height(400).Background(Colors.Grey.Lighten3);
    column.Item().Height(30);

    column.Item()
        .PreventPageBreak()
        .Text(text =>
        {
            text.ParagraphSpacing(15);
            
            text.Span("Optimizing Content Placement").Bold().FontColor(Colors.Blue.Darken2).FontSize(24);
            text.Span("\n");
            text.Span("By carefully determining where to place a page break, you can avoid awkward text separations and maintain readability. Thoughtful formatting improves the overall user experience, making complex topics easier to digest.");
        });
}); 
```

#### Without PreventPageBreak

<object data="/api-reference/prevent-page-break-disabled.pdf" type="application/pdf" class="pdf-viewer" style="height: 700px">
  <p>Unable to display PDF file. <a href="/api-reference/prevent-page-break-disabled.pdf">Download</a> instead.</p>
</object>

#### With PreventPageBreak

<object data="/api-reference/prevent-page-break-enabled.pdf" type="application/pdf" class="pdf-viewer" style="height: 700px">
  <p>Unable to display PDF file. <a href="/api-reference/prevent-page-break-enabled.pdf">Download</a> instead.</p>
</object>
