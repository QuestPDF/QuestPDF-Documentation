---
outline: false
---


# Show entire

The ShowEntire element prevents its content from being split across multiple pages. 
If there isn't enough space on the current page, the entire content block is moved to the next page. 
This is particularly useful when you want to ensure that certain content remains visually cohesive and appears on a single page.

```c#
container
    .ShowEntire()
    // element that will not be paged
```


## Example

For example, when working with tables, images, or complex layouts, you might want to prevent them from being split between pages for better readability and visual appearance.
The ShowEntire element helps achieve this by enforcing strict space constraints.

```c#{2}
container
    .ShowEntire()
    .Border(1)
    .Padding(10)
    .Column(column =>
    { 
        column.Item().Text("Invoice Summary");
        column.Item().Text($"Total amount: $1,250.00");
        column.Item().Text($"Due date: {DateTime.Now:d}");
    });
```


<!--@include: tip-layout-constraints.md-->
