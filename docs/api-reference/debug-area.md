---
outline: false
---


# Debug area

The DebugArea element helps you visually debug document layouts by drawing a labeled box around its content. 
This aids in understanding spacing, alignment and pinpointing specific sections of the document during development.

<!--@include: tip-debugging.md--> 


## API

You can specify text and color to better distinguish between various debug elements:

```csharp{2}
container
    .DebugArea("Photo gallery", Colors.Blue.Medium)
    // content
```

It is also possible to skip the color (it is red by default), and even the label:

```csharp
.DebugArea("Photo gallery")
.DebugArea()
```

<!--@include: tip-color.md--> 

## Example

<<< @/snippets/debug-area/example.cs{5 csharp}

![DebugArea covers the whole area it wraps with a translucent blue fill and a thin border, including the space the content doesn't use, and shows the label "Photo gallery" at the top centre.](/api-reference/debug-area.webp){.example}