# Translate

- This container allows you to move its content up, down, left and right regardless of layout constraints.
- It applies the same size constraints to its child.
- The rendered child appears floating below or above other content.

```c#{5-6}
.Background("#FFF")
.MinimalBox()
.Padding(25)
.Background(Colors.Green.Lighten3)
.TranslateX(15)
.TranslateY(15)
.Border(2)
.BorderColor(Colors.Green.Darken1)
.Padding(50)
.Text("Text outside of bounds")
.FontSize(25);
```

![example](/api-reference/translate.png =300x)