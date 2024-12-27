---
outline: false
---


# Default text style

Applies a default text style to all nested Text elements. 
Please note that this element extends and overrides existing styles with additional configuration.


## API

Depending on your use-case, you can provide a TextStyle object or use a lambda expression:

```c#
.DefaultTextStyle(x => x.Bold().Underline())
.DefaultTextStyle(TextStyle.Default.Bold().Underline())
```


## Example

```c#{4,16}
container
    .Width(400)
    .Padding(25)
    .DefaultTextStyle(x => x.Bold().Underline())
    .Column(column =>
    { 
        column.Spacing(10);
        
        column.Item().Text("Inherited bold and underline");
        
        column.Item()
            .Text("Disabled underline, inherited bold and adjusted font color")
            .Underline(false).FontColor(Colors.Green.Darken2);

        column.Item()
            .DefaultTextStyle(x => x.DecorationWavy().FontColor(Colors.LightBlue.Darken3))
            .Text("Changed underline type and adjusted font color");
    });   
```

Please note that this element extends existing styles with additional configuration. Those styles can be extended/overridden in later stages of the code.

![example](/api-reference/default-text-style.webp =400x)