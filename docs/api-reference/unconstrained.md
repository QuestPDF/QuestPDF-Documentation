# Unconstrained

The Unconstrained container creates a space where content can go beyond the limits set by parent elements. 
This helps when you need elements that overlap or extend past their container.

When you use Unconstrained, the container doesn't take up space in the layout. 
It removes any size limits from parent elements, making content appear to "float" compared to other elements. 
You can pair this with translation to place elements exactly where you want them.

```c#{12}
container
    .Width(400)
    .Height(350)
    .Padding(25)
    .PaddingLeft(50) 
    .Column(column =>
    {
        column.Item().Width(300).Height(150).Background(Colors.Blue.Lighten3);

        column
            .Item()
            .Unconstrained()
            .TranslateX(-50)
            .TranslateY(-50)
            .Width(100)
            .Height(100)
            .Background(Colors.Blue.Darken2);

        column.Item().Width(300).Height(150).Background(Colors.Blue.Lighten2);
    });
```

![example](/api-reference/unconstrained.webp)