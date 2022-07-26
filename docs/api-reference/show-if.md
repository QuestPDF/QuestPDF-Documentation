# Show if

This container allows you to show/hide its child based on a condition. It is practically only a syntactic sugar to simplify code and avoid standard if-statements.

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