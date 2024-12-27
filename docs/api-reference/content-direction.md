---
outline: false
---


# Content Direction

The ContentDirection element controls the flow direction of content in your document, supporting both left-to-right (LTR) and right-to-left (RTL) layouts. 
This is essential for proper text alignment and content organization when working with different languages.

```c#
container
    .ContentFromRightToLeft()
    // content in right-to-left direction
```


## API

| Method                     | Description                                                                                       |
|----------------------------|---------------------------------------------------------------------------------------------------|
| **ContentFromLeftToRight** | Sets the left-to-right (LTR) direction for its entire content.<br> This is a **default** setting. |
| **ContentFromRightToLeft** | Sets the right-to-left (RTL) direction for its entire content.                                    |



## Overriding content direction

It is also possible to override the content direction for specific elements:

```c#{1,10}
.ContentFromRightToLeft()
.Column(column => 
{
    column
        .Item() 
        // content with inherited RTL content direction
        
    column
        .Item()
        .ContentFromLeftToRight() 
        // content with overridden LTR content direction     
});
```


## Impact On Content

This element impacts several key aspects:
- Text alignment and positioning
- Text direction and word wrapping
- Element ordering in collections (Row, Table etc.)
- Default content alignment
- Content flow direction

```c#
.ContentFromRightToLeft() // LTR or RTL mode
.Row(row =>
{
    row.Spacing(5);
    
    row.AutoItem().Height(50).Width(50).Background(Colors.Red.Lighten1);
    row.AutoItem().Height(50).Width(50).Background(Colors.Green.Lighten1);
    row.AutoItem().Height(50).Width(75).Background(Colors.Blue.Lighten1);
});
```

| LTR                                                                                                                                          | RTL                                                                                                                                           |
|----------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| Items are typically aligned to the left. For most containers, the first item is positioned on the left, while the last item is on the right. | Items are typically aligned to the right. For most containers, the first item is positioned on the right, while the last item is on the left. |
| ![example](/api-reference/content-direction-ltr.webp =250x)                                                                                  | ![example](/api-reference/content-direction-rtl.webp =250x)                                                                                   |
