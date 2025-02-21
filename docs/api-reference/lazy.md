---
outline: false
---


# Lazy

When generating large PDF documents with thousands of pages, memory consumption becomes a critical concern. 
QuestPDF provides specialized elements to optimize memory usage by deferring content creation until it is actually needed. 
This reduces the lifetime of objects, allowing for more efficient garbage collection and lowering the risk of out-of-memory errors.


## Available Approaches

There are two primary approaches to optimize memory usage when generating large documents:

- **The Lazy element** defers the construction of document elements until they are required for rendering. 
  This means that instead of preloading and storing all content in memory at once, only the necessary elements are created dynamically when needed.

  The Lazy element achieves this by providing a delegate function which is executed later during the document generation process.

- **The LazyWithCache element** introduces an additional performance benefit: previously rendered sections are cached, reducing the recomputation overhead when revisiting pages. 
However, this may lead to higher native memory usage due to caching mechanisms.


## Example

This example uses a simple component generating a list of numbers from a specified range.
It simulates a typical text-heavy content generation scenario.

```c#{8-19}
class SimpleComponent : IComponent
{
    public required int Start { get; init; }
    public required int End { get; init; }
    
    public void Compose(IContainer container)
    {
        container.Decoration(decoration =>
        {
            decoration.Before()
                .Text($"Numbers from {Start} to {End}")
                .FontSize(20).Bold().FontColor(Colors.Blue.Darken2);
        
            decoration.Content().Column(column =>
            {
                foreach (var i in Enumerable.Range(Start, End - Start + 1))
                    column.Item().Text($"Number {i}").FontSize(10);
            });
        });
    }
}
```

### Normal Approach

This approach does not use any optimization techniques and generates the entire document at once.
It is typically used for small documents or when memory usage is not a concern.

```c#{10-19}
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Margin(10);

            page.Content().Column(column =>
            {
                const int sectionSize = 1000;
                
                foreach (var i in Enumerable.Range(0, 1000))
                {
                    column.Item().Component(new SimpleComponent
                    {
                        Start = i * sectionSize,
                        End = i * sectionSize + sectionSize - 1
                    });
                }
            });
        });
    })
    .GeneratePdf("lazy-disabled.pdf");
```

### Lazy Approach

This approach uses the Lazy element to defer the creation of content until it is needed.

```c#{17-24}
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Margin(10);

            page.Content().Column(column =>
            {
                const int sectionSize = 1000;

                foreach (var i in Enumerable.Range(0, 1000))
                {
                    var start = i * sectionSize;
                    var end = start + sectionSize - 1;

                    column.Item().Lazy(c =>
                    {
                        c.Component(new SimpleComponent
                        {
                            Start = start,
                            End = end
                        });
                    });
                }
            });
        });
    })
    .GeneratePdf("lazy-enabled.pdf");
```

### LazyWithCache Approach

This approach uses the LazyWithCache element to defer the creation of content and cache previously rendered sections.

```c#{17-24}
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Margin(10);

            page.Content().Column(column =>
            {
                const int sectionSize = 1000;

                foreach (var i in Enumerable.Range(0, 1000))
                {
                    var start = i * sectionSize;
                    var end = start + sectionSize - 1;

                    column.Item().LazyWithCache(c =>
                    {
                        c.Component(new SimpleComponent
                        {
                            Start = start,
                            End = end
                        });
                    });
                }
            });
        });
    })
    .GeneratePdf("lazy-enabled-with-cache.pdf");
```


### Observed results

Please analyze the following results to understand the performance benefits of each approach:

| Approach          | Time | Memory |
|-------------------|------|--------|
| **Normal**        | 24s  | 950 MB |
| **Lazy**          | 32s  | 120 MB |
| **LazyWithCache** | 18s  | 480 MB |

Understanding when and how to use these elements is key to improving both document generation speed and resource management.
