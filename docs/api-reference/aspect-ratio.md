# Aspect Ratio

- Aspect ratio is a ratio between width and height. When component is 200 points in width and 100 points in height, its aspect ratio is equal to 2.
- This container calculates desired size, and scales itself to take as much space as possible.
- Supports paging: on each page, the aspect ratio constraint is preserved.

```csharp
.AspectRatio(0.5) // use a ratio
.AspectRatio(1f / 2f) // or division
```

By default, the AspectRatio element wants to use entire provided width. You can change that behavior using one of the available options:
1) `AspectRatioOption.FitWidth` - the element scales to take entire available width. Default.
2) `AspectRatioOption.FitHeight` - the element scales to take entire available height. Good in conjunction with constraining elements.
3) `AspectRatioOption.FitArea` - this is the combination of both options above. The element scales to take entire available area with preserving its aspect ratio. That means, sometimes it takes entire width and sometimes entire height. This is the safest option.

```csharp
.AspectRatio(0.5, AspectRatioOption.FitArea)
```

::: danger
Please be careful. This component may try to enforce size constraints that are impossible to meet. Such scenarios end up with the layout exception.
:::