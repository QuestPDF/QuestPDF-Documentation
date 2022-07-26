# SectionLink

- This container creates a link around its child area.
- It redirects the user to other place in the document.
- Specify target place by providing proper section name.
- The link always redirects the user to the very beginning of the section.

```csharp{1-1}
.SectionLink("links-chapter")
.Text("About internal links chapter");
```