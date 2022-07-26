# Unconstrained

- This container takes no space,
- It removes any size constraints from its child,
- The rendered child appears like floating below/above of the other content.

```csharp{11-13}
.Width(400)
.Height(350)
.Padding(25)
.PaddingLeft(75)
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

![example](/images/api-reference/unconstrained.png =400x)