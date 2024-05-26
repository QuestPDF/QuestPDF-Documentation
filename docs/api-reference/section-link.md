# SectionLink

- This container creates a link around its child area.
- It redirects the user to another location in the document.
- Specify the target location by providing a proper section name.
- The link always redirects the user to the beginning of the section.

```c#{1-1}
.SectionLink("links-chapter")
.Text("About internal links chapter");
```