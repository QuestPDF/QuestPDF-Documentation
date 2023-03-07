# Hyperlink

- This container creates a hyperlink around its child area.
- The container redirects the user outside the document, e.g. to the webpage.
- `Hyperlink` can be used on any content, e.g. text, image or even complex structures like tables.

```csharp{2-2}
.Padding(10)
.Hyperlink("https://www.questpdf.com")
.Text("QuestPDF Webpage");
```
