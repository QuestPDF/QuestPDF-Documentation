---
outline: false
---


# Stop paging

Renders the element exclusively on the first page. 
Any portion of the element that doesn't fit is omitted.

```c#{6}
const string bookDescription = "\"Master Modern C# Development\" is a comprehensive guide that takes you from the basics to advanced concepts in C# programming. Perfect for beginners and intermediate developers looking to enhance their skills with practical examples and real-world applications. Covering object-oriented programming, LINQ, asynchronous programming, and the latest .NET features, this book provides step-by-step explanations to help you write clean, efficient, and scalable code. Whether you're building desktop, web, or cloud applications, this resource equips you with the knowledge and best practices to become a confident C# developer.";

container
    .Width(400)
    .Height(300)
    .StopPaging()
    .Decoration(decoration =>
    {
        decoration.Before().Text("Book description:").Bold();
        decoration.Content().Text(bookDescription);
    });
```

#### Without StopPaging

<object data="/api-reference/stop-paging-disabled.pdf" type="application/pdf" class="pdf-viewer" style="height: 700px">
  <p>Unable to display PDF file. <a href="/api-reference/stop-paging-disabled.pdf">Download</a> instead.</p>
</object>

#### With StopPaging

<object data="/api-reference/stop-paging-enabled.pdf" type="application/pdf" class="pdf-viewer" style="height: 700px">
  <p>Unable to display PDF file. <a href="/api-reference/stop-paging-enabled.pdf">Download</a> instead.</p>
</object>