---
outline: false
---


# Decoration

Divides the container's space into three distinct sections: before, content, and after.

The before section is rendered above the main `content`, while the `after` section is rendered below it.
If the main `content` spans across multiple pages, both the `before` and `after` sections are consistently rendered on every page.


## API

| Method      | Description                                                                             |
|-------------|-----------------------------------------------------------------------------------------|
| **Before**  | Returns a container for the section positioned before (above) the primary main content. |
| **Content** | Returns a container for the main section.                                               |
| **After**   | Returns a container for the section positioned after (below) the main content.          |



## Example

A typical use-case for this method is to render a table that spans multiple pages, with a consistent caption or header on each page.

```c#{4,7,13}
container
    .MaxHeight(300)
    .MaxWidth(300)
    .Decoration(decoration =>
    {
        decoration
            .Before()
            .Background(Colors.Grey.Medium)
            .Padding(10)
            .Text("Notes").FontColor("#FFF").Bold();
    
        decoration
            .Content()
            .Background(Colors.Grey.Lighten3)
            .Padding(10)
            .Text(Helpers.Placeholders.LoremIpsum());
    });
```

Page 1:
![example](/api-reference/decoration-0.webp =300x)

Page 2:
![example](/api-reference/decoration-1.webp =300x)