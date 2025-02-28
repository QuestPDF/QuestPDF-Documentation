# Skip once

If the container spans multiple pages, its content is omitted on the first page and then displayed on the second and subsequent pages.

A common use-case for this element is when displaying a consistent header across pages but needing to conditionally show/hide specific fragments on the first page.

The SkipOnce element provides control over content visibility across multiple pages.
When applied to content that spans multiple pages, it hides the content on its first occurrence and displays it on subsequent pages.

This element is particularly useful when you need different content on the first page compared to following pages, such as headers or watermarks that should appear only on continuation pages.

::: tip
Combine this element with SkipOnce to achieve more complex behaviors, e.g.:
- `container.SkipOnce().ShowOnce()` ensures the child element is displayed only on the second page.
- `container.SkipOnce().SkipOnce()` starts displaying the child element from the third page onwards.
- `container.ShowOnce().SkipOnce()` draws nothing, as the order of invocation is important.
:::


### Example

TODO: add explanation

```c#{22,24}
container
    .Column(column =>
    {
        var terms = new[]
        {
            ("Repository", "A centralized storage location for source code and related files, typically managed using version control systems like Git. Repositories allow multiple developers to collaborate on projects, track changes, and maintain version history."),
            ("Version Control", "A system that tracks changes to code over time, enabling developers to collaborate efficiently, revert to previous versions, and maintain a structured development workflow. Popular version control tools include Git, Mercurial, and Subversion."),
            ("Abstraction", "A programming concept that hides complex implementation details and exposes only the necessary parts. Abstraction helps simplify code and allows developers to focus on high-level design rather than low-level implementation details."),
            ("Namespace", "A container that groups related identifiers, such as variables, functions, and classes, to prevent naming conflicts in a program. Namespaces are commonly used in large projects to organize code efficiently."),
        };
        
        column.Spacing(15);
        
        foreach (var term in terms)
        {
            column.Item().Decoration(decoration =>
            {
                decoration.Before()
                    .DefaultTextStyle(x => x.FontSize(24).Bold().FontColor(Colors.Blue.Darken2))
                    .Column(innerColumn =>
                    {
                        innerColumn.Item().ShowOnce().Text(term.Item1);
                        
                        innerColumn.Item().SkipOnce().Text(text =>
                        {
                            text.Span(term.Item1);
                            text.Span(" (continued)").Light().Italic();
                        });
                    });

                decoration.Content().Text(term.Item2);
            });
        }
    });
```

![example](/api-reference/skip-once-0.webp =500x)
![example](/api-reference/skip-once-1.webp =500x)
