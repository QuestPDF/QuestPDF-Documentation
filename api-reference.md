# API reference

## Alignment

- This container can be used for positioning its child along X and Y axes.
- Use multiple invocations to align for X and Y axis independently.
- By default, it takes only the required space. Therefore, it is sometimes used after the Extend component.

```csharp
// horizontal alignment
.AlignLeft()
.AlignCenter()
.AlignRight()

// vertical alignment
.AlignTop()
.AlignMiddle()
.AlignBottom()
```

## Aspect Ratio

- Aspect ratio is a ratio between width and height. When component is 200 points in width and 100 points in height, its aspect ratio is equal to 2.
- This container calculates desired size, and scales itself to take as much space as possible.
- Supports paging: on each page, the aspect ratio constraint is preserved.

```csharp
.AspectRatio(0.5) // use a ratio
.AspectRatio(1f / 2f) // or division
```

By default, the AspectRatio element wants to use entire provided width. You can change that behavior using one of the available options:
1) `AspectRatioOption.FitWidth` - the element scales to take entire available width. Default.
2) `AspectRatioOption.FitHeight` - the element scales to take entire available height. Good in conjunction with constraining elements.
3) `AspectRatioOption.FitArea` - this is the combination of both options above. The element scales to take entire available area with preserving its aspect ratio. That means, sometimes it takes entire width and sometimes entire height. This is the safest option.

```csharp
.AspectRatio(0.5, AspectRatioOption.FitArea)
```

::: danger
Please be careful. This component may try to enforce size constraints that are impossible to meet. Such scenarios end up with the layouting exception.
:::

## Background

- This container changes background colour on the area provided by its parent.

```csharp
.Background("#00FF00")
.Background(Colors.Green.Lighten2)
```

## Border

- This container renders border on the area provided by its parent.
- Use multiple invocations to specify the thickness and colour of the border.
- Border is virtual, it does not take space, nor move its child.

```csharp
// apply border on all sides
.Border(1)

// apply border on specified sides
.BorderVertical(2)
.BorderHorizontal(3)

.BorderLeft(4)
.BorderRight(5)
.BorderTop(6)
.BorderBottom(7)

// change colour of the border
.BorderColor("#00FF00")
.BorderColor(Colors.Green.Darken1)
```


## Box

The box element loosens the size constraints provided by its parent. It makes sure that its child is rendered only with necessary space, no bigger.

```csharp{3-3}
.Border(4)
.BorderColor(Colors.Blue.Medium)
.Box()
.Background(Colors.Grey.Lighten2)
.Padding(15)
.Text("Test of the \n box element", TextStyle.Default.Size(20));
```

Without using the box element (notice that the text element takes entire space provided by its parent):

![example](./images/api-reference/box-without.png =300x)

With using the box element (notice that the text element takes only necessary space):

![example](./images/api-reference/box-with.png =300x)


## Canvas

This element allows drawing any custom content using the SkiaSharp canvas objects.

```csharp
.Canvas((canvas, size) =>
{
    using var paint = new SKPaint
    {
        Color = SKColors.Red,
        StrokeWidth = 10,
        IsStroke = true
    };

    // move origin to the center of the available space
    canvas.Translate(size.Width / 2, size.Height / 2);

    // draw a circle
    canvas.DrawCircle(0, 0, 50, paint);
});
```

![example](./images/api-reference/canvas.png =300x)

## Debug

- This container can be used to inspect space taken by its children.
- It does not alter document's layout.

```csharp
// You can specify text and color,
// to better distinguish between various debug elements:
.Debug("Grid example", Colors.Blue.Medium)

// You can skip color, by default it is red:
.Debug("Grid example")

// Or use default style:
.Debug()
```

Example:

```csharp{4}
container
    .Padding(25)
    .Debug("Grid example", Colors.Blue.Medium)
    .Grid(grid =>
    {
        grid.Columns(3);
        grid.Spacing(5);

        foreach (var _ in Enumerable.Range(0, 8))
            grid.Item().Height(50).Placeholder();
    });
```

![example](./images/api-reference/debug.png =210x)

## Debug

- This container can be used to inspect space taken by its children.
- It does not alter document's layout.

```csharp{4}
.Width(300)
.Height(200)
.Padding(25)
.Debug()
.Padding(-5)
.Row(row =>
{
    row.RelativeColumn().Padding(5).Extend().Placeholder();
    row.RelativeColumn().Padding(5).Extend().Placeholder();
});
```

![example](./images/api-reference/debug.png =300x)

## Element

Sometimes it is useful to alter the document's content based on a condition. It is practically only a syntactic sugar to simplify your code. Use this component to achieve such results without breaking the fluent API chain:

```csharp{6-7,18}
// before
public static IContainer TableCell(this IContainer container, bool applyBackground = false)
{
    var container = container.Border(0.5f).BorderColor("#222");

    if (applyBackground)
        container = container.Background("#DEE");

    return container.Padding(5);
}

// after
public static IContainer TableCell(this IContainer container, bool applyBackground = false)
{
    return container
        .Border(0.5f)
        .BorderColor("#222")
        .Element(x => applyBackground ? x.Background("#DEE") : x)
        .Padding(5);
}
```

It is not required to follow the methods chain. Using this approach, you can also end the chain:

```csharp
public static IContainer TextOrBackground(this IContainer container, string text)
{
    return container
        .Padding(10)
        .Element(x =>
        {
            if (string.IsNullOrWhiteSpace(text))
                x.Height(10).Width(50).Background("#DDD");
            else
                x.Text(text);
        });
}
```

## Decoration

- This container consists of three slots: header, content and footer.
- The header element is always visible above the content. When the element is visible on multiple pages, the header element is going to be repeated on each page.
- The footer element is always visible below the content. When the element is visible on multiple pages, the footer element is going to be repeated on each page.
- The content element is visible only once. It is often used along with a PageableStack to allow drawing longer content across multiple pages.

```csharp
.Decoration(decoration =>
{
    decoration
        .Header()
        .Background(Colors.Grey.Medium)
        .Padding(10)
        .Text("Notes", TextStyle.Default.Size(16).Color("#FFF"));

    decoration
        .Content()
        .Background(Colors.Grey.Lighten3)
        .Padding(10)
        .ExtendVertical()
        .Text(Helpers.Placeholders.LoremIpsum());
});
```

![example](./images/api-reference/decoration.png =300x)


## Element

Sometimes it is useful to alter the document's content based on a condition. It is practically only a syntactic sugar to simplify your code. Use this component to achieve such results without breaking the fluent API chain:

```csharp{6-7,18}
// before
public static IContainer TableCell(this IContainer container, bool applyBackground = false)
{
    var container = container.Border(0.5f).BorderColor("#222");

    if (applyBackground)
        container = container.Background("#DEE");

    return container.Padding(5);
}

// after
public static IContainer TableCell(this IContainer container, bool applyBackground = false)
{
    return container
        .Border(0.5f)
        .BorderColor("#222")
        .Element(x => applyBackground ? x.Background("#DEE") : x)
        .Padding(5);
}
```

It is not required to follow the methods chain. Using this approach, you can also end the chain:

```csharp
public static IContainer TextOrBackground(this IContainer container, string text)
{
    return container
        .Padding(10)
        .Element(x =>
        {
            if (string.IsNullOrWhiteSpace(text))
                x.Height(10).Width(50).Background("#DDD");
            else
                x.Text(text);
        });
}
```

## Ensure space

Sometimes when rendering multi-page content, we want to make sure that the element on each page takes some minimal space.
For example, when rendering a table, you may want to show at least 5 rows.
The EnsureSpace element makes sure that if its child is going to take more pages, it has enough space on its page.

```csharp
.EnsureSpace(100)
.Stack(stack =>
{
    // content
});
```

## Extend

- This container extends its size to take entire space possible.

```csharp
.Extend()
.ExtendVertical()
.ExtendHorizontal()
```

## External link

- This container creates a hyperlink around its child area.
- It redirects the user outside the document, e.g. to the webpage.

```csharp{2-2}
.Padding(10)
.ExternalLink("https://www.questpdf.com")
.Text("QuestPDF Webpage");
```

## Height

Use this container to enforce additional sizing rules, e.g. minimum/maximum/exact height.

```csharp
// adjust the height to a specific value
.Height(50)

// set a constraint on the minimum and/or maximum height
.MinHeight(50)
.MaxHeight(100)
```

::: danger
Please be careful. This component may try to enforce size constraints that are impossible to meet when:
- requires more space than is available,
- tries to squeeze its child in less space than necessary.

Such scenarios end up with the layouting exception.
:::

## Images

### Static images

- This element can be used for placing images inside the document.
- By default, It preserves the image's aspect ratio.
- You can use images in any common raster format, e.g. JPG, PNG, BMB, etc.

```csharp
byte[] imageData = /* load raw binary data for an image */;

.Image(imageData)
```

By default, the Image element wants to use entire provided width while preserving its aspect ratio. You can change that behavior using one of the available options:
1) `ImageScaling.FitWidth` - the element scales to take entire available width. Default.
2) `ImageScaling.FitHeight` - the element scales to take entire available height. Good in conjunction with constraining elements.
3) `ImageScaling.FitArea` - this is the combination of both options above. The element scales to take entire available area with preserving its aspect ratio. That means, sometimes it takes entire width and sometimes entire height. This is the safest option.
4) `ImageScaling.Resize` - element resizes itself to cover entire available space. It does not preserve proportions. The image may look incorrectly scaled, therefore it is not desired in most of the cases.

```csharp
.Image(imageData, ImageScaling.FitArea)
```

::: danger
Please be careful. This component may try to enforce size constraints that are impossible to meet. Such scenarios end up with the layouting exception.
:::

### Dynamic images

- QuestPDF offers flexible layouts, therefore it is hard to predict image resolution.
- To achieve the best image clarity, generate images with specified resolution (or multiple of the resolution for retina displays).
- Useful when creating maps / charts.  
- This element behaves similarly to static images.
- As an argument, it expects a function that takes available space and returns an image in a binary format.

```csharp{7-7}
// somewhere in your code
byte[] GenerateImage(Size size)
{
    // logic that generates and returns an image with a specific resolution
}

.DynamicImage(GenerateImage);
```

## Grid

- The Grid elements builds entire layout based on multiple Row elements put inside a Stack.
- Space is divided into multiple columns (12 by default).
- Each item can take multiple columns.
- If in the row there is not enough space for the item, it is pushed to the next row.
- If there is more space than necessary, items can be aligned to the left / center or right.  
- It is possible to put space between elements.

```csharp
.Grid(grid =>
{
    grid.VerticalSpacing(15);
    grid.HorizontalSpacing(15);
    grid.AlignCenter();
    grid.Columns(10); // 12 by default

    grid.Item(6).Background(Colors.Blue.Lighten1).Height(50);
    grid.Item(4).Background(Colors.Blue.Lighten3).Height(50);

    grid.Item(2).Background(Colors.Teal.Lighten1).Height(70);
    grid.Item(3).Background(Colors.Teal.Lighten2).Height(70);
    grid.Item(5).Background(Colors.Teal.Lighten3).Height(70);

    grid.Item(2).Background(Colors.Green.Lighten1).Height(50);
    grid.Item(2).Background(Colors.Green.Lighten2).Height(50);
    grid.Item(2).Background(Colors.Green.Lighten3).Height(50);
});
```

![example](./images/api-reference/grid.png =400x)


## Internal link

### Location

- This container creates a new location in the document where user can be redirected.
- Specify the location name, so you can use it when creating a link.

```csharp{1-1}
.Location("links-chapter")
.Section(section =>
{
    section.Header().Text("About internal links");
    section.Content().Text("Some content");
});
```

### Link

- This container creates a hyperlink around its child area.
- It redirects the user to other place in the document.
- Specify target place by providing proper location name.

```csharp{1-1}
.InternalLink("links-chapter")
.Text("About internal links chapter");
```

## Layers

- This element allows putting elements below and above the main content.
- The paging algorithm is driven by the PrimaryLayer.
- You need to specify exactly one PrimaryLayer.

```csharp
.Layers(layers =>
{
    // layer below main content
    layers
        .Layer()
        .Height(100)
        .Width(100)
        .Background(Colors.Grey.Lighten3);

    layers
        .PrimaryLayer()
        .Padding(25)
        .Stack(stack =>
        {
            stack.Spacing(5);

            foreach (var _ in Enumerable.Range(0, 7))
                stack.Item().Text(Placeholders.Sentence());
        });

    // layer above the main content    
    layers
        .Layer()
        .AlignCenter()
        .AlignMiddle()
        .Text("Watermark", TextStyle.Default.Size(48).Bold().Color(Colors.Green.Lighten3));

    layers
        .Layer()
        .AlignBottom()
        .PageNumber("Page {number}", TextStyle.Default.Size(16).Color(Colors.Green.Medium));
});
```

![example](./images/api-reference/layers-1.png =400x)
![example](./images/api-reference/layers-2.png =400x)


## Padding

- This container adds space around its child.

```csharp
// apply padding on all sides
.Padding(5)

// apply padding on specified sides
.PaddingVertical(10)
.PaddingHorizontal(15)

.PaddingLeft(20)
.PaddingRight(25)
.PaddingTop(30)
.PaddingBottom(35)
```

## Page

- This container consists of three slots: header, content and footer.
- The header element is always visible at the top on each page.
- The footer element is always visible at the bottom on each page.
- The content element is drawn on the rest of the space (between the header and the footer.)

```csharp
.Page(page =>
{
    page.Header()
        .Height(60)
        .Background(Colors.Grey.Lighten1)
        .AlignCenter()
        .AlignMiddle()
        .Text("Header");

    page.Content()
        .Background(Colors.Grey.Lighten2)
        .AlignCenter()
        .AlignMiddle()
        .Text("Content");

    page.Footer()
        .Height(30)
        .Background(Colors.Grey.Lighten1)
        .AlignCenter()
        .AlignMiddle()
        .Text("Footer");
});
```

::: danger
Please be careful! When the total height of the header and footer element is greater than the total page's height, there is not space enough for the content. In such a case, the layouting exception is thrown.
:::

![example](./images/api-reference/page-example.png =298x)

## Page break

- This component changes the layout flow and forces its container to render the following content on the next page.
- Usually used inside the pageable Stack component.

```csharp
.PageBreak();
```

## Page number

- This component displays the current page number.

```csharp
.PageNumber(Typography.Normal)
```

::: tip
You can change text format by using the `{number}` slot as well as provide custom font styling:

```csharp
.PageNumber("Page {number}", TextStyle.Default.Size(20))
```
:::

## Placeholder

- Renders a placeholder that is a grey rectangle with an image icon in the middle.
- Takes all available space - to limit its size please use `Width` and `Height` constraints.

```csharp
.Width(100).Height(50).Placeholder();
```

![example](./images/api-reference/placeholder-example.png =200x)

## Row

- This container divides available space into individual columns.
- Columns can have a fixed size (provided in points) or be proportional.
- You can use pageable content inside each column.
- If the content of any column wraps, entire container wraps.

```csharp
.Row(row =>
{
    row.ConstantColumn(100)
        .Background("#DDD")
        .Padding(10)
        .ExtendVertical()
        .Text("This column is 100 points width");

    row.RelativeColumn()
        .Background("#BBB")
        .Padding(10)
        .Text("This column takes 1/3 of the available space");

    row.RelativeColumn(2)
        .Background("#DDD")
        .Padding(10)
        .Text("This column takes 2/3 of the available space");
});
```

![example](./images/api-reference/row-example.png =740x)

You can specify the spacing between each column by using the Spacing() method:

```csharp
.Row(row =>
{
    row.Spacing(20);
    row.RelativeColumn(2).Border(1).Background(Colors.Grey.Lighten1);
    row.RelativeColumn(3).Border(1).Background(Colors.Grey.Lighten2);
    row.RelativeColumn(4).Border(1).Background(Colors.Grey.Lighten3);
});
```

![example](./images/api-reference/row-spacing.png =370x)


## Show entire

Use this container to prevent the element from being paged. If on the page there is not enough space, the element is wrapped to the next page without splitting its content.

This container is commonly used with the Stack and Row elements to make sure that their content is fully visible on a single page.

```csharp
.ShowEntire()
// element that will not be paged
```

::: danger
Please be careful when using the ShowEntire container. If its content requires more space than is available on the page, the rendering process will end up with the layouting exception.
:::


## Show if

This container allows you to show/hide its child based on a condition. It is practically only a syntactic sugar to simplify code and avoid standard if-statements.

```csharp
var condition = numberOfElements > 5;

// c# if-statement approach
.Row(row =>
{
    row.RelativeColumn().Text("One");

    var secondColumn = row.RelativeColumn();

    if (condition)
        secondColumn.Text("Two");
});

// equivalent fluent approach
.Row(row =>
{
    row.RelativeColumn().Text("One");
    row.RelativeColumn().ShowIf(condition).Text("Two");
});
```

## Show once

- This container changes the default rendering behaviour.
- All its children, once fully rendered, are not going to be present on next pages.
- Useful when creating tables. In such a case, the table structure should be visible on each page but the content inside the cell should not be repeated.

```csharp
.ShowOnce()
```

## Stack

- The Stack element is a multi-element container. You can put any set of elements you want.
- The algorithm places element one underneath another. Each element may take the entire width.

By default, all elements should fit on a single page. Otherwise, the entire content is be wrapped to the next page.

```csharp
.Stack(stack =>
{
    stack.Item().Background(Colors.Grey.Medium).Height(50);
    stack.Item().Background(Colors.Grey.Lighten1).Height(100);
    stack.Item().Background(Colors.Grey.Lighten2).Height(150);
});
```

![example](./images/api-reference/stack.png =350x)

Use the Spacing property to add some space between elements:

```csharp
.Stack(stack =>
{
    stack.Spacing(15);

    stack.Item().Background(Colors.Grey.Medium).Height(50);
    stack.Item().Background(Colors.Grey.Lighten1).Height(100);
    stack.Item().Background(Colors.Grey.Lighten2).Height(150);
});
```

![example](./images/api-reference/stack-spacing.png =350x)

## Text

- Draws text with default or custom styling.
- Text always takes as little space as possible.
- If text is longer, the element may take the entire width and break to the next line.
- This element does not support paging at this moment.

```csharp
.Text("Sample text")
.Text("Red big text", TextStyle.Default.Color("#F00").Size(24))
```

You can define text style using available FluentAPI methods which are described below.

### Basic font style

```csharp
.Color("#F00")
.FontType("Times New Roman")
.Size(24)
.LineHeight(1.5f)
.Italic()
```

### Font alignment

You these fluent API methods to adjust text position:

```csharp
.AlignLeft()
.AlignCenter()
.AlignRight()
```

### Font weight

You can easily set up font weight by using one of the following fluent API methods:

```csharp
.Weight(FontWeight.Normal)

.Thin()
.ExtraLight()
.Light()
.NormalWeight()
.Medium()
.SemiBold()
.Bold()
.ExtraBold()
.Black()
.ExtraBlack()
```

### Typography pattern

Please consider an example Typography class that describes text styling across all documents:

```csharp
// single typography class can help with keeping document look&feel consistent
public static class Typography
{
    public static TextStyle Title => TextStyle
        .Default
        .FontType("Helvetica")
        .Color("#000000")
        .Size(20)
        .Bold();

    public static TextStyle Headline => TextStyle
        .Default
        .FontType("Helvetica")
        .Color("#047AED")
        .Size(14);

    public static TextStyle Normal => TextStyle
        .Default
        .FontType("Helvetica")
        .Color("#000000")
        .Size(10)
        .LineHeight(1.25f)
        .AlignLeft();
}

```

## Width

Use this container to enforce additional sizing rules: minimum/maximum/exact width,

```csharp
// adjust width to specific value
.Width(50)

// set a constraint on the minimum and/or maximum width
.MinWidth(50)
.MaxWidth(100)
```

::: danger
Please be careful. This component may try to enforce size constraints that are impossible to meet when:
- requires more space than is available,
- tries to squeeze its child in less space than necessary.

Such scenarios end up with the layouting exception.
:::
