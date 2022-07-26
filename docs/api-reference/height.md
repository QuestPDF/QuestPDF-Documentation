# Height

Use this container to enforce additional sizing rules, e.g. minimum/maximum/exact height.

```csharp
// adjust the height to a specific value
.Height(50)

// set a constraint on the minimum and/or maximum height
.MinHeight(50)
.MaxHeight(100)
```

::: danger
Please be careful. This component may try to enforce size constraints that are impossible to meet when:
- requires more space than is available,
- tries to squeeze its child in less space than necessary.

Such scenarios end up with the layout exception.
:::