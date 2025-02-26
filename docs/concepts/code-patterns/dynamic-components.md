---
outline: false
---


# Code pattern: dynamic components

Dynamic components provide a powerful way to generate conditional or varying content on each page of your PDF document. 
Unlike standard components that render once for the entire document, dynamic components' Compose method is invoked separately for each page where the component appears.

This page-specific rendering gives you access to crucial context information like the current page number, total page count, and available space. 
With this information, you can create sophisticated layouts that adapt to their position within the document.


## Simple examples

#### Alternating side of page numbers

This component places page numbers on alternating sides of the page - left for odd pages and right for even pages. 
It demonstrates how to use the page number information to conditionally format content.

```csharp
public class PageNumberSideComponent : IDynamicComponent
{
    public DynamicComponentComposeResult Compose(DynamicContext context)
    {
        var content = context.CreateElement(element =>
        {
            element
                .Element(x => context.PageNumber % 2 == 0 ? x.AlignRight() : x.AlignLeft())
                .Text(text =>
                {
                    text.Span("Page ");
                    text.CurrentPageNumber();
                });
        });

        return new DynamicComponentComposeResult
        {
            Content = content,
            HasMoreContent = false
        };
    }
}
```


#### Progressbar

This component creates a visual progress bar indicating how far the reader has advanced through the document.

```c#
public class PageProgressbarComponent : IDynamicComponent
{
    public DynamicComponentComposeResult Compose(DynamicContext context)
    {
        var content = context.CreateElement(element =>
        {
            var width = context.AvailableSize.Width * context.PageNumber / context.TotalPages;
                
            element
                .Background(Colors.Blue.Lighten3)
                .Height(5)
                .Width(width)
                .Background(Colors.Blue.Darken2);
        });

        return new DynamicComponentComposeResult
        {
            Content = content,
            HasMoreContent = false
        };
    }
}
```


#### Usage

The following example demonstrates how to incorporate both dynamic components into a document structure. 
The progress bar appears in the header, while the alternating page numbers display in the footer.

```c#{22,40}
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Size(PageSizes.A4);
            page.Margin(50);
            page.DefaultTextStyle(x => x.FontSize(20));

            page.Header().Column(column =>
            {
                column.Item()
                    .Text("MyBrick Set")
                    .FontSize(48).FontColor(Colors.Blue.Darken2).Bold();
                  
                column.Item()
                    .Text("Building Instruction")
                    .FontSize(24);
                
                column.Item().Height(15);
                
                column.Item().Dynamic(new PageProgressbarComponent());
            });
                
            page.Content().PaddingVertical(25).Column(column =>
            {
                column.Spacing(25);
                
                foreach (var i in Enumerable.Range(1, 30))
                {
                    column.Item()
                        .Background(Colors.Grey.Lighten3)
                        .Height(Random.Shared.Next(4, 8) * 25)
                        .AlignCenter()
                        .AlignMiddle()
                        .Text($"Step {i}");
                }
            });

            page.Footer().Dynamic(new PageNumberSideComponent());
        });
    })
    .GeneratePdf();
```

<object data="/patterns-and-practices/code-pattern-dynamic-component-progressbar.pdf" type="application/pdf" class="pdf-viewer">
  <p>Unable to display PDF file. <a href="/patterns-and-practices/code-pattern-dynamic-component-progressbar.pdf">Download</a> instead.</p>
</object>


## Table with per-page subtotals

This more complex example demonstrates how to create a table that spans multiple pages and displays subtotals for each page. 
It uses component state to track which items have been shown across pages.

::: warning
Important: Always treat state as read-only.
Never modify existing state directly.
Instead, create a new instance of your state struct with the updated values and assign it to the State property.
QuestPDF may call the Compose method multiple times per page and may internally change the state.
:::


#### Model and state

First, let's define our data model and the state structure.

```c#
public class OrderItem
{
    public string ItemName { get; set; } = Placeholders.Label();
    public int Price { get; set; } = Placeholders.Random.Next(1, 11) * 10;
    public int Count { get; set; } = Placeholders.Random.Next(1, 11);
}

public struct OrdersTableWithPageSubtotalsComponentState
{
    public int ShownItemsCount { get; set; }
}
```


#### Paging algorithm

The following component implements a paging algorithm that:
1) Generates and measures the header to determine its height
2) Generates and measures a sample footer to determine its height 
3) Calculates remaining space for table rows 
4) Adds rows incrementally until available space is filled 
5) Generates the actual footer with subtotals for the visible rows 
6) Updates state to track progress

```c#
public class OrdersTableWithPageSubtotalsComponent : IDynamicComponent<OrdersTableWithPageSubtotalsComponentState>
{
    private ICollection<OrderItem> Items { get; }
    public OrdersTableWithPageSubtotalsComponentState State { get; set; }

    public OrdersTableWithPageSubtotalsComponent(ICollection<OrderItem> items)
    {
        Items = items;

        State = new OrdersTableWithPageSubtotalsComponentState
        {
            ShownItemsCount = 0
        };
    }
    
    public DynamicComponentComposeResult Compose(DynamicContext context)
    {
        var header = ComposeHeader(context);
        var sampleFooter = ComposeFooter(context, []);
        var decorationHeight = header.Size.Height + sampleFooter.Size.Height;
        
        var rows = GetItemsForPage(context, decorationHeight).ToList();
        var footer = ComposeFooter(context, rows.Select(x => x.Item));

        var content = context.CreateElement(container =>
        {
            container.Shrink().Decoration(decoration =>
            {
                decoration.Before().Element(header);

                decoration.Content().Column(column =>
                {
                    foreach (var row in rows)
                        column.Item().Element(row.Element);
                });

                decoration.After().Element(footer);
            });
        });

        State = new OrdersTableWithPageSubtotalsComponentState
        {
            ShownItemsCount = State.ShownItemsCount + rows.Count
        };

        return new DynamicComponentComposeResult
        {
            Content = content,
            HasMoreContent = State.ShownItemsCount < Items.Count
        };
    }

    private static IDynamicElement ComposeHeader(DynamicContext context)
    {
        return context.CreateElement(element =>
        {
            element
                .Width(context.AvailableSize.Width)
                .BorderBottom(1)
                .BorderColor(Colors.Grey.Darken2)
                .Padding(10)
                .DefaultTextStyle(TextStyle.Default.SemiBold())
                .Row(row =>
                {
                    row.ConstantItem(50).Text("#").AlignCenter();
                    row.RelativeItem().Text("Item name");
                    row.ConstantItem(75).AlignRight().Text("Count");
                    row.ConstantItem(75).AlignRight().Text("Price");
                    row.ConstantItem(75).AlignRight().Text("Total");
                });
        });
    }
    
    private static IDynamicElement ComposeFooter(DynamicContext context, IEnumerable<OrderItem> items)
    {
        var total = items.Sum(x => x.Count * x.Price);

        return context.CreateElement(element =>
        {
            element
                .Width(context.AvailableSize.Width)
                .Padding(10)
                .AlignRight()
                .Text($"Subtotal: {total}$")
                .Bold();
        });
    }
    
    private IEnumerable<(OrderItem Item, IDynamicElement Element)> GetItemsForPage(DynamicContext context, float decorationHeight)
    {
        var totalHeight = decorationHeight;

        foreach (var index in Enumerable.Range(State.ShownItemsCount, Items.Count - State.ShownItemsCount))
        {
            var item = Items.ElementAt(index);
            
            var element = context.CreateElement(content =>
            {
                content
                    .Width(context.AvailableSize.Width)
                    .BorderBottom(1)
                    .BorderColor(Colors.Grey.Lighten2)
                    .Padding(10 )
                    .Row(row =>
                    {
                        row.ConstantItem(50).Text((index + 1).ToString(CultureInfo.InvariantCulture));
                        row.RelativeItem().Text(item.ItemName);
                        row.ConstantItem(75).AlignRight().Text(item.Count.ToString(CultureInfo.InvariantCulture));
                        row.ConstantItem(75).AlignRight().Text($"{item.Price}$");
                        row.ConstantItem(75).AlignRight().Text($"{item.Count*item.Price}$");
                    });
            });

            var elementHeight = element.Size.Height;

            // it is important to use the Size.Epsilon constant to avoid floating point comparison issues
            if (totalHeight + elementHeight > context.AvailableSize.Height + Size.Epsilon)
                break;
                
            totalHeight += elementHeight;
            yield return (item, element);
        }
    }
}
```


#### Usage

Here is how you can integrate this component into a document that displays per-page subtotals. 

```c#
var items = Enumerable.Range(0, 25).Select(x => new OrderItem()).ToList();
        
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Size(PageSizes.A4);
            page.DefaultTextStyle(x => x.FontSize(20));
            page.Margin(50);

            page.Content()
                .Decoration(decoration =>
                {
                    decoration
                        .Before()
                        .PaddingBottom(10)
                        .Text(text =>
                        {
                            text.DefaultTextStyle(TextStyle.Default.Bold().FontColor(Colors.Blue.Darken2));
                            text.Span("Page ");
                            text.CurrentPageNumber();
                            text.Span(" of ");
                            text.TotalPages();
                        });
                    
                    decoration
                        .Content()
                        .Dynamic(new OrdersTableWithPageSubtotalsComponent(items));
                });
        });
    })
    .GeneratePdf("orders.pdf");
```

<object data="/patterns-and-practices/code-pattern-dynamic-component-table-with-per-page-subtotals.pdf" type="application/pdf" class="pdf-viewer">
  <p>Unable to display PDF file. <a href="/patterns-and-practices/code-pattern-dynamic-component-table-with-per-page-subtotals.pdf">Download</a> instead.</p>
</object>
