# Aspect Ratio

- Aspect ratio is the ratio between width and height. For example, if a component is 200 points in width and 100 points in height, its aspect ratio is equal to 2.
- This container calculates the desired size, and scales itself to take as much space as possible.
- Supports paging: on each page, the aspect ratio constraint is preserved.

```csharp
.AspectRatio(0.5) // use a ratio
.AspectRatio(1f / 2f) // or division
```

By default, the AspectRatio element wants to occupy the entire available width. You can change that behavior using one of the following options:
1) `AspectRatioOption.FitWidth` - the element scales to occupy the available width. Default.
2) `AspectRatioOption.FitHeight` - the element scales to occupy the available height. Good in conjunction with constraining elements.
3) `AspectRatioOption.FitArea` - this is the combination of the above options. The element scales to occupy the available area while preserving its aspect ratio. This means that sometimes it takes the entire width and sometimes the entire height. This is the safest option.

```csharp
.AspectRatio(0.5, AspectRatioOption.FitArea)
```

::: danger
Please be careful. This component may try to enforce size constraints that are impossible to meet. Such scenarios result in a layout exception.
:::