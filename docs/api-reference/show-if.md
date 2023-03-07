# Show if

This container allows you to show/hide its child based on a condition. The `ShowIf` component can provide the syntactic sugar needed to achieve this without breaking the fluent API chain as illustrated below:

```csharp
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