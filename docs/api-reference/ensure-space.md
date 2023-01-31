# Ensure space

When rendering multi-page content, you may want to ensure that an element's content uses at least a specified minimum space on each page. This can help prevent fragmentation of content.
For example, when rendering a table, it may be desirable to render at least 5 rows before a page break.
The `EnsureSpace` element guarantees that its child is rendered according to the space constraint that you specify.

```csharp
.EnsureSpace(100)
.Column(column =>
{
    // content
});
```

Example:
```csharp{11}
page.Content().Column(column =>
{
    column
        .Item()
        .ExtendHorizontal()
        .Height(75)
        .Background(Colors.Grey.Lighten2);
    
    column
        .Item()
        .EnsureSpace(100)
        .Text(Placeholders.LoremIpsum());
});
```

![example](/api-reference/ensure-space-first.png =300x)
![example](/api-reference/ensure-space-second.png =300x)

In the above example, the grey `Background` block takes a significant part of the page, leaving little space for the `Text` element. In fact, the remaining space is less than 100 points, so the `EnsureSpace` element forces a page break to ensure that its child has sufficient vertical space to render without fragmentation.

![example](/api-reference/ensure-space-off-first.png =300x)
![example](/api-reference/ensure-space-off-second.png =300x)