# Width

Use this container to enforce additional sizing rules: minimum width, maximum width or exact width.

```c#
// adjust width to specific value
.Width(50)

// set a constraint on the minimum and/or maximum width
.MinWidth(50)
.MaxWidth(100)
```

::: danger
Please be careful. This component may try to enforce size constraints that are impossible to meet when:
- it requires more space than is available, or
- it tries to squeeze its child in less space than is available.

Such scenarios result in a layout exception.
:::
