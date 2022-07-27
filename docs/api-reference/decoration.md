# Decoration

- This container consists of three slots: header, content and footer.
- The `Before` element is always visible above the content. When the element is visible on multiple pages, the `Before` element is going to be repeated on each page.
- The `Footer` element is always visible below the content. When the element is visible on multiple pages, the `Footer` element is going to be repeated on each page.
- The `Content` element is visible only once. It is often used along with content that spans multiple pages.

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