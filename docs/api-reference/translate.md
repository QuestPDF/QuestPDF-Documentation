# Translate

- This container allows to move its content up/down/left/right regardless of the layout constraints,
- It applies the same size constraints to its child,
- The rendered child appears like floating below/above of the other content.

```csharp{5-6}
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

![example](/images/api-reference/translate.png =300x)