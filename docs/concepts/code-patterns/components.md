---
outline: false
---


# Code pattern: components

Components in QuestPDF provide a powerful abstraction mechanism for creating reusable content across multiple document types. 

By encapsulating specific content generation logic in standalone classes, you can significantly improve the modularity and maintainability of your PDF generation codebase. 
Components follow a clean separation of concerns principle, ensuring that your document structure remains organized and consistent across various implementations.


## Example: address component

This example demonstrates how to create a reusable address component and integrate it into document structure.

#### Component definition

```c#
public class Address
{
    public string CompanyName { get; set; }
    
    public string PostalCode { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
    public string Street { get; set; }
}

public class AddressComponent : IComponent
{
    private Address Address { get; }

    public AddressComponent(Address address)
    {
        Address = address;
    }
    
    public void Compose(IContainer container)
    {
        container.Column(column =>
        {
            column.Spacing(10);
            
            AddItem("Company name", Address.CompanyName);
            AddItem("Postal code", Address.PostalCode);
            AddItem("Country", Address.Country);
            AddItem("City", Address.City);
            AddItem("Street", Address.Street);
            
            void AddItem(string label, string value)
            {
                column.Item().Text(text =>
                {
                    text.Span($"{label}: ").Bold();
                    text.Span(value);
                });
            }
        });
    }
}
```


#### Component usage

By simply passing an Address object to the component, all formatting and layout concerns are delegated to the component itself.

```c#
var address = new Address
{
    CompanyName = "Apple",
    PostalCode = "95014",
    Country = "United States",
    City = "Cupertino",
    Street = "One Apple Park Way"
};

Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.MinSize(new PageSize(0, 0));
            page.MaxSize(new PageSize(600, 1200));
            page.DefaultTextStyle(x => x.FontSize(20));
            page.Margin(25);

            page.Content()
                .Component(new AddressComponent(address));
        });
    })
    .GeneratePdf("report.pdf");
```

![example](/patterns-and-practices/code-pattern-address-components.webp =295x)


## Complex example

A more advanced example involves a configurable section component that can hold multiple fields, each defined by a label and its own content. 
This approach provides flexibility for various data types and layout requirements while retaining an organized, maintainable structure.

#### Component definition

The component exposes methods for adding text, images, and custom content fields.

```c#
using QuestPDF.Infrastructure;

public class SectionComponent : IComponent
{
    private List<(string Label, IContainer Content)> Fields { get; set; } = [];

    public SectionComponent()
    {
        
    }
    
    public void Compose(IContainer container)
    {
        container
            .Border(1)
            .Column(column =>
            {
                foreach (var field in Fields)
                {
                    column.Item().Row(row =>
                    {
                        row.RelativeItem()
                            .Border(1)
                            .BorderColor(Colors.Grey.Medium)
                            .Background(Colors.Grey.Lighten3)
                            .Padding(10)
                            .Text(field.Label);

                        row.RelativeItem(2)
                            .Border(1)
                            .BorderColor(Colors.Grey.Medium)
                            .Padding(10)
                            .Element(field.Content);
                    });
                }
            });
    }

    public void Text(string label, string text)
    {
        Custom(label).Text(text);
    }
    
    public void Image(string label, string imagePath)
    {
        Custom(label).Image(imagePath);
    }
    
    public IContainer Custom(string label)
    {
        var content = IContainer.Empty;
        Fields.Add((label, content));
        return content;
    }
}
```

#### Component usage

Please note how easy it is to create a new section with multiple fields.
The layout and styling are encapsulated within the component, ensuring consistency across different sections.

```c#
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.MinSize(new PageSize(0, 0));
            page.MaxSize(new PageSize(600, 1200));
            page.DefaultTextStyle(x => x.FontSize(20));
            page.Margin(25);

            page.Content()
                .Column(column =>
                {
                    column.Item().Component(BuildSampleSection());
                    // more usages of the section component
                });
        });
    }
    .GeneratePdf("report.pdf");

IComponent BuildSampleSection()
{
    var section = new SectionComponent();

    section.Text("Product name", Placeholders.Label());
    section.Text("Description", Placeholders.Sentence());
    section.Text("Price", Placeholders.Price());
    section.Text("Date of production", Placeholders.ShortDate());
    section.Image("Photo of the product", "Resources/product.jpg");
    section.Custom("Status").Text("Accepted").FontColor(Colors.Green.Darken2).Bold();
    
    return section;
}
```

![example](/patterns-and-practices/code-pattern-configurable-component.webp =600x)
