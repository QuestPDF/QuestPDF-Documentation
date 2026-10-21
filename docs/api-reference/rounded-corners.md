# Rounded Corners

Rounded corners can be applied to containers to create visually appealing designs. 

This feature allows you to specify the radius of the corners, giving a softer look to the edges of the container.

| Method                      | Description                                                                                            |
|-----------------------------|--------------------------------------------------------------------------------------------------------|
| **CornerRadius**            | Applies a uniform corner radius to all corners of the container with the specified value and unit.     |
| **CornerRadiusTopLeft**     | Applies a corner radius to the top-left corner of the container with the specified value and unit.     |
| **CornerRadiusTopRight**    | Applies a corner radius to the top-right corner of the container with the specified value and unit.    |
| **CornerRadiusBottomLeft**  | Applies a border radius to the bottom-left corner of the container with the specified value and unit.  |
| **CornerRadiusBottomRight** | Applies a corner radius to the bottom-right corner of the container with the specified value and unit. |


## Consistent Corner Radius

In the vast majority of cases, you will want to apply the same corner radius to all corners of a container.

<<< @/snippets/rounded-corners/consistent.cs{4 csharp}

![All four corners are rounded with the same radius; the thin black border and the light grey background both follow the curve.](/api-reference/rounded-corners-consistent.webp){.example}


## Various Corner Radius

It is also possible to apply different corner radii to each corner of a container, allowing for more complex designs.

<<< @/snippets/rounded-corners/various.cs{4-7 csharp}

![Each corner has its own radius, from a barely rounded top-left corner to a wide curve at the bottom-left; the border and the background follow every corner.](/api-reference/rounded-corners-various.webp){.example}


## Image Example

Rounded corners can also be applied to images, enhancing their appearance in documents.

<<< @/snippets/rounded-corners/image.cs{2 csharp}

![The photo is clipped to rounded corners, so its edges curve instead of meeting at sharp corners.](/api-reference/rounded-corners-image.webp){.example}


## Complex Example

Rounded corners can be used in more complex layouts, such as tables, to create a polished look.

<<< @/snippets/rounded-corners/complex.cs{3 csharp}

![A table with a header row and five rows inside a rounded black border: the outer corners of the header and the last row are clipped to the curve, while the inner cell borders stay straight.](/api-reference/rounded-corners-complex.webp){.example}
