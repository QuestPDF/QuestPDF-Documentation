# Show entire

The ShowEntire element is designed to ensure that specific content remains on a single page, preventing it from being split across multiple pages.

While many elements within the library naturally support paging, allowing content to flow seamlessly across pages, ShowEntire enforces strict page constraints to maintain visual cohesiveness. 
This can be particularly useful when presenting structured data, tables, or definitions that should remain uninterrupted for clarity and readability.

::: warning
The ShowEntire element imposes strict space constraints, which may lead to a DocumentLayoutException if the content exceeds the page's capacity. 
Ensure that the enclosed content fits within a single page to avoid errors.
:::


### Example

The following example demonstrates how to use the ShowEntire element to create a glossary where each term and its definition remain together on the same page:

```c#{21}
container
    .Decoration(decoration =>
    {
        var terms = new[]
        {
            ("Function", "A reusable block of code designed to perform a specific task. Functions take input parameters, process them, and return results, making code modular, readable, and maintainable. They are an essential component of all programming languages."),
            ("Recursion", "A programming technique where a function calls itself in order to solve a problem by breaking it down into smaller, similar subproblems. Recursion is often used for complex algorithms, such as searching, sorting, and tree traversal."),
            ("Framework", "A pre-built collection of code, tools, and best practices that provides a structured foundation for developing software. Frameworks simplify development by handling common functionalities, such as database access, user authentication, and UI rendering."),
            ("Package", "A self-contained collection of code, typically consisting of functions, classes, and modules, that provides specific functionality. Packages help organize large projects and allow developers to reuse and distribute their code easily."),
        };
        
        decoration.Before().Text("Terms and their definitions:").FontSize(24).Bold().Underline();
        
        decoration.Content().PaddingTop(15).Column(column =>
        {
            column.Spacing(15);
            
            foreach (var term in terms)
            {
                column.Item()
                    .ShowEntire()
                    .Text(text =>
                    {
                        text.Span(term.Item1).Bold().FontColor(Colors.Blue.Darken2);
                        text.Span($" - {term.Item2}");
                    });
            }
        });
    });
```


### Without the ShowEntire element

![example](/api-reference/show-entire-without-0.webp =500x)
![example](/api-reference/show-entire-without-1.webp =500x)


### With the ShowEntire element

![example](/api-reference/show-entire-with-0.webp =500x)
![example](/api-reference/show-entire-with-1.webp =500x)
```
