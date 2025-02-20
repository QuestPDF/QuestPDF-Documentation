# Placeholder

The Placeholder element is a simple utility for prototyping and layout visualization. 
It helps structure document layouts by displaying either a provided text label or a default icon when no text is specified.

By default, Placeholder fills the designated space with an icon. If a text value is provided, it displays the specified text instead.


### Size

You can adjust the size of the Placeholder by chaining layout-modifying elements before its invocation.

```c#
container
    .Width(200)
    .Height(100)
    .Placeholder("Sample text");
```


### Example

```c#{12,16,20}
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Size(PageSizes.A5);
            page.DefaultTextStyle(x => x.FontSize(20));
            page.Margin(25);

            page.Header()
                .Height(100)
                .Placeholder("Header");
            
            page.Content()
                .PaddingVertical(25)
                .Placeholder();
            
            page.Footer()
                .Height(100)
                .Placeholder("Footer");
        });
    })
    .GeneratePdf("placeholder.pdf");
```

![example](/api-reference/placeholder-element.webp =420x)