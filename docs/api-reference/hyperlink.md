# Hyperlink

The Hyperlink element creates a clickable area that redirects the user to a designated webpage.

### Content

Hyperlink can span any content, including text, images, or other elements.

```c#{10}
.Column(column =>
{
    column.Spacing(25);
    
    column.Item()
        .Text("Clicking the NuGet logo will redirect you to the NuGet website.");

    column.Item()
        .Width(150)
        .Hyperlink("https://www.nuget.org/")
        .Svg("Resources/nuget-logo.svg");
});
```

<object data="/api-reference/hyperlink-element.pdf" type="application/pdf" class="pdf-viewer" style="height: 230px">
  <p>Unable to display PDF file. <a href="/api-reference/hyperlink-element.pdf">Download</a> instead.</p>
</object>


### Inside text

Hyperlinks can also be placed inside text elements.

```c#{5}
container
    .Text(text =>
    {
        text.Span("Click ");
        text.Hyperlink("here", "https://www.nuget.org/").Underline().FontColor(Colors.Blue.Darken2);
        text.Span(" to visit the official NuGet website.");
    });
```

<object data="/api-reference/hyperlink-text.pdf" type="application/pdf" class="pdf-viewer" style="height: 135px">
  <p>Unable to display PDF file. <a href="/api-reference/hyperlink-text.pdf">Download</a> instead.</p>
</object>