# Patters and practices

## Page settings

It is possible to put pages of various settings within the single document. Please notice that the example below declares two consecutive page sizes (A4 and A3) with various margin values:

```csharp{10-13,21-24}
public class StandardReport : IDocument
{
    // metadata

    public void Compose(IDocumentContainer container)
    {
        container
            .Page(page =>
            {
                page.MarginVertical(80);
                page.MarginHorizontal(100);
                
                page.Size(PageSizes.A3);
                    
                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeBigContent);
                page.Footer().AlignCenter().PageNumber();
            })
            .Page(page =>
            {
                page.MarginVertical(40);
                page.MarginHorizontal(50);
                
                page.Size(PageSizes.A4);
                    
                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeSmallContent);
                page.Footer().AlignCenter().PageNumber();
            });
    }

    // content implementation
}
```

## Continuous page size

It is possible to define a page size with known width but dynamic height. In this example, the resulting page has constant width equal to A4 page's width, but its height depends on the content:

```csharp{13}
public class StandardReport : IDocument
{
    // metadata

    public void Compose(IDocumentContainer container)
    {
        container
            .Page(page =>
            {
                page.MarginVertical(40);
                page.MarginHorizontal(60);
                
                page.ContinuousSize(PageSizes.A4.Width);
                    
                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeContent);
                page.Footer().AlignCenter().PageNumber();
            });
    }

    // content implementation
}
```

::: danger
Because of the practical layouting limitations, the maximum page height is limited to 14400 points (around 5 meters).
:::

## Document metadata

You can modify the PDF document metadata by returning the `DocumentMetadata` object from the `IDocument.GetMetadata()` method. There are multiple properties available, some of them have default values:

```csharp
public class DocumentMetadata
{
    public int ImageQuality { get; set; } = 101;
    public int RasterDpi { get; set; } = 72;
    public bool PdfA { get; set; }

    public string? Title { get; set; }
    public string? Author { get; set; }
    public string? Subject { get; set; }
    public string? Keywords { get; set; }
    public string? Creator { get; set; }
    public string? Producer { get; set; }

    public DateTime CreationDate { get; set; } = DateTime.Now;
    public DateTime ModifiedDate { get; set; } = DateTime.Now;

    public int DocumentLayoutExceptionThreshold { get; set; } = 250;

    public static DocumentMetadata Default => new DocumentMetadata();
}
```

::: tip
If the number of generated pages exceeds the `DocumentLayoutExceptionThreshold` (likely due to infinite layout), the exception is thrown. Please adjust this parameter, so the library can stop as soon as possible, saving CPU and memory resources.
:::

::: tip
The `ImageQuality` property controls the trade-off between quality and size. The default value `101` corresponds to lossless encoding. When you use a value less than 100, all images are opaque and encoded using the JPEG algorithm. The smaller the value is, the higher compression is used.
:::

## Generating images

The default functionality of the library is generating PDF files based on specified document configuration. In some cases, you may need to generate set of images instead. Such tasks can be done by additional extension methods:

```csharp
// generate images as dynamic list of images
IEnumerable<byte[]> images = document.GenerateImages();

// generate images and save them as files with provided naming schema
document.GenerateImages(i => $"image-{i}.png");  
```

::: tip
Generated images are in the PNG format. In order to increase resolution of generated images, please modify the value of the `DocumentMetadata.RasterDpi` property. When RasterDpi is set to 72, one PDF point corresponds to one pixel.
:::

## Extending DSL

The existing Fluent API offers a clear and easy-to-understand way to describe a document's structure. When working on the document, you may find that many places use similar styles, for instances borders or backgrounds. It is especially common when you keep the document consistent. To make future adjustments easier, you can reuse the styling code by extracting it into separate extension methods. This way, you can assign a meaningful name to documents structure without increasing code complexity.

In the example below, we will create a simple table where label cells have a grey background, and value cells have a white background. First, let's create proper extension methods:

```csharp
static class SimpleExtension
{
    private static IContainer Cell(this IContainer container, bool dark)
    {
        return container
            .Border(1)
            .Background(dark ? "#EEE" : "#FFF")
            .Padding(10);
    }

    public static IContainer LabelCell(this IContainer container) => container.Cell(true);
    public static IContainer ValueCell(this IContainer container) => container.Cell(false);
}
```

Now, you can easily use newly created DSL language to build the table:

```csharp
.Stack(stack =>
{
    for(var i=1; i<=4; i++)
    {
        stack.Element().Row(row =>
        {
            row.RelativeColumn(2).LabelCell().Text(TextPlaceholder.Label());
            row.RelativeColumn(3).ValueCell().Text(TextPlaceholder.Paragraph());
        });
    }
});
```

This example procudes the following output:

![example](./images/patterns-and-practices/extension-method.png =540x)

::: tip
Please note that this example shows only the concept of using extension methods to build custom API elements. Using this approach you can build and reuse more complex structures. For example, extension methods can expect arguments.
:::

## Components

A component is a special type of element that can generate content depending on its state. This approach is really common in many web-development libraries and solves multiple issues. You should consider creating your own component when part of the document is going to be reused in other documents. Another good scenario is when you plan to repeat a more complex section. In such a case, you can implement a component that takes input provided as constructor's argument, and generates PDF content. Then, such component can be easily used in a for loop in the document itself. All things considered, components are a useful tool to organize and reuse your code.

::: tip
Components offer a lot of flexibility and extendability. Because of that, the QuestPDF library will receive several important updates to enhance components features even more. Stay tuned for slots!
:::

In this tutorial, we will cover a simple component that generates a random image taken from the fantastic webpage called [Lorem Picsum](https://picsum.photos/). To show how component's behaviour can be dynamically changed, the end result will offer optional greyscale flag.
 
 Additionally, the constructor of the template is going to offer of showing only greyscale images.

```csharp
//interface
public interface IComponent
{
    void Compose(IContainer container);
}

// example implementation
public class LoremPicsum : IComponent
{
    public bool Greyscale { get; }

    public LoremPicsum(bool greyscale)
    {
        Greyscale = greyscale;
    }
    
    public void Compose(IContainer container)
    {
        var url = "https://picsum.photos/300/200";

        if(Greyscale)
            url += "?grayscale";

        using var client = new WebClient();
        var response = client.DownloadData(url);
        container.Image(response);
    }
}
```

Example usage:

```csharp{7}
.Stack(column =>
{
    column.Spacing(10);

    column
        .Element()
        .Component(new LoremPicsum(true));
    
    column
        .Element()
        .AlignRight()
        .Text("From Lorem Picsum");
});
```

The result of sample code looks as follows:

![example](./images/patterns-and-practices/component-example.png =350x)

::: tip
If the component class has parameter-less constructor, you can use the generic `Template` method like so:
```csharp
.Component<ComponentClass>();
```
:::


## Style

### Material Design colors

You can access any color defined in the Material Design colors set. Please find more details [on the official webpage](https://material.io/design/color/the-color-system.html).

```csharp
// base colors:
Colors.Black
Colors.White
Colors.Transparent

// colors with medium brightness:
Colors.Green.Medium;
Colors.Orange.Medium;
Colors.Blue.Medium;

// darken colors:
Colors.Blue.Darken4
Colors.LightBlue.Darken3
Colors.Indigo.Darken2
Colors.Brown.Darken1

// lighten colors:
Colors.Pink.Lighten1
Colors.Purple.Lighten2
Colors.Teal.Lighten3
Colors.Cyan.Lighten4
Colors.LightGreen.Lighten5

// accent colors:
Colors.Lime.Accent1
Colors.Yellow.Accent2
Colors.Amber.Accent3
Colors.DeepOrange.Accent4
```

Example usage:

```csharp
var colors = new[]
{
    Colors.Green.Darken4,
    Colors.Green.Darken3,
    Colors.Green.Darken2,
    Colors.Green.Darken1,
    
    Colors.Green.Medium,
    
    Colors.Green.Lighten1,
    Colors.Green.Lighten2,
    Colors.Green.Lighten3,
    Colors.Green.Lighten4,
    Colors.Green.Lighten5,
    
    Colors.Green.Accent1,
    Colors.Green.Accent2,
    Colors.Green.Accent3,
    Colors.Green.Accent4,
};

container
    .Padding(25)
    .Height(100)
    .Row(row =>
    {
        foreach (var color in colors)
            row.RelativeColumn().Background(color);
    });
```

![example](./images/patterns-and-practices/material_colors.png =450x)

### Basic fonts

The library offers a list of simple and popular fonts.
```csharp
Fonts.Calibri
Fonts.Candara
Fonts.Arial
// and more...
```

Example:

```csharp
var fonts = new[]
{
    Fonts.Calibri,
    Fonts.Candara,
    Fonts.Arial,
    Fonts.TimesNewRoman,
    Fonts.Consolas,
    Fonts.Tahoma,
    Fonts.Impact,
    Fonts.Trebuchet,
    Fonts.ComicSans
};

container.Padding(25).Grid(grid =>
{
    grid.Columns(3);

    foreach (var font in fonts)
    {
        grid.Item()
            .Border(1)
            .BorderColor(Colors.Grey.Medium)
            .Padding(10)
            .Text(font, TextStyle.Default.FontType(font).Size(16));
    }
});
```

![example](./images/patterns-and-practices/defined_fonts.png =500x)

## Prototyping

### Text

It is a very common scenario when we know how the document layout should look like, however, we do not have appropriate data to fill it. The Quest PDF library provides a set of helpers to generate random text of different kinds:

```csharp
using QuestPDF.Helpers;

Placeholders.LoremIpsum();
Placeholders.Label();
Placeholders.Sentence();
Placeholders.Question();
Placeholders.Paragraph();
Placeholders.Paragraphs();

Placeholders.Email();
Placeholders.Name();
Placeholders.PhoneNumber();

Placeholders.Time();
Placeholders.ShortDate();
Placeholders.LongDate();
Placeholders.DateTime();

Placeholders.Integer();
Placeholders.Decimal();
Placeholders.Percent();
```

### Colors

You can access a random color picked from the Material Design colors set. Colors are returned as text in the HEX format.

```csharp
// bright color, lighten-2
Placeholders.BackgroundColor();

// medium
Placeholders.Color();
```

Example usage to create a colorful matrix:

```csharp
.Padding(25)
.Grid(grid =>
{
    grid.Columns(5);
    
    Enumerable
        .Range(0, 25)
        .Select(x => Placeholders.BackgroundColor())
        .ToList()
        .ForEach(x => grid.Item().Height(50).Background(x));
});
```

![example](./images/patterns-and-practices/random_colors.png =300x)

### Image

Use this simple function to generate random image with required size:

```csharp
// both functions return a byte array containing a JPG file
Placeholders.Image(400, 300);
Placeholders.Image(new Size(400, 300));

// example usage
.Padding(25)
.Width(300)
.AspectRatio(3 / 2f)
.Image(Placeholders.Image);
```

![example](./images/patterns-and-practices/image_placeholder.png =350x)

## Exceptions

During the development process, you may encounter different issues connected to the PDF document rendering process.
It is important to understand potential sources of such exceptions, their root causes and how to fix them properly.
In the QuestPDF library, all exceptions have been divided into three groups:

###  DocumentComposeException

This exception may occur during the document composition process. When you are using the fluent API to compose various elements together to create the final layout. Taking into account that during such process you are interacting with report data, using conditions, loops and even additional methods, all those operations may be a source of potential exceptions. All of them have been grouped together in this exception type.

### DocumentDrawingException

This exception occurs during the document generation process - when the generation engine translates elements tree into proper drawing commands. If you encounter such an exception, please contact with us - it is most probably a bug that we want to fix for you! Additionally, if you are using custom components, all exceptions thrown there are going to bubble up with this type of exception.

### DocumentLayoutException

This exception may be extremely hard to fix because it happens for valid document trees which enforce constraints that are impossible to meet. For example, when you try to draw a rectangle bigger than available space on the page, the rendering engine is going to wrap the content in a hope that on the next page there would be enough space. Generally, such wrapping behaviour is happening all the time and is working nicely - however, there are cases when it can lead to infinite wrapping. When a certain document length threshold is passed, the algorithm stops the rendering process and throws this exception. In such case, please revise your code and search for indivisible elements requiring too much space.
