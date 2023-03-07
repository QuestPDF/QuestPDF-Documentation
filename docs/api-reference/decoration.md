# Decoration

- This container consists of the following three slots: `Before`, `Content` and `After`.
- The `Before` element is always visible above the content. When the element is visible on multiple pages, the `Before` element is repeated on each page.
- The `Content` element is visible only once. It is often used along with content that spans multiple pages.
- The `After` element is always visible below the content. When the element is visible on multiple pages, the `After` element is repeated on each page.

```csharp
.Decoration(decoration =>
{
    decoration
        .Before()
        .Background(Colors.Grey.Medium)
        .Padding(10)
        .Text("Notes")
        .FontSize(16).FontColor("#FFF");

    decoration
        .Content()
        .Background(Colors.Grey.Lighten3)
        .Padding(10)
        .ExtendVertical()
        .Text(Helpers.Placeholders.LoremIpsum());
});
```

![example](/api-reference/decoration.png =300x)