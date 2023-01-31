# Section

- This container marks its entire content as a named section.
- `Section` can span multiple pages depending on how much content is inside.
- You can create links in the document which redirect the user to the section.
- A `Section` also stores additional data, e.g. the start/end page, page length, etc. These values can be accessed within the `Text` element API.

```csharp{1-1}
.Section("links-chapter")
.Decoration(decoration =>
{
    decoration.Before().Text("About internal links");
    decoration.Content().Text("Some content");
});
```
