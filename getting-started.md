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

Once models are defined, you need to create a data source class which connects to the persistence layer, prepares and converts data. Although this layer has no limitations and you have full control over its implementation, there are several patterns and practices worth to follow.

Firstly, in the data source class, you can define all necessary business logic. Simple operations can be placed inside the template layer (discussed in the next chapter) but more complex calculations should be kept here or inappropriate services. This way you prevent business logic leakage from your domains.

If you expect to have multiple documents with similar content, for instance, the same header, define a single shared model and a corresponding method to populate it. The QuestPDF library takes the `DRY` (don't repeat yourself) principle to heart by providing the powerful concept of components. You can define your content elements, inject data models to generate proper content and even customize it with slots. Those concepts are similar to other popular libraries like `Vue` or `Angular`.

This tutorial focuses mainly on preparing the layout structure. For this reason, all necessary data is randomly generated.

::: tip
To improve the workflow, use various helper methods to easily generate fake data. All of them are available in the static `Placeholders` class. This way, it is easy to prototype document structure without implementing a real data source.
:::

```csharp
using QuestPDF.Helpers;

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
            Comments = Placeholders.Paragraph()
        };
    }

    private static OrderItem GenerateRandomOrderItem()
    {
        return new OrderItem
        {
            Name = Placeholders.Label(),
            Price = (decimal) Math.Round(Random.NextDouble() * 100, 2),
            Quantity = Random.Next(1, 10)
        };
    }

    private static Address GenerateRandomAddress()
    {
        return new Address
        {
            CompanyName = Placeholders.Name(),
            Street = Placeholders.Label(),
            City = Placeholders.Label(),
            State = Placeholders.Label(),
            Email = Placeholders.Email(),
            Phone = Placeholders.PhoneNumber()
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
    void Compose(IDocumentContainer container);
}
```

::: tip
This tutorial uses the default metadata configuration. If you want to override it, just create and return new `Metadata` object with an appropriate configuration. Most of the properties are self-explanatory.
:::

The class below implements the basic document structure. Please note how different Fluent API invocations are chained together. Each invocation creates a separate container with an appropriate style, visuals, size or alignment constraints, etc. Therefore, the order of methods is really important and swapping elements may provide different results.

Most of the elements are simple containers, that is they have only a single child. In such cases, the method chaining is used for describing documents content. However, there are more advanced elements which offer multiple slots to fill.

```csharp
using QuestPDF.Drawing;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

public class InvoiceDocument : IDocument
{
    public InvoiceModel Model { get; }

    public InvoiceDocument(InvoiceModel model)
    {
        Model = model;
    }

    public DocumentMetadata GetMetadata() => DocumentMetadata.Default;

    public void Compose(IDocumentContainer container)
    {
        container
            .Page(page =>
            {
                page.Margin(50);
            
                page.Header().Height(100).Background(Colors.Grey.Lighten1);
                page.Content().Background(Colors.Grey.Lighten3);
                page.Footer().Height(50).Background(Colors.Grey.Lighten1);
            });
    }
}
```

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

    public void Compose(IDocumentContainer container)
    {
        container
            .Page(page =>
            {
                page.Margin(50);
            
                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeContent);

                    
                page.Footer().AlignCenter().Text(x =>
                {
                    x.CurrentPageNumber();
                    x.Span(" / ");
                    x.TotalPages();
                });
            });
    }

    void ComposeHeader(IContainer container)
    {
        var titleStyle = TextStyle.Default.Size(20).SemiBold().Color(Colors.Blue.Medium);
    
        container.Row(row =>
        {
            row.RelativeColumn().Stack(stack =>
            {
                stack.Item().Text($"Invoice #{Model.InvoiceNumber}", titleStyle);

                stack.Item().Text(text =>
                {
                    text.Span("Issue date: ", TextStyle.Default.SemiBold());
                    text.Span($"{Model.IssueDate:d}");
                });
                
                stack.Item().Text(text =>
                {
                    text.Span("Due date: ", TextStyle.Default.SemiBold());
                    text.Span($"{Model.DueDate:d}");
                });
            });

            row.ConstantColumn(100).Height(50).Placeholder();
        });
    }

    void ComposeContent(IContainer container)
    {
        container
            .PaddingVertical(40)
            .Height(250)
            .Background(Colors.Grey.Lighten3)
            .AlignCenter()
            .AlignMiddle()
            .Text("Content", TextStyle.Default.Size(16));
    }
}
```

The code above produces the following result:

![example](./images/getting-started/step-header.png =595x)

### Content implementation

In the document generation world, it is expected that a single document has multiple pages. The QuestPDF library assumes that certain elements should be repeated across the page, for example, header and footer. Additionally, it offers a great mechanism to support paging content. It is not desired to split the content in any place, usually, we want to define explicitly where it should happen if needed.

```csharp
public class InvoiceDocument : IDocument
{
    /* code omitted */

    void ComposeContent(IContainer container)
    {
        container.PaddingVertical(40).Stack(stack =>
        {
            stack.Spacing(5);

            stack.Item().Element(ComposeTable);

            if (!string.IsNullOrWhiteSpace(Model.Comments))
                stack.Item().PaddingTop(25).Element(ComposeComments);
        });
    }

    void ComposeTable(IContainer container)
    {
        container
            .Height(250)
            .Background(Colors.Grey.Lighten3)
            .AlignCenter()
            .AlignMiddle()
            .Text("Table", TextStyle.Default.Size(16));
    }

    void ComposeComments(IContainer container)
    {
        container.Background(Colors.Grey.Lighten3).Padding(10).Stack(stack =>
        {
            stack.Spacing(5);
            stack.Item().Text("Comments", TextStyle.Default.Size(14));
            stack.Item().Text(Model.Comments);
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
        container.PaddingTop(10).Decoration(decoration =>
        {
            // header
            decoration.Header().BorderBottom(1).Padding(5).Row(row =>
            {
                row.ConstantColumn(25).Text("#");
                row.RelativeColumn(3).Text("Product");
                row.RelativeColumn().AlignRight().Text("Unit price");
                row.RelativeColumn().AlignRight().Text("Quantity");
                row.RelativeColumn().AlignRight().Text("Total");
            });

            // content
            decoration
                .Content()
                .Stack(stack =>
                {
                    foreach (var item in Model.Items)
                    {
                        stack.Item().BorderBottom(1).BorderColor(Colors.Grey.Lighten3).Padding(5).Row(row =>
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

#### Decoration

Please notice that this implementation uses the `Stack` element. That means, the page wrap can happen between any of the order items. When you think about it, you can realize that in simplified flow algorithm, there would be no table's header on the next page.

This exactly why the `Decoration` element was created! It has two slots: `Header` and `Content`. When this element is wrapped to multiple pages, it makes sure that the header element is always present. Please take a look at screenshots from the very beginning of this tutorial and notice that it is true. Even the table was split into two pages, on each page the header is visible.

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
            stack.Spacing(2);

            stack.Item().BorderBottom(1).PaddingBottom(5).Text(Title, TextStyle.Default.SemiBold());

            stack.Item().Text(Address.CompanyName);
            stack.Item().Text(Address.Street);
            stack.Item().Text($"{Address.City}, {Address.State}");
            stack.Item().Text(Address.Email);
            stack.Item().Text(Address.Phone);
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
        container.PaddingVertical(40).Stack(stack => 
        {
            stack.Spacing(5);

            stack.Item().Row(row =>
            {
                row.RelativeColumn().Component(new AddressComponent("From", Model.SellerAddress));
                row.ConstantColumn(50);
                row.RelativeColumn().Component(new AddressComponent("For", Model.CustomerAddress));
            });

            stack.Item().Element(ComposeTable);

            var totalPrice = Model.Items.Sum(x => x.Price * x.Quantity);
            stack.Item().AlignRight().Text($"Grand total: {totalPrice}$", TextStyle.Default.Size(14));

            if (!string.IsNullOrWhiteSpace(Model.Comments))
                stack.Item().PaddingTop(25).Element(ComposeComments);
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
    document.GeneratePdf(filePath);

    Process.Start("explorer.exe", filePath);
}
```

::: tip
There are multiple overloads of the `Generate` method. In the example above, the document has been saved into a new file. Additionally, there is an overload that returns a byte array. If you are working on the webserver and care about memory consumption, please use the overload that accepts a stream as an argument.
:::

## Complex example

Looking for more advanced example that uses the vast majority of available features? Please take a look at the [library's repository](https://github.com/QuestPDF/library/tree/main/QuestPDF.ReportSample). It contains a sample report:

![example](./images/getting-started/complex.jpg)
