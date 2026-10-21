---
outline: false
---

# Background

Background can be used to enhance the visual appearance of your document by providing a solid color or a gradient effect.

<!--@include: tip-color.md-->


## Solid color

Sets a solid background color behind its content.

```csharp
.Background("#00FF00")
.Background(Colors.Green.Lighten2)
```

<<< @/snippets/background/solid.cs{28 csharp}

![Fourteen equal-width stripes, each filled edge to edge with one shade of the LightBlue palette: from dark to light (Darken4 to Lighten5), then the four Accent shades.](/api-reference/background-solid.webp){.example}


## Gradient

Applies a linear gradient background to the container with the specified angle and colors.

The first argument is the angle in degrees, and the second argument is an array of colors that define the gradient.

<<< @/snippets/background/gradient.cs{6,10,14 csharp}

![Three gradients showing the angle convention: 0° runs from left (red) to right (blue), 45° from the top-left corner (green) to the bottom-right corner (yellow), and 90° from top (yellow) to bottom (orange).](/api-reference/background-gradient.webp){.example}


## Rounded Corners

Sets the corner radius for the background, creating rounded corners.

::: tip
Read more about [rounded corners](/api-reference/rounded-corners.md).
:::

<<< @/snippets/background/rounded-corners.cs{3-4 csharp}

![The grey background follows the rounded corners, and the box is only as wide as its padded text.](/api-reference/background-rounded-corners.webp){.example}