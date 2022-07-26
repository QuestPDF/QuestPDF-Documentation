# Element

Sometimes it is useful to alter the document's content based on a condition. It is practically only a syntactic sugar to simplify your code. Use this component to achieve such results without breaking the fluent API chain:

```csharp{6-7,18}
// before
public static IContainer TableCell(this IContainer container, bool applyBackground = false)
{
    var container = container.Border(0.5f).BorderColor("#222");

    if (applyBackground)
        container = container.Background("#DEE");

    return container.Padding(5);
}

// after
public static IContainer TableCell(this IContainer container, bool applyBackground = false)
{
    return container
        .Border(0.5f)
        .BorderColor("#222")
        .Element(x => applyBackground ? x.Background("#DEE") : x)
        .Padding(5);
}
```

It is not required to follow the methods chain. Using this approach, you can also end the chain:

```csharp
public static IContainer TextOrBackground(this IContainer container, string text)
{
    return container
        .Padding(10)
        .Element(x =>
        {
            if (string.IsNullOrWhiteSpace(text))
                x.Height(10).Width(50).Background("#DDD");
            else
                x.Text(text);
        });
}
```