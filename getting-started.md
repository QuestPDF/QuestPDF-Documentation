# Getting started

## What to expect

This tutorial introduces you to the essentials of the QuestPDF library by showing you how to implement a basic invoice document. It discusses architectural concepts, then shows how to prepare data layers and finally presents how to use various elements to compose a document's structure. At the end of this tutorial, you will get code capable of generating the full, page-aware invoice similar to the one below. Let's get started!

![invoice](./images/getting-started/invoice.png)

::: tip
You can download, analyse and compile the code yourself by visiting [this GitHub repository](https://github.com/QuestPDF/QuestPDF).
:::

## Installation

The library is distributed as a nuget package. You can install it as any other nuget package from your IDE, try to search by `QuestPDF`. You can find package details on [on this webpage](https://www.nuget.org/packages/QuestPDF/).

[![quest pdf logo](./images/nuget.svg =200x)](https://www.nuget.org/packages/QuestPDF/)

## Implementation layers

The PDF generation process involves work in three main application layers:

1) **Document models** - a set of classes describing PDF document content. In the vast majority of cases, they are just simple POCO classes without any business logic inside.

2) **Data source** - layer where your domain entities are mapped into document models. This layer is usually implemented by creating a separate class that communicates with your persistency abstraction and then maps/translates/aggregates the data into the desired format.

3) **Template** - presentation layer describing how to visualize information and convert it into a PDF file. This process can be achieved in multiple ways, a common scenario is to generate HTML code and then use special "HTML to PDF" converter. The QuestPDF approach is different: this library offers you a special document layout engine. By using simple, yet highly composable elements, you can design complex layouts with ease - all with great fluent API.

## Document models layer

When working on a new PDF document, think about its content and what information should be included. This helps with designing proper models structure. This time, we need to pass basic invoice information, seller's and customer's addresses, list of ordered items and finally optional comments.

```csharp
public class InvoiceModel
{
    public int InvoiceNumber { get; set; }
    public DateTime IssueDate { get; set; }
    public DateTime DueDate { get; set; }

    public Address SellerAddress { get; set; }
    public Address CustomerAddress { get; set; }

    public List<OrderItem> Items { get; set; }
    public string Comments { get; set; }
}

public class OrderItem
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}

public class Address
{
    public string CompanyName { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public object Email { get; set; }
    public string Phone { get; set; }
}
```

## Data source layer

Once models are defined, you need to create a data source class which connects to the persistency layer, prepares and converts data. Although this layer has no limitations and you have full control over its implementation, there are several patterns and practices worth to follow.

Firstly, in the data source class, you can define all necessary business logic. Simple operations can be placed inside the template layer (discussed in the next chapter) but more complex calculations should be kept here or inappropriate services. This way you prevent business logic leakage from your domains.

If you expect to have multiple documents with similar content, for instance, the same header, define a single shared model and a corresponding method to populate it. The QuestPDF library takes the `DRY` (don't repeat yourself) principle to heart by providing the powerful concept of components. You can define your content elements, inject data models to generate proper content and even customize it with slots. Those concepts are similar to other popular libraries like `Vue` or `Angular`.

This tutorial focuses mainly on preparing the layout structure. For this reason, all necessary data is randomly generated.

::: tip
To improve the workflow, use various helper methods to easily generate fake data. All of them are available in the static `TextPlaceholder` class. This way, it is easy to prototype document structure without implementing a real data source.
:::

```csharp
public static class InvoiceDocumentDataSource
{
    private static Random Random = new Random();

    public static InvoiceModel GetInvoiceDetails()
    {
        var items = Enumerable
            .Range(1, 8)
            .Select(i => GenerateRandomOrderItem())
            .ToList();

        return new InvoiceModel
        {
            InvoiceNumber = Random.Next(1_000, 10_000),
            IssueDate = DateTime.Now,
            DueDate = DateTime.Now + TimeSpan.FromDays(14),

            SellerAddress = GenerateRandomAddress(),
            CustomerAddress = GenerateRandomAddress(),

            Items = items,
            Comments = TextPlaceholder.Paragraph()
        };
    }

    private static OrderItem GenerateRandomOrderItem()
    {
        return new OrderItem
        {
            Name = TextPlaceholder.Label(),
            Price = (decimal) Math.Round(Random.NextDouble() * 100, 2),
            Quantity = Random.Next(1, 10)
        };
    }

    private static Address GenerateRandomAddress()
    {
        return new Address
        {
            CompanyName = TextPlaceholder.Name(),
            Street = TextPlaceholder.Label(),
            City = TextPlaceholder.Label(),
            State = TextPlaceholder.Label(),
            Email = TextPlaceholder.Email(),
            Phone = TextPlaceholder.PhoneNumber()
        };
    }
}
```

## Template layer

The most important aspect of document generation is to design and implement its layout. QuestPDF offers multiple tools to achieve the desired results. The most important concepts are discussed in this tutorial. For more information about specific elements, please visit the [API Reference](./api-reference).

### Scaffolding page structure

The implementation starts with defining a new class implementing the `IDocument` interface. This interface contains two methods: `GetMetadata()` and `Compose()`. The first one is used for providing basic document's information about author, keywords, DPI settings and so on. The latter gives a container where you should place all content.

```csharp
public interface IDocument
{
    DocumentMetadata GetMetadata();
    void Compose(IContainer container);
}
```

::: tip
This tutorial uses the default metadata configuration. If you want to override it, just create and return new `Metadata` object with an appropriate configuration. Most of the properties are self-explanatory.
:::

The class below implements the basic document structure. Please note how different Fluent API invocations are chained together. Each invocation creates a separate container with an appropriate style, visuals, size or alignment constraints, etc. Therefore, the order of methods is really important and swapping elements may provide different results.

Most of the elements are simple containers, that is they have only a single child. In such cases, the method chaining is used for describing documents content. However, there are more advanced elements which offer multiple slots to fill.

```csharp
public class InvoiceDocument : IDocument
{
    public InvoiceModel Model { get; }

    public InvoiceDocument(InvoiceModel model)
    {
        Model = model;
    }

    public DocumentMetadata GetMetadata() => DocumentMetadata.Default;

    public void Compose(IContainer container)
    {
        container
            .PaddingHorizontal(50)
            .PaddingVertical(50)
            .Page(page =>
            {
                page.Header().Height(100).Background("CCC");
                page.Content().Background("EEE");
                page.Footer().Height(50).Background("CCC");
            });
    }
}
```

The `PaddingHorizontal` and `PaddingVertical` elements have been used to define margins. QuestPDF uses `point` as a length unit. By definition, `1 inch = 72 points`. For example, A4 page has dimensions `595 x 842 points`.

The `Page` element has three slots available: `Header`, `Content` and `Footer`. Moreover, there are additional rules for them:

1) **Header** is placed always at the top.
2) **Footer** is placed always at the bottom.
3) **Content** takes entire space left.

So far we have scaffolded a very simple page where each section has a different colour or size:

![example](./images/getting-started/step-scaffolding.png =595x)

### Header implementation

This chapter introduces a couple of very important layouting elements: `Row` and `Stack`. Before we discuss how they work, let's analyze the new code sample. First of all, when creating a document, we expect that it will contain multiple sections and therefore the amount of code is going to increase significantly. 

To keep the code clean and easy to maintain, you can create additional methods for each section. The general principle is to use a composition of simple layout structures, a structure per method. Most of the API invocations have special overloads designed for **1)** method chaining and **2)** passing method as an argument.

```csharp
public class InvoiceDocument : IDocument
{
    /* code omitted */

    public void Compose(IContainer container)
    {
        container
            .PaddingHorizontal(50)
            .PaddingVertical(50)
            .Page(page =>
            {
                page.Header(ComposeHeader);
                page.Content(ComposeContent);
                page.Footer().AlignCenter().PageNumber("Page {number}");
            });
    }

    void ComposeHeader(IContainer container)
    {
        container.Row(row =>
        {
            row.RelativeColumn().Stack(stack =>
            {
                stack.Element().Text($"Invoice #{Model.InvoiceNumber}", TextStyle.Default.Size(20));
                stack.Element().Text($"Issue date: {Model.IssueDate:d}");
                stack.Element().Text($"Due date: {Model.DueDate:d}");
            });

            stack.ConstantColumn(100).Height(50).Placeholder();
        });
    }

    void ComposeContent(IContainer container)
    {
        container
            .PaddingVertical(40)
            .Height(250)
            .Background("EEE")
            .AlignCenter()
            .AlignMiddle()
            .Text("Content", TextStyle.Default.Size(16));
    }
}
```

The code above produces the following result:

![example](./images/getting-started/step-header.png =595x)

#### Row

The `Row` element takes the entire width available and then splits it into multiple columns. Each column can be filled defined dynamically and filled separately with different content. All columns inside a row have the same height equal to the highest child inside. You can define any number of columns you want, even dynamically with a loop.

The `ConstantColumn` has always the same width provided as an argument. The `RelativeColumn` however, allows resizing the child depending on other columns. As an optional argument (default is `1`) you can provide its relative size.

The algorithm is simple. Size of constant columns is maintained and subtracted from the available width. The space left is then divided by relative columns in proportions equal to relative sizes. For example, if a row has two relative columns with sizes `1` and `2`, the first column takes `1/3` of available space, and the second one takes `2/3`.

![example](./images/api-reference/row-example.png =740x)

#### Stack

The `Stack` element is used for displaying elements one underneath another. You can generate elements conditionally and dynamically in a loop. It is also possible to configure space between elements by using the `Spacing` method (default is `0 points`).

The screenshot below shows a stack containing three colored elements:

![example](./images/api-reference/stack-example.png =500x)

### Content implementation

In the document generation world, it is expected that a single document has multiple pages. The QuestPDF library assumes that certain elements should be repeated across the page, for example, header and footer. Additionally, it offers a great mechanism to support paging content. It is not desired to split the content in any place, usually, we want to define explicitly where it should happen if needed.

A common practice is using the `PageableStack` element inside the `Content` section. If an element would be bigger than available space, it is going to be wrapped to the next page. This way, the `PageableStack` element makes sure that the split happens only between its children and they are not divided.

```csharp
public class InvoiceDocument : IDocument
{
    /* code omitted */

    void ComposeContent(IContainer container)
    {
        container.PaddingVertical(40).PageableStack(stack =>
        {
            stack.Spacing(5);

            stack.Element(ComposeTable);

            if (!string.IsNullOrWhiteSpace(Model.Comments))
                stack.Element().PaddingTop(25).Element(ComposeComments);
        });
    }

    void ComposeTable(IContainer container)
    {
        container
            .Height(250)
            .Background("EEE")
            .AlignCenter()
            .AlignMiddle()
            .Text("Table", TextStyle.Default.Size(16));
    }

    void ComposeComments(IContainer container)
    {
        container.Background("#EEE").Padding(10).Stack(stack =>
        {
            stack.Spacing(5);
            stack.Element().Text("Comments", TextStyle.Default.Size(14));
            stack.Element().Text(Model.Comments);
        });
    }
}
```

In the code, the content structure is prepared. Please notice that a comments section is displayed conditionally:

![example](./images/getting-started/step-content.png =595x)

### Table generation

Congratulations, you already know the most important pieces needed to create complex documents. Let's use that knowledge to generate a dynamic table showing all orders. It can be done in two steps:

1) **Header** - it is created by a `Row` elements with multiple columns inside.
2) **Content** - implemented by a `PageableStack` element, inside which a loop is used to generate a separate row for each order's item.

```csharp
public class InvoiceDocument : IDocument
{
    /* code omitted */

    void ComposeTable(IContainer container)
    {
        container.PaddingTop(10).Section(section =>
        {
            // header
            section.Header().BorderBottom(1).Padding(5).Row(row =>
            {
                row.ConstantColumn(25).Text("#");
                row.RelativeColumn(3).Text("Product");
                row.RelativeColumn().AlignRight().Text("Unit price");
                row.RelativeColumn().AlignRight().Text("Quantity");
                row.RelativeColumn().AlignRight().Text("Total");
            });

            // content
            section
                .Content()
                .PageableStack(stack =>
                {
                    foreach (var item in Model.Items)
                    {
                        stack.Element().BorderBottom(1).BorderColor("CCC").Padding(5).Row(row =>
                        {
                            row.ConstantColumn(25).Text(Model.Items.IndexOf(item) + 1);
                            row.RelativeColumn(3).Text(item.Name);
                            row.RelativeColumn().AlignRight().Text($"{item.Price}$");
                            row.RelativeColumn().AlignRight().Text(item.Quantity);
                            row.RelativeColumn().AlignRight().Text($"{item.Price * item.Quantity}$");
                        });
                    }
                });
        });
    }

    /* code omitted */
}
```

![example](./images/getting-started/step-table.png =595x)

#### Section

Please notice that this implementation uses the `PageableStack` element. That means, the page wrap can happen between any of the order items. When you think about it, you can realize that in simplified flow algorithm, there would be no table's header on the next page.

This exactly why the `Section` element was created! It has two slots: `Header` and `Content`. When this element is wrapped to multiple pages, it makes sure that the header element is always present. Please take a look at screenshots from the very beginning of this tutorial and notice that it is true. Even the table was split into two pages, on each page the header is visible.

### Address component

The last skill to master is how to reuse code and implementation. When creating multiple different document types, usually they share common sections, for example, header with a company logo. And sometimes, your page has multiple sections with the same structure but different information. Moreover, some section may be so complex that they should be extracted away into separate classes.

To properly solve all of the scenarios above, use the component approach. This way you create independent, project-specific elements that can be reused and easily maintained. The implementation starts with the `IComponent` interface:

```csharp
public interface IComponent
{
    void Compose(IContainer container);
}
```

Creating components is very similar to extracting code into separate methods. This time, the separation is even greater because you move the code into a new class, in a new file, and additionally, you can easily provide arguments to the component.

```csharp
public class AddressComponent : IComponent
{
    private string Title { get; }
    private Address Address { get; }

    public AddressComponent(string title, Address address)
    {
        Title = title;
        Address = address;
    }

    public void Compose(IContainer container)
    {
        container.Stack(stack =>
        {
            stack.Spacing(5);

            stack.Element().BorderBottom(1).PaddingBottom(5).Text(Title);

            stack.Element().Text(Address.CompanyName);
            stack.Element().Text(Address.Street);
            stack.Element().Text($"{Address.City}, {Address.State}");
            stack.Element().Text(Address.Email);
            stack.Element().Text(Address.Phone);
        });
    }
}
```

The code below shows how to use the newly implemented component:

```csharp{11-16}
public class InvoiceDocument : IDocument
{
    /* code omitted */

    void ComposeContent(IContainer container)
    {
        container.PaddingVertical(40).PageableStack(stack => 
        {
            stack.Spacing(5);

            stack.Element().Row(row =>
            {
                row.RelativeColumn().Component(new AddressComponent("From", Model.SellerAddress));
                row.ConstantColumn(50);
                row.RelativeColumn().Component(new AddressComponent("For", Model.CustomerAddress));
            });

            stack.Element(ComposeTable);

            var totalPrice = Model.Items.Sum(x => x.Price * x.Quantity);
            stack.Element().AlignRight().Text($"Grand total: {totalPrice}$", TextStyle.Default.Size(14));

            if (!string.IsNullOrWhiteSpace(Model.Comments))
                stack.Element().PaddingTop(25).Element(ComposeComments);
        });
    }

    /* code omitted */
}
```

![example](./images/getting-started/step-final.png =595x)

## Document generation

Once all pieces are ready, the generation process is straightforward:

```csharp{5-7}
static void Main(string[] args)
{
    var filePath = "invoice.pdf";

    var model = InvoiceDocumentDataSource.GetInvoiceDetails();
    var document = new InvoiceDocument(model);
    document.Generate(filePath);

    Process.Start("explorer.exe", filePath);
}
```

::: tip
There are multiple overloads of the `Generate` method. In the example above, the document has been saved into a new file. Additionally, there is an overload that returns a byte array. If you are working on the webserver and care about memory consumption, please use the overload that accepts a stream as an argument.
:::
