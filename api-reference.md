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

- This container takes the entire width provided by its parent.
- Then, it calculates required height to meet the aspect ratio requirement.
- If there is no space available, it wraps to the next page.
- Supports paging: on each page, the aspect ratio constraint is preserved.

```csharp
.AspectRatio(0.5) // use a ratio
.AspectRatio(1f / 2f) // or division
```

## Background

- This container changes background colour on the area provided by its parent.

```csharp
.Background("#EEE")
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
.BorderColor("#F00")
```

## Constrained

- Use this container to enforce additional sizing rules, e.g. minimal height or maximum width.
- It is possible to control the width and height independently.

```csharp
// adjust width to specific value
.Width(50)

// set a constraint on the minimum and/or maximum width
.MinWidth(50)
.MaxWidth(100)

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

## Images

### Static images

- This element can be used for placing images inside the document.
- By default, It preserves the image's aspect ratio.
- You can use images in any common raster format, e.g. JPG, PNG, BMB, etc.

```csharp
byte[] imageData = /* load raw binary data for an image */;

.Image(imageData)
```

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
        .Background("#BBB")
        .AlignCenter()
        .AlignMiddle()
        .Text("Header");

    page.Content()
        .Background("#DDD")
        .AlignCenter()
        .AlignMiddle()
        .Text("Content");

    page.Footer()
        .Height(30)
        .Background("#BBB")
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

## Section

- This container consists of two parts: header and content.
- The header element is always visible above the content. When the element is visible on multiple pages, the header element is going to be repeated on each page.
- The content element is visible only once. It is often used along with a PageableStack to allow drawing longer content across multiple pages.

```csharp
.Section(section =>
{
    section
        .Header()
        .Background("#888")
        .Padding(10)
        .Text("Notes", TextStyle.Default.Size(16).Color("#FFF"));

    section
        .Content()
        .Background("#DDD")
        .Padding(10)
        .ExtendVertical()
        .Text(TextPlaceholder.LoremIpsum());
});
```

![example](./images/api-reference/section-example.png =300x)

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
- Useful when creating tables. In such a case, the table structure should be visible on each page
but the content inside the cell should not be repeated.

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
    stack.Element().Text("First item", Typography.Normal);
    stack.Element().Text("Second item", Typography.Normal);
    stack.Element().Text("Third item", Typography.Normal);

    // and so on...
});
```

::: danger
Please be careful when using not-pageable stack. If its content requires more space than is available on the page, the rendering process will end up with the layouting exception. Please use PageableStack by default.
:::

Much more useful version of the Stack component is to use the pageable stack, like so:

```csharp
.PageableStack(stack =>
{
    stack.Element().Text("First item", Typography.Normal);

    // ...
    // if the content does not fit on a single page, it is paged properly
    // ...

    stack.Element().Text("N-th item", Typography.Normal);
});
```

You can specify the spacing between each element by using the Spacing() methods:

```csharp
.PageableStack(stack =>
{
    stack.Spacing(5);

    // define content here
});
```

Please analyse an example showing how to use the Stack component with additional spacing between its elements:

```csharp
.Stack(stack =>
{
    stack.Spacing(5);

    stack
        .Element()
        .Background("#999")
        .Height(50);

    stack
        .Element()
        .Background("#BBB")
        .Height(100);

    stack
        .Element()
        .Background("#DDD")
        .Height(150);
});
```

![example](./images/api-reference/stack-example.png =350x)


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
