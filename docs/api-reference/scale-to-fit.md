# Scale to fit

This container dynamically adjusts its content to fit within the available space by proportionally scaling it down if necessary. 

By attempting to shrink its child elements, it prevents common layout issues such as infinite layout exceptions. 
It is particularly useful when your content generally fits within the available space but occasionally needs slight adjustments to maintain a consistent appearance.

:::warning
This container determines the optimal scale value through multiple iterations. 
For complex content, this may introduce a significant performance overhead.
:::

```c#{12-15}
container.Column(column =>
{
    const string text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    foreach (var i in Enumerable.Range(4, 5))
    {
        column
            .Item()
            .Shrink()
            .Border(1)
            .Padding(15)
            .Width(i * 50) // sizes from 200x100 to 450x175
            .Height(i * 25)
            .ScaleToFit()
            .Text(text);
    }
});
```

![example](/api-reference/scale-to-fit.webp)

::: danger
This component scales the available space, not the content directly. 
As a result, you may still encounter situations where content doesn't fit properly, especially when a child element enforces a specific aspect ratio or has other fixed dimensional constraints.
:::