---
outline: false
description: "`ShowIf(bool)` shows or hides content at compose time. The `ShowIf(ctx => ...)` overload decides per page, but conditions on `TotalPages` are unreliable (e.g. \"only on the last page\" never shows with default settings)."
---


# Show if

The ShowIf element provides a simple way to conditionally display or hide content without breaking the fluent API chain. 
This is particularly useful when you need to show or hide sections of your document based on runtime conditions.


```csharp{8-11,19}
var condition = numberOfElements > 5;

// c# if-statement approach
.Row(row =>
{
    row.RelativeItem().Text("One");

    var secondColumn = row.RelativeItem();

    if (condition)
        secondColumn.Text("Two");
});

// equivalent fluent approach
.Row(row =>
{
    row.RelativeItem().Text("One");
    
    row.RelativeItem().ShowIf(condition).Text("Two");
});
```