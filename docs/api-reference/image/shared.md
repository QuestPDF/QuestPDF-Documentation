# Shared Images

When generating a PDF with multiple items that use the same image, processing the image repeatedly can negatively affect both performance and the final file size. 

Consider the following scenario: you want to create a list of items, each displaying the same image. 
In the naive approach, for each item, the following steps occur:
1) Load the image file from the file system.
2) Parse the file into an image object.
3) Scale and compress the image using the specified settings.
4) Embed the processed image as a separate resource in the PDF document.

Because these steps are repeated for every list item, the overall process becomes inefficient, and the PDF may end up including multiple copies of the same image.

:::info
Starting with the 2025.4.0 version, the library automatically detects when static assets (images loaded via local file paths) are used, and enhances performance by caching them to avoid redundant processing.
:::


#### Example: inefficient image processing

Below is an example where the image is loaded and processed for each item:

```c#{9}
.Column(column =>
{
    column.Spacing(15);

    foreach (var i in Enumerable.Range(0, 5))
    {
        column.Item().Row(row =>
        {
            row.AutoItem().Width(24).Image("checkbox.png");
            row.RelativeItem().PaddingLeft(8).AlignMiddle().Text(Placeholders.Label()).FontSize(16);
        });
    }
});
```

![example](/api-reference/image-shared.png =350x)

#### Solution: shared image resources

To avoid redundant processing, load the image once and reuse it across all items. 
This approach improves performance and reduces the final PDF file size:

```c#{5,11}
.Column(column =>
{
    column.Spacing(15);

    var image = Image.FromFile("checkbox.png");
    
    foreach (var i in Enumerable.Range(0, 5))
    {
        column.Item().Row(row =>
        {
            row.AutoItem().Width(24).Image(image);
            row.RelativeItem().PaddingLeft(8).AlignMiddle().Text(Placeholders.Label()).FontSize(16);
        });
    }
});
```
