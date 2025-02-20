# SVG Support

QuestPDF supports SVG images, allowing you to integrate scalable vector graphics just as you would with raster images. 
You can either load and parse an SVG image on demand or preload it to improve performance when the same image is used multiple times.


## Basic Usage

There are two ways to add an SVG image to your document:

```c#{11-12}
// 1) with a text containing SVG content
var svgContent = File.ReadAllText("pdf-icon.svg");
container.Svg(svgContent);

// 2) with a file path
container.Svg("pdf-icon.svg")
```

:::tip
SVG content supports the same scaling options as raster images. [Learn more](/api-reference/image/basics.html#image-scaling)

For example:
```c#{4}
container
  .Width(200)
  .Svg("pdf-icon.svg")
  .FitArea();
```
:::


## Example

```c#{16}
container
    .Column(column =>
    {
        column.Spacing(15);

        column.Item().Text("Business details:").Bold().FontColor(Colors.Blue.Darken2);
        
        AddContactItem("Resources/Icons/phone.svg", Placeholders.PhoneNumber());
        AddContactItem("Resources/Icons/email.svg", Placeholders.Email());
        AddContactItem("Resources/Icons/web.svg", Placeholders.WebpageUrl());

        void AddContactItem(string iconPath, string label)
        {
            column.Item().Row(row =>
            {
                row.ConstantItem(32).AspectRatio(1).Svg(iconPath);
                row.ConstantItem(15);
                row.AutoItem().AlignMiddle().Text(label);
            });
        }
    });
```

![example](/api-reference/svg.webp =412x)


## Preloading

For better performance, especially when reusing the same image, you can preload the SVG image. 
This ensures that the image is loaded and parsed only once:

```c#{1-2,14-15}
// in global or static context
var image = SvgImage.FromFile("pdf-icon.svg");

Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Size(PageSizes.A7.Landscape());
            page.Margin(25);
            
            page.Content()
                .Padding(25)
                .Svg(image))
                .FitArea();
        });
    })
    .GeneratePdfAndShow();
```

## Font Support

If your SVG image contains text, please ensure that the font is available in your application:
- when the `QuestPDF.Settings.UseEnvironmentFonts` is set to `true`, the font should be installed in the operating system,
- when the `QuestPDF.Settings.UseEnvironmentFonts` is set to `false`, the font files should be deployed along with the application.


## Limitations

The SVG module displays SVGs as images with high capabilities and compliance.
Most SVG files are expected to render correctly, particularly those from popular design tools.
However, there are some limitations to be aware of.
If an SVG file does not render as expected after considering the following points, please file an issue.

Learn more on [the Shopify page](https://shopify.github.io/react-native-skia/docs/images-svg/#svg-support).

