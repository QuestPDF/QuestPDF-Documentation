# Patterns and practices

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
                page.Background(Colors.Grey.Medium); // transparent is default
                page.Size(PageSizes.A3);
                    
                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeBigContent);
                page.Footer().AlignCenter().PageNumber();
            })
            .Page(page =>
            {
                // you can specify multiple page types in the document
                // with independend configurations
                page.Margin(50)
                page.Size(PageSizes.A4);
                    
                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeSmallContent);
                page.Footer().AlignCenter().PageNumber();
            });
    }

    // content implementation
}
```

You easily change page orientation:
```csharp
// default is portrait
page.Size(PageSizes.A3);

// explicit portrait orientation
page.Size(PageSizes.A3.Portrait());

// change to landscape orientation
page.Size(PageSizes.A3.Landscape());
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

## Global text style

The QuestPDF library provides a default set of styles that applied to text.

```csharp
.Text("Text with library default styles")
```

You can adjust the text style by providing additional argument:

```csharp
.Text("Red semibold text of size 20", TextStyle.Default.Size(20).SemiBold())
```

The option above introduces overrides the default style. To get more control you can set a default text style in your document. Please notice that all changes are additive:

```csharp{9-10,22-23,27-28}
public class SampleReport : IDocument
{
    public DocumentMetadata GetMetadata() => new DocumentMetadata();

    public void Compose(IDocumentContainer container)
    {
        container.Page(page =>
        {
            // all text in this set of pages has size 20
            page.DefaultTextStyle(TextStyle.Default.Size(20));
            
            page.Margin(20);
            page.Size(PageSizes.A4);
            page.Background(Colors.White);

            page.Content().Stack(stack =>
            {
                stack.Item().Text(Placeholders.Sentence());
                
                stack.Item().Text(text =>
                {
                    // text in this block is additionally semibold
                    text.DefaultTextStyle(TextStyle.Default.SemiBold());

                    text.Line(Placeholders.Sentence());
                    
                    // this text has size 20 but also semibold and red
                    text.Span(Placeholders.Sentence(), TextStyle.Default.Color(Colors.Red.Medium));
                });
            });
        });
    }
}
```

![example](./images/patterns-and-practices/global-text-style.png =595x)

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

    public bool ApplyCaching { get; set; } // false when debugger is attached
    public bool ApplyDebugging { get; set; } // true when debugger is attached

    public static DocumentMetadata Default => new DocumentMetadata();
}
```

::: tip
If the number of generated pages exceeds the `DocumentLayoutExceptionThreshold` (likely due to infinite layout), the exception is thrown. Please adjust this parameter, so the library can stop as soon as possible, saving CPU and memory resources.
:::

::: tip
The `ImageQuality` property controls the trade-off between quality and size. The default value `101` corresponds to lossless encoding. When you use a value less than 100, all images are opaque and encoded using the JPEG algorithm. The smaller the value is, the higher compression is used.
:::

## Generating PDF and XPS files

The library supports generating both PDF and XPS files:

```csharp
report.GeneratePdf("result.pdf");
report.GenerateXps("result.xps");
```


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

## Support for custom environments (cloud / linux)

The QuestPDF library has a dependency called SkiaSharp which is used to render the final PDF file. This library has additional dependencies when used in the Linux environment. 

When you get the exception `Unable to load shared library 'libSkiaSharp' or one of its dependencies.`, please try to install additional nuget packages provided by the SkiaSharp team.

For example: the SkiaSharp.NativeAssets.Linux.NoDependencies nuget ensures that the libSkiaSharp.so file is published and available.

## Accessing custom fonts

The QuestPDF library has access to all fonts installed on the hosting system. Sometimes though, you don't have control over fonts installed on the production environment. Or you may want to use self-hosted fonts that come with your application as files or embedded resources. In such case, you need to register those fonts as follows:

```csharp
// static method definition
FontManager.RegisterFontType(string fontName, Stream fontDataStream);

// perform similar invocation only once, when the application starts or during its initialization step
FontManager.RegisterFontType("LibreBarcode39", File.OpenRead("LibreBarcode39-Regular.ttf"));

// then, you will have access to the font by its name
container
    .Background(Colors.White)
    .AlignCenter()
    .AlignMiddle()
    .Text("*QuestPDF*", TextStyle.Default.FontType("LibreBarcode39").Size(64));
```

This way, it is possible to generate barcodes:

![example](./images/patterns-and-practices/custom-font.png =400x)

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
            .Background(dark ? Colors.Grey.Lighten2 : Colors.White)
            .Padding(10);
    }
    
    // displays only text label
    public static void LabelCell(this IContainer container, string text) => container.Cell(true).Text(text, TextStyle.Default.Medium());
    
    // allows to inject any type of content, e.g. image
    public static IContainer ValueCell(this IContainer container) => container.Cell(false);
}
```

Now, you can easily use newly created DSL language to build the table:

```csharp
.Grid(grid =>
{
    grid.Columns(10);
    
    for(var i=1; i<=4; i++)
    {
        grid.Item(2).LabelCell(Placeholders.Label());
        grid.Item(3).ValueCell().Image(Placeholders.Image(200, 150));
    }
});
```

This example produces the following output:

![example](./images/patterns-and-practices/domain-specific-language.png =600x)

::: tip
Please note that this example shows only the concept of using extension methods to build custom API elements. Using this approach you can build and reuse more complex structures. For example, extension methods can expect arguments.
:::

## Complex layouts and grids

By combining various elements, you can build complex layouts. When designing try to break your layout into separate pieces and then model them by using the `Row` and the `Stack` elements. In many cases, the `Grid` element can simplify and shorten your code.

Please consider the code below. Please note that it uses example DSL elements from the previous section.

```csharp
.Stack(stack =>
{
    stack.Item().Row(row =>
    {
        row.RelativeColumn().LabelCell("Label 1");
        
        row.RelativeColumn(3).Grid(grid =>
        {
            grid.Columns(3);
            
            grid.Item(2).LabelCell("Label 2");
            grid.Item().LabelCell("Label 3");
            
            grid.Item(2).ValueCell().Text("Value 2");
            grid.Item().ValueCell().Text("Value 3");
        });
    });
    
    stack.Item().Row(row =>
    {
        row.RelativeColumn().ValueCell().Text("Value 1");
        
        row.RelativeColumn(3).Grid(grid =>
        {
            grid.Columns(3);
            
            grid.Item().LabelCell("Label 4");
            grid.Item(2).LabelCell("Label 5");
            
            grid.Item().ValueCell().Text("Value 4");
            grid.Item(2).ValueCell().Text("Value 5");
        });
    });
    
    stack.Item().Row(row =>
    {
        row.RelativeColumn().LabelCell("Label 6");
        row.RelativeColumn().ValueCell().Text("Value 6");
    });
});
```

And its corresponding output:

![example](./images/patterns-and-practices/complex-layout.png =500x)

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

## Implementing charts

There are many ways on how to implement charts in the QuestPDF documents. By utilizing the `Canvas` element and SkiaSharp-compatible charting libraries, it is possible to achieve vector charts.

Please analyse this simple example which utilizes the `microcharts` library ([nuget site](https://www.nuget.org/packages/Microcharts/)):

```csharp
// prepare data
var entries = new[]
{
    new ChartEntry(212)
    {
        Label = "UWP",
        ValueLabel = "112",
        Color = SKColor.Parse("#2c3e50")
    },
    new ChartEntry(248)
    {
        Label = "Android",
        ValueLabel = "648",
        Color = SKColor.Parse("#77d065")
    },
    new ChartEntry(128)
    {
        Label = "iOS",
        ValueLabel = "428",
        Color = SKColor.Parse("#b455b6")
    },
    new ChartEntry(514)
    {
        Label = "Forms",
        ValueLabel = "214",
        Color = SKColor.Parse("#3498db")
    }
};

// draw chart using the Canvas element
.Stack(stack =>
{
    var titleStyle = TextStyle
        .Default
        .Size(20)
        .SemiBold()
        .Color(Colors.Blue.Medium)

    stack
        .Item()
        .PaddingBottom(10)
        .Text("Chart example", titleStyle);
    
    stack
        .Item()
        .Border(1)
        .ExtendHorizontal()
        .Height(300)
        .Canvas((canvas, size) =>
        {
            var chart = new BarChart
            {
                Entries = entries,

                LabelOrientation = Orientation.Horizontal,
                ValueLabelOrientation = Orientation.Horizontal,
                
                IsAnimated = false,
            };
            
            chart.DrawContent(canvas, (int)size.Width, (int)size.Height);
        });
});
```

This is a result:

![example](./images/patterns-and-practices/chart.png =400x)

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

![example](./images/patterns-and-practices/material-colors.png =450x)

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

![example](./images/patterns-and-practices/defined-fonts.png =500x)

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

![example](./images/patterns-and-practices/random-colors.png =300x)

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

![example](./images/patterns-and-practices/image-placeholder.png =350x)

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

This exception provides an additional element stack. It shows which elements have been rendered when the exception was thrown. Please analyse the example below:

```csharp{2,8}
.Padding(10)
.Width(100)
.Background(Colors.Grey.Lighten3)
.DebugPointer("Example debug pointer")
.Stack(x =>
{
    x.Item().Text("Test");
    x.Item().Width(150); // requires 150pt width where only 100pt is available
});
```

Below is the element trace returned by the exception. Nested elements (children) are indented. Sometimes you may find additional, library-specific elements. 

Additional symbols are used to help you find the problem cause:
- 🌟 - represents special elements, e.g. page header/content/footer or the debug pointer element,
- 🔥 - represents an element that causes the layouting exception. Follow the symbol deeper to find the root cause.

```
🔥 Page content 🌟
------------------
Available space: (Width: 500, Height: 360)
Requested space: PartialRender (Width: 120,00, Height: 20,00)

    🔥 Background
    -------------
    Available space: (Width: 500, Height: 360)
    Requested space: PartialRender (Width: 120,00, Height: 20,00)
    Color: #ffffff

        🔥 Padding
        ----------
        Available space: (Width: 500, Height: 360)
        Requested space: PartialRender (Width: 120,00, Height: 20,00)
        Top: 10
        Right: 10
        Bottom: 10
        Left: 10

            🔥 Constrained
            --------------
            Available space: (Width: 480, Height: 340)
            Requested space: PartialRender (Width: 100,00, Height: 0,00)
            Min Width: 100
            Max Width: 100
            Min Height: -
            Max Height: -

                🔥 Background
                -------------
                Available space: (Width: 100, Height: 340)
                Requested space: PartialRender (Width: 0,00, Height: 0,00)
                Color: #eeeeee

                    🔥 Example debug pointer 🌟
                    ---------------------------
                    Available space: (Width: 100, Height: 340)
                    Requested space: PartialRender (Width: 0,00, Height: 0,00)

                        🔥 Stack
                        --------
                        Available space: (Width: 100, Height: 340)
                        Requested space: PartialRender (Width: 0,00, Height: 0,00)

                            🔥 Padding
                            ----------
                            Available space: (Width: 100, Height: 340)
                            Requested space: PartialRender (Width: 0,00, Height: 0,00)
                            Top: 0
                            Right: 0
                            Bottom: -0
                            Left: 0

                                🔥 BinaryStack
                                --------------
                                Available space: (Width: 100, Height: 340)
                                Requested space: PartialRender (Width: 0,00, Height: 0,00)

                                    🔥 Constrained
                                    --------------
                                    Available space: (Width: 100, Height: 340)
                                    Requested space: Wrap
                                    Min Width: 150
                                    Max Width: 150
                                    Min Height: -
                                    Max Height: -
```
