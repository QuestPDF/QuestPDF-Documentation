# Page break

The Page Break feature allows you to control the layout of your document by forcing content to start on a new page. 
This is useful for separating sections, improving readability, and ensuring that specific elements appear on dedicated pages. 

In the example below, we generate a programming dictionary where each term appears on its own page.

```c#{28}
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Size(300, 450);
            page.DefaultTextStyle(x => x.FontSize(20));
            page.Margin(25);

            page.Content()
                .PaddingTop(15)
                .Column(column =>
                {
                    var terms = new[]
                    {
                        ("Garbage Collection", "An automatic memory management feature in many programming languages that identifies and removes unused objects to free up memory, preventing memory leaks."),
                        ("Constructor", "A special method in object-oriented programming that is automatically called when an object is created. It initializes the object's properties and sets up any necessary resources."),
                        ("Dependency", "A software component or external library that a program relies on to function correctly. Dependencies can include third-party modules, frameworks, or system-level packages that provide additional functionality without requiring developers to write everything from scratch.")
                    };
                    
                    column.Item()
                        .Extend()
                        .AlignCenter().AlignMiddle()
                        .Text("Programming dictionary").FontSize(24).Bold();
                    
                    foreach (var term in terms)
                    {
                        column.Item().PageBreak();
                        column.Item().Element(c => GeneratePage(c, term.Item1, term.Item2));
                    }

                    static void GeneratePage(IContainer container, string term, string definition)
                    {
                        container.Text(text =>
                        {
                            text.Span(term).Bold().FontColor(Colors.Blue.Darken2);
                            text.Span($" - {definition}");
                        });
                    }
                });
        });
    })
    .GeneratePdf("page-break.pdf");
```

<object data="/api-reference/page-break.pdf" type="application/pdf" class="pdf-viewer">
  <p>Unable to display PDF file. <a href="/api-reference/page-break.pdf">Download</a> instead.</p>
</object>