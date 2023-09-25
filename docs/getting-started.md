# Getting started

## What to expect

This tutorial introduces you to the essentials of the QuestPDF library by showing you how to implement a basic invoice document. It discusses architectural concepts, then shows how to prepare data layers and finally presents how to use various elements to compose a document's structure. At the end of this tutorial, you will get code capable of generating the full, page-aware invoice similar to the one below. Let's get started!

![invoice](/getting-started/invoice.png)

::: tip
You can download, analyse and compile the code yourself by visiting [this GitHub repository](https://github.com/QuestPDF/QuestPDF).
:::

## Installation

The library is distributed as a NuGet package. You can install it as any other NuGet package from your IDE, try to search by `QuestPDF`. You can find package details on [on this webpage](https://www.nuget.org/packages/QuestPDF/).

[![quest pdf logo](/nuget.svg =200x)](https://www.nuget.org/packages/QuestPDF/)

```shell
// Package Manager
Install-Package QuestPDF

// .NET CLI
dotnet add package QuestPDF

// Package reference in .csproj file
<PackageReference Include="QuestPDF" Version="2023.9.0" />
```

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

The most important aspect of document generation is to design and implement its layout. QuestPDF offers multiple tools to achieve the desired results. The most important concepts are discussed in this tutorial. For more information about specific elements, please visit the [API Reference](/api-reference/index).

### Scaffolding page structure

The implementation starts with defining a new class implementing the `IDocument` interface. This interface contains two methods: `GetMetadata()` and `Compose()`. The first one is used for providing basic document's information about author, keywords, DPI settings and so on. The latter gives a container where you should place all content.

```csharp
public interface IDocument
{
    DocumentMetadata GetMetadata();
    DocumentSettings GetSettings();
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
    public DocumentSettings GetSettings() => DocumentSettings.Default;

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

![example](/getting-started/step-scaffolding.png =595x)

### Header implementation

This chapter introduces a couple of very important layout elements: `Row` and `Column`. Before we discuss how they work, let's analyze the new code sample. First of all, when creating a document, we expect that it will contain multiple sections and therefore the amount of code is going to increase significantly. 

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
        var titleStyle = TextStyle.Default.FontSize(20).SemiBold().FontColor(Colors.Blue.Medium);
    
        container.Row(row =>
        {
            row.RelativeItem().Column(column =>
            {
                column.Item().Text($"Invoice #{Model.InvoiceNumber}").Style(titleStyle);

                column.Item().Text(text =>
                {
                    text.Span("Issue date: ").SemiBold();
                    text.Span($"{Model.IssueDate:d}");
                });
                
                column.Item().Text(text =>
                {
                    text.Span("Due date: ").SemiBold();
                    text.Span($"{Model.DueDate:d}");
                });
            });

            row.ConstantItem(100).Height(50).Placeholder();
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
            .Text("Content").FontSize(16);
    }
}
```

The code above produces the following result:

![example](/getting-started/step-header.png =595x)

### Content implementation

In the document generation world, it is expected that a single document has multiple pages. The QuestPDF library assumes that certain elements should be repeated across the page, for example, header and footer. Additionally, it offers a great mechanism to support paging content. It is not desired to split the content in any place, usually, we want to define explicitly where it should happen if needed.

```csharp
public class InvoiceDocument : IDocument
{
    /* code omitted */

    void ComposeContent(IContainer container)
    {
        container.PaddingVertical(40).Column(column =>
        {
            column.Spacing(5);

            column.Item().Element(ComposeTable);

            if (!string.IsNullOrWhiteSpace(Model.Comments))
                column.Item().PaddingTop(25).Element(ComposeComments);
        });
    }

    void ComposeTable(IContainer container)
    {
        container
            .Height(250)
            .Background(Colors.Grey.Lighten3)
            .AlignCenter()
            .AlignMiddle()
            .Text("Table").FontSize(16);
    }

    void ComposeComments(IContainer container)
    {
        container.Background(Colors.Grey.Lighten3).Padding(10).Column(column =>
        {
            column.Spacing(5);
            column.Item().Text("Comments").FontSize(14);
            column.Item().Text(Model.Comments);
        });
    }
}
```

In the code, the content structure is prepared. Please notice that a comments section is displayed conditionally:

![example](/getting-started/step-content.png =595x)

### Table generation

In this step, we will introduce the `Table` element. This element allows you to put multiple cells.

You can specify the exact position of the cell by using the `Row(X)` and the `Column(X)` methods. However, by default, the position can also be automatically determined by the algorithm. Each cell can also take multiple rows and/or columns. To specify such behavior, use the `RowSpan(X)`and the `ColumnSpan(X)` methods.

Let's implement the table in three simple steps:

1) **Step 1** defines number and sizes of columns. Similarly to the `Row` element, you can create columns of constant and relative widths.
2) **Step 2** implements table's header. This is a special section: when table takes multiple pages, the header content is present on every page.
2) **Step 3** uses a foreach-loop to iterates over all products and then generates set of cells for each of them.

```csharp
public class InvoiceDocument : IDocument
{
    /* code omitted */

    void ComposeTable(IContainer container)
    {
        container.Table(table =>
        {
            // step 1
            table.ColumnsDefinition(columns =>
            {
                columns.ConstantColumn(25);
                columns.RelativeColumn(3);
                columns.RelativeColumn();
                columns.RelativeColumn();
                columns.RelativeColumn();
            });
            
            // step 2
            table.Header(header =>
            {
                header.Cell().Element(CellStyle).Text("#");
                header.Cell().Element(CellStyle).Text("Product");
                header.Cell().Element(CellStyle).AlignRight().Text("Unit price");
                header.Cell().Element(CellStyle).AlignRight().Text("Quantity");
                header.Cell().Element(CellStyle).AlignRight().Text("Total");
                
                static IContainer CellStyle(IContainer container)
                {
                    return container.DefaultTextStyle(x => x.SemiBold()).PaddingVertical(5).BorderBottom(1).BorderColor(Colors.Black);
                }
            });
            
            // step 3
            foreach (var item in Model.Items)
            {
                table.Cell().Element(CellStyle).Text(Model.Items.IndexOf(item) + 1);
                table.Cell().Element(CellStyle).Text(item.Name);
                table.Cell().Element(CellStyle).AlignRight().Text($"{item.Price}$");
                table.Cell().Element(CellStyle).AlignRight().Text(item.Quantity);
                table.Cell().Element(CellStyle).AlignRight().Text($"{item.Price * item.Quantity}$");
                
                static IContainer CellStyle(IContainer container)
                {
                    return container.BorderBottom(1).BorderColor(Colors.Grey.Lighten2).PaddingVertical(5);
                }
            }
        });
    }

    /* code omitted */
}
```

![example](/getting-started/step-table.png =595x)

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
        container.Column(column =>
        {
            column.Spacing(2);

            column.Item().BorderBottom(1).PaddingBottom(5).Text(Title).SemiBold();

            column.Item().Text(Address.CompanyName);
            column.Item().Text(Address.Street);
            column.Item().Text($"{Address.City}, {Address.State}");
            column.Item().Text(Address.Email);
            column.Item().Text(Address.Phone);
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
        container.PaddingVertical(40).Column(column => 
        {
            column.Spacing(5);

            column.Item().Row(row =>
            {
                row.RelativeItem().Component(new AddressComponent("From", Model.SellerAddress));
                row.ConstantItem(50);
                row.RelativeItem().Component(new AddressComponent("For", Model.CustomerAddress));
            });

            column.Item().Element(ComposeTable);

            var totalPrice = Model.Items.Sum(x => x.Price * x.Quantity);
            column.Item().AlignRight().Text($"Grand total: {totalPrice}$").FontSize(14);

            if (!string.IsNullOrWhiteSpace(Model.Comments))
                column.Item().PaddingTop(25).Element(ComposeComments);
        });
    }

    /* code omitted */
}
```

![example](/getting-started/step-final.png =595x)

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

Looking for more advanced example that uses the vast majority of available features? Please take a look at the [library's repository](https://github.com/QuestPDF/library/tree/main/Source/QuestPDF.ReportSample). It contains a sample report:

![example](/getting-started/complex.jpg)
