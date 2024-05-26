# Show once

- This container changes the default rendering behaviour.
- Its child, once fully rendered, does not appear on subsequent pages.
- This is useful when creating tables. In this case, the table *structure* is visible on each page but the *content* inside the cell is not repeated.

```c#
.ShowOnce()
```

Example:
```c#{7}
page.Content().PaddingVertical(5).Row(row =>
{
    row.RelativeItem()
        .Background(Colors.Grey.Lighten2)
        .Border(1)
        .Padding(5)
        .ShowOnce()
        .Text(Placeholders.Label());
    
    row.RelativeItem(2)
        .Border(1)
        .Padding(5)
        .Text(Placeholders.Paragraph());
});
```

![example](/api-reference/show-once-first.png =300x)
![example](/api-reference/show-once-second.png =300x)

Please also consider the result of *omitting* the `ShowOnce` element. Note that the content in the right column was paged and took two pages. Therefore, the `Row` element (parent) was also paged, and as a result, the left column was repeated twice:

![example](/api-reference/show-once-off-first.png =300x)
![example](/api-reference/show-once-off-second.png =300x)