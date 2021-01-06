# Patters and practices

## Document metadata

You can modify the PDF document metadata by returning the `DocumentMetadata` object from the `IDocument.GetMetadata()` method. There are multiple properties available, some of them have default values:

```csharp
public class DocumentMetadata
{
    public Size Size { get; set; } = PageSizes.A4;
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

    public static DocumentMetadata Default => new DocumentMetadata();
}
```

::: tip
The `ImageQuality` property controls the trade-off between quality and size. The default value `101` corresponds to lossless encoding. When you use a value less than 100, all images are opaque and encoded using the JPEG algorithm. The smaller the value is, the higher compression is used.
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


## Prototyping

It is a very common scenario when we know how the document layout should look like, however, we do not have appropriate data to fill it. The Quest PDF library provides a set of helpers to generate random text of different kinds:

```csharp
using QuestPDF.Helpers;

TextPlaceholder.LoremIpsum();
TextPlaceholder.Label();
TextPlaceholder.Sentence();
TextPlaceholder.Question();
TextPlaceholder.Paragraph();
TextPlaceholder.Paragraphs();

TextPlaceholder.Email();
TextPlaceholder.Name();
TextPlaceholder.PhoneNumber();

TextPlaceholder.Time();
TextPlaceholder.ShortDate();
TextPlaceholder.LongDate();
TextPlaceholder.DateTime();

TextPlaceholder.Integer();
TextPlaceholder.Decimal();
TextPlaceholder.Percent();
```

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
