# Page Settings

This section describes how to configure the page settings in your document.

## Page Color

You can set the background color of your document pages using the PageColor method. 
Colors can be specified using predefined constants, hexadecimal values, or named color variants:

```c#
document.Page(page =>
{
    page.PageColor(Colors.White);
    // or
    page.PageColor("#F0F0F0");
    // or
    page.PageColor(Colors.Grey.Lighten3);
});
```

<!--@include: ../tip-color.md-->

## Page Size

QuestPDF offers multiple ways to define the dimensions of a page. 
You can set exact sizes in various units, choose from standard presets, or allow the library to adapt the page size dynamically based on your content.

<!--@include: ../tip-unit.md-->

### Specific Page Size

Configures the exact dimensions of every page within the set.

```c#
document.Page(page =>
{
    page.Size(595, 842); // in points
    // or
    page.Size(21, 29.7f, Unit.Centimeter);
    // or
    page.Size(PageSizes.A4);
});
```

### Continuous Page Size

Enables the continuous page size mode, allowing the page's height to adjust according to content while retaining a constant specified width.

This configuration is useful for output types like receipts, scrolls, or other cases where the length of the page can continuously expand.

```c#
document.Page(page =>
{
    page.ContinuousSize(215);
    // or
    page.ContinuousSize(76, Unit.Millimeter);
});
```


### Flexible Page Size

Enables the flexible page size mode, where the output page's dimensions can vary based on its content.
It is possible to specify the minimum and maximum dimensions for the page, or both.

Please note that with this setting, individual pages within the document may have different sizes.

```c#
document.Page(page =>
{
    page.MinSize(400, 600);
    // and / or
    page.MaxSize(800, 1200);
    
    // also supports units and PageSizes
});
```

### Predefined Page Size

For convenience, QuestPDF provides commonly used page size presets, including optional orientation:

```c#
using QuestPDF.Helpers;

document.Page(page =>
{
    page.Size(PageSizes.A4);
    page.Size(PageSizes.A3);
    page.Size(PageSizes.Letter);
    page.Size(PageSizes.Legal);
    
    // it is also possible to specify the orientation
    page.Size(PageSizes.A4.Portrait());
    page.Size(PageSizes.A4.Landscape());
});
```


## Margin

Margins add empty space around the main layout (header, content, and footer). 
You can configure each side individually or use combined methods for convenience:

| Method               | Summary                                                                  |
|----------------------|--------------------------------------------------------------------------|
| **MarginLeft**       | Adds empty space to the left of the primary layer.                       |
| **MarginRight**      | Adds empty space to the right of the primary layer.                      |
| **MarginTop**        | Adds empty space above the primary layer.                                |
| **MarginBottom**     | Adds empty space below the primary layer.                                |
| **MarginVertical**   | Adds empty space vertically (top and bottom) around the primary layer.   |
| **MarginHorizontal** | Adds empty space horizontally (left and right) around the primary layer. |
| **Margin**           | Adds empty space around the primary layer.                               |

```c#
document.Page(page =>
{
    page.MarginVertical(32);
    page.MarginHorizontal(2, Unit.Centimeter);
});
```


## Default Text Style

You can apply a default text style to every text element within a page. 
This is particularly helpful for setting consistent fonts, sizes, and colors across your document:
[Learn more](/api-reference/text/style-inheritance)

```c#
document.Page(page =>
{
    page.DefaultTextStyle(TextStyle.Default.FontSize(20));
    // or
    page.DefaultTextStyle(x => x.FontSize(20));
});
```


## Content Direction

QuestPDF supports both left-to-right (LTR) and right-to-left (RTL) layouts to accommodate languages with different reading directions.
This option applies a global content direction to the entire page set.
[Learn more](/api-reference/content-direction)

```c#
document.Page(page =>
{
    page.ContentFromLeftToRight();
    // or
    page.ContentFromRightToLeft();
});
```


## Documents with multiple page settings

You can apply different settings to each page set in the document. 
This flexibility allows you to mix sizes, orientations, styles, or margins as needed:

```c#
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Size(PageSizes.A4);
            page.Margin(1, Unit.Inch);
    
            page.Content().AlignCenter().AlignMiddle().Text("A4 PORTAIT");
        });
    
        document.Page(page =>
        {
            page.Size(PageSizes.A5.Landscape());
            page.Margin(2f, Unit.Centimeter);
    
            page.Content().AlignCenter().AlignMiddle().Text("A5 LANDSCAPE");
        });
    })
    .GeneratePdf();
```
