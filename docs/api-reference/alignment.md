---
outline: false
---


# Alignment

The Alignment element controls the positioning of its child content within the available space.
It offers both horizontal and vertical options that can be used independently or combined.


## API

### Horizontal

| Method          | Description                                                                                   |
|-----------------|-----------------------------------------------------------------------------------------------|
| **AlignLeft**   | Aligns content horizontally to the left side.                                                 |
| **AlignCenter** | Aligns content horizontally to the center, ensuring equal space on both left and right sides. |
| **AlignRight**  | Aligns its content horizontally to the right side.                                            |


### Vertical

| Method          | Description                                                                    |
|-----------------|--------------------------------------------------------------------------------|
| **AlignTop**    | Aligns content vertically to the upper side.                                   |
| **AlignMiddle** | Aligns content vertically to the center, ensuring equal space above and below. |
| **AlignBottom** | Aligns content vertically to the bottom side.                                  |

## Example

```c#{4-5}
container
    .Width(300)
    .Height(300)
    .AlignBottom()
    .AlignCenter()
    .Background(Colors.Grey.Lighten2)
    .Padding(10)
    .Text("Test");
```

![example](/api-reference/alignment.webp)