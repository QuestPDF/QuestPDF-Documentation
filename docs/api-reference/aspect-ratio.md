---
outline: false
---


# Aspect Ratio

Constrains its content to maintain a given width-to-height ratio.

## API

Specify the aspect-ratio value either as a number or a division of two numbers: 

```c#
.AspectRatio(0.5) // use a ratio
.AspectRatio(1f / 2f) // or division
```

Additionally, you can specify how the content should be adjusted to meet the aspect ratio:

```c#
.AspectRatio(0.5, AspectRatioOption.FitArea)
```

### Fitting Options

| Method                          | Description                                                                                                                                                                                                                  |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AspectRatioOption.**FitWidth**  | Adjusts content to occupy the full width available. Used as the **default** setting in the library.                                                                                                                          |
| AspectRatioOption.**FitHeight** | Adjusts content to fill the available height. Often used with height-constraining elements.                                                                                                                                  |
| AspectRatioOption.**FitArea**   | Adjusts content to fill the available area while maintaining its aspect ratio. This may result in the content fully occupying either the width or height, depending on its dimensions. Often used with constraining elements |

::: danger
This container enforces strict space constraints.
The DocumentLayoutException may be thrown if these constraints can't be satisfied.
:::


## Example

```c#{4}
container
    .Width(300)
    .Height(300)
    .AspectRatio(3f/4f, AspectRatioOption.FitArea)
    .Background(Colors.Grey.Lighten2)
    .AlignCenter()
    .AlignMiddle()
    .Text("3:4 Content Area");
```

![example](/api-reference/aspect-ratio.webp =300x)
