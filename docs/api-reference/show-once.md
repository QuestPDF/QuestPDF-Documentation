# Show once

- This container changes the default rendering behaviour.
- Its child, once fully rendered, is not going to be present on next pages.
- Useful when creating tables. In such a case, the table structure should be visible on each page but the content inside the cell should not be repeated.

```csharp
.ShowOnce()
```

Example:
```csharp{7}
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

Please also consider an effect without the ShowOnce element applied. Please notice that the content in the right column was paged and took two pages. Therefore, the Row element (parent) also got paged, and as a result, left column was repeated twice:

![example](/api-reference/show-once-off-first.png =300x)
![example](/api-reference/show-once-off-second.png =300x)