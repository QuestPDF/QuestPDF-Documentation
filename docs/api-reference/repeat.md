# Repeat

When designing a document, you may need certain elements—such as headers, footers, labels, or key terms—to be visible on every page where applicable. 
The Repeat element is designed to fulfill this requirement by rendering the specified content multiple times across different pages, rather than just once.


### Example

Please note that the term "Variable" is repeated across multiple pages.

```c#{24}
container
    .Decoration(decoration =>
    {
        var terms = new[]
        {
            ("Algorithm", "A precise set of instructions that defines a process for solving a specific problem or performing a computation. Algorithms are the foundation of programming and are used to optimize tasks efficiently."),
            ("Bug", "An error, flaw, or unintended behavior in a program that causes it to produce incorrect or unexpected results. Debugging is the process of identifying, analyzing, and fixing these issues to improve software reliability."),
            ("Variable", "A named storage location in memory that holds a value, which can be modified during program execution. Variables make code dynamic and flexible by allowing data manipulation and retrieval."),
            ("Compilation", "The process of transforming human-readable source code into machine code (binary instructions) that a computer can execute. This process is performed by a compiler and often includes syntax checks, optimizations, and linking dependencies.")
        };
        
        decoration.Before().Text("Terms and their definitions:").Bold();
        
        decoration.Content().PaddingTop(15).Column(column =>
        {
            foreach (var term in terms)
            {
                column.Item().Row(row =>
                {
                    row.RelativeItem(2)
                        .Border(1)
                        .Background(Colors.Grey.Lighten3)
                        .Padding(15)
                        .Repeat()
                        .Text(term.Item1);
                
                    row.RelativeItem(3)
                        .Border(1)
                        .Padding(15)
                        .Text(term.Item2);
                });
            }
        });
    });
```

### Without the Repeat element

![example](/api-reference/repeat-without-0.webp =600x)
![example](/api-reference/repeat-without-1.webp =600x)


### With the Repeat element

![example](/api-reference/repeat-with-0.webp =600x)
![example](/api-reference/repeat-with-1.webp =600x)

