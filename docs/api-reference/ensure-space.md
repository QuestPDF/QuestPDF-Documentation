# Ensure space

Sometimes when rendering multi-page content, we want to make sure that the element on each page takes some minimal space.
For example, when rendering a table, you may want to show at least 5 rows.
The EnsureSpace element makes sure that if its child is going to take more pages, it has enough space on its page.

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

![example](/images/api-reference/ensure-space-first.png =300x)
![example](/images/api-reference/ensure-space-second.png =300x)

Please notice that in the example above, the grey block takes a significant part of the page. There is not much space left for the Text element. In fact, there is less than 100 points. Therefore, the EnsureSpace element decides to wrap to the next page and make sure that its child has enough vertical space to render.

![example](/images/api-reference/ensure-space-off-first.png =300x)
![example](/images/api-reference/ensure-space-off-second.png =300x)