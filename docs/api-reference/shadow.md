# Shadow

Shadows can enhance the visual depth and separation of elements in a document.

<<< @/snippets/shadow/simple.cs{3-10 csharp}

![A soft grey shadow falls below and to the right of the bordered box.](/api-reference/shadow-simple.webp){.example}


## Blur

Gets or sets the blur radius of the shadow in points.
Higher values produce a more diffused shadow with softer edges.

A value of 0 results in a sharp, unblurred shadow.

::: tip
Values different from 0 may significantly impact performance and enlarge the output file size.
Use with caution, especially in large documents or when rendering complex shadows.
:::

<<< @/snippets/shadow/blur.cs{12 csharp}

![Three squares with increasing blur: the shadow gets wider and softer, spreading evenly on all sides.](/api-reference/shadow-blur.webp){.example}


## Spread

Gets or sets the spread radius of the shadow in points.

Positive values cause the shadow to expand, negative values cause it to contract.

<<< @/snippets/shadow/spread.cs{13 csharp}

![Three squares with increasing spread: from a faint halo to a wide, darker band around the square.](/api-reference/shadow-spread.webp){.example}


## Offset X

Gets or sets the horizontal offset of the shadow in points.

Positive values move the shadow to the right, negative values move it to the left.

<<< @/snippets/shadow/offset-x.cs{13 csharp}

![A negative offset moves the shadow to the left, zero keeps it centred, and a positive offset moves it to the right.](/api-reference/shadow-offset-x.webp){.example}


## Offset Y

Gets or sets the vertical offset of the shadow in points.

Positive values move the shadow downward, negative values move it upward.

<<< @/snippets/shadow/offset-y.cs{13 csharp}

![A negative offset moves the shadow up, zero keeps it centred, and a positive offset moves it down.](/api-reference/shadow-offset-y.webp){.example}


## Color

Gets or sets the color of the shadow.

<<< @/snippets/shadow/color.cs{18 csharp}

![Red, green and blue glows around three white squares: the shadow takes the given colour.](/api-reference/shadow-color.webp){.example}


## Without Blur (Fast)

Shadows can be applied without any blur effect for a sharper appearance.

This approach is faster and results in significantly smaller file sizes, making it suitable for performance-sensitive applications.

<<< @/snippets/shadow/no-blur.cs{10,22 csharp}

![Without blur the shadow is a solid grey copy of the shape, offset down and to the right; on the second square it follows the rounded corners.](/api-reference/shadow-no-blur.webp){.example}