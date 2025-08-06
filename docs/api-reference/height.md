---
outline: false
---


# Height

Use this element to control the vertical size of its content.

| Method        | Description                             |
|---------------|-----------------------------------------|
| **Height**    | Sets the exact height of its content.   |
| **MinHeight** | Sets the minimum height of its content. |
| **MaxHeight** | Sets the maximum height of its content. |


## Example

The following example demonstrates a container with a fixed height of 100 pt and a width of 200 pt.

```c#{4}
container
    .Width(300)
    .Padding(25)
    .Height(100)
    .AspectRatio(2f, AspectRatioOption.FitHeight)
    .Background(Colors.Grey.Lighten1);
```

![example](/api-reference/height.webp =300x)


<br>

<!--@include: tip-layout-constraints.md-->
