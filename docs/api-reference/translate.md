# Translate

This container allows you to precisely position content by moving it horizontally and vertically relative to its original position, independent of layout constraints. 

When you apply translation, the element maintains its original size constraints while shifting its visual position.

| Method         | Description                                                                                                                                                      |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **TranslateX** | Moves content along the horizontal axis. A positive value moves content to the right; a negative value moves it to the left. Does not alter the available space. |
| **TranslateY** | Moves content along the vertical axis. A positive value moves content downwards; a negative value moves it upwards. Does not alter the available space.          |

```c#{4-5}
container
    .Padding(50)
    .Background(Colors.Blue.Lighten3)
    .TranslateX(25)
    .TranslateY(25)
    .Border(4)
    .BorderColor(Colors.Blue.Darken2)
    .Padding(50)
    .Text("Moved content")
    .FontSize(25);
```

![example](/api-reference/translate.webp)
