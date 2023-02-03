# Dynamic components

## Introduction

Dynamic components are useful when you want to generate different or conditional content on each page. The dynamic component mostly resembles a normal component with one important difference: the `Compose` method is called for each page. Having access to component internal state, information about pages and available space, you can build more advanced structures.

In this example, we only use the page information: the current page number and total page count. We use both numbers to create something similar to a progress bar that indicates where you are in the document.

Please note that this example does not require state management, so we declare state as a simple integer and do not use it anywhere else.

```csharp{7-22}
public class ProgressHeader : IDynamicComponent<int>
{
    public int State { get; set; }
    
    public DynamicComponentComposeResult Compose(DynamicContext context)
    {
        var content = context.CreateElement(container =>
        {
            var width = context.AvailableSize.Width * context.PageNumber / context.TotalPages;
            
            container
                .Background(Colors.Blue.Lighten2)
                .Height(25)
                .Width(width)
                .Background(Colors.Blue.Darken1);
        });

        return new DynamicComponentComposeResult
        {
            Content = content,
            HasMoreContent = false
        };
    }
}
```

Using the dynamic component is very simple. Just use the `Dynamic` method and provide an instance of your component.

```csharp{7}
container.Page(page =>
{
    page.Size(PageSizes.A6);
    page.Margin(1, Unit.Centimetre);
    page.DefaultTextStyle(x => x.FontSize(20));

    page.Header().Dynamic(new ProgressHeader());
    
    page.Content().Column(column =>
    {
        foreach (var i in Enumerable.Range(0, 100))
            column.Item().PaddingTop(25).Background(Colors.Grey.Lighten2).Height(50);
    });

    page.Footer().AlignCenter().Text(text =>
    {
        text.CurrentPageNumber();
        text.Span(" / ");
        text.TotalPages();
    });
});
```

See below, the first page of the document, and a random page from the middle of the document:

![example](/patterns-and-practices/dynamic-progress-1.png =300x)
![example](/patterns-and-practices/dynamic-progress-2.png =300x)

## Footer with alternating text alignment

In this example, we use new knowledge to implement the footer element with alternating text alignment.
1) On even pages, align page number to the left.
2) On odd pages, align page number to the right.

For example:

```
Page 1 -> Text aligned right.
Page 2 -> Text aligned left.
Page 3 -> Text aligned right.
...
and so on...
```

The code is quite simple:

```csharp{10}
public class FooterWithAlternatingAlignment : IDynamicComponent<int>
{
    public int State { get; set; }
    
    public DynamicComponentComposeResult Compose(DynamicContext context)
    {
        var content = context.CreateElement(element =>
        {
            element
                .Element(x => context.PageNumber % 2 == 0 ? x.AlignLeft() : x.AlignRight())
                .Text(x =>
                {
                    x.CurrentPageNumber();
                    x.Span(" / ");
                    x.TotalPages();
                });
        });
        
        return new DynamicComponentComposeResult()
        {
            Content = content,
            HasMoreContent = false
        };
    }
}
```

And the result is as follows:

![example](/patterns-and-practices/dynamic-alternating-footer-1.png =300x)
![example](/patterns-and-practices/dynamic-alternating-footer-2.png =300x)

## State management

This example introduces component state management. Our goal is to create a header component that calculates consecutive terms in the Fibonacci-like sequence and shows their ratio - one calculation per page. Additionally, we want to use different background colors depending on the modulo calculus of the current sequence term.

Let's begin with the struct declaration that will hold the state:

::: warning
Important: please consider the state to be read-only. Never mutate existing state. To perform mutation, create a new struct instance and assign it to the State property. The QuestPDF library may perform multiple `Compose` method calls per page. The library may also change the state internally.
:::

```csharp
public struct FibonacciHeaderState
{
    public int Previous { get; set; }
    public int Current { get; set; }
}
```

Now, in each `Compose` method invocation, we can calculate a new sequence term, properly update state and generate new content to display on the page.

```csharp{23-49}
public class FibonacciHeader : IDynamicComponent<FibonacciHeaderState>
{
    public FibonacciHeaderState State { get; set; }
    
    public static readonly string[] ColorsTable =
    {
        Colors.Red.Lighten2,
        Colors.Orange.Lighten2,
        Colors.Green.Lighten2,
    };

    public FibonacciHeader(int previous, int current)
    {
        State = new FibonacciHeaderState
        {
            Previous = previous,
            Current = current
        };
    }

    public DynamicComponentComposeResult Compose(DynamicContext context)
    {
        var content = context.CreateElement(container =>
        {
            var colorIndex = State.Current % ColorsTable.Length;
            var color = ColorsTable[colorIndex];

            var ratio = (float)State.Current / State.Previous;
            
            container
                .Background(color)
                .Height(50)
                .AlignMiddle()
                .AlignCenter()
                .Text($"{State.Current} / {State.Previous} = {ratio:N5}");
        });

        // please note that the code assigns NEW state, instead of mutating the existing one
        State = new FibonacciHeaderState
        {
            Previous = State.Current,
            Current = State.Previous + State.Current
        };
        
        return new DynamicComponentComposeResult
        {
            Content = content,
            HasMoreContent = false // each page has its own content
        };
    }
}
```

Please note that you can instantiate components using constructors with arguments. You can use this to pass data from your database, for example.

```csharp{7}
page.Header().Dynamic(new FibonacciHeader(17, 19));
```

See below, the first page of the document, and a random page from the middle of the document:

![example](/patterns-and-practices/dynamic-state-1.png =300x)
![example](/patterns-and-practices/dynamic-state-2.png =300x)

## Table with per-page totals

This example presents a more common use case. As in the "Getting Started" tutorial, we will generate an invoice document. However, the complex requirement in this example is that for each page of the invoice, we want to show the total price for items visible on that page. Therefore, we need to know which items are visible on the page in order to calculate the price.

To achieve this requirement, we will implement a simple paging algorithm that will check how many table rows can fit on the page.

Let's begin by declaring a data model and state struct:

```csharp
public class OrderItem
{
    public string ItemName { get; set; } = Placeholders.Label();
    public int Price { get; set; } = Placeholders.Random.Next(1, 11) * 10;
    public int Count { get; set; } = Placeholders.Random.Next(1, 11);
}

public struct OrdersTableState
{
    public int ShownItemsCount { get; set; }
}
```

The implementation of this component is quite simple. For each page, the component generates multiple versions of the layout, testing how much space is required for various numbers of items in the table. Please note that the `DynamicContent.CreateElement` method returns an object implementing the `IDynamicElement` interface. This interface can be used to access the size of the element. This size can be compared to the available space, so the biggest table with the highest number of rows is chosen.

```csharp
public class OrdersTable : IDynamicComponent<OrdersTableState>
{
    private IList<OrderItem> Items { get; }
    public OrdersTableState State { get; set; }

    public OrdersTable(IList<OrderItem> items)
    {
        Items = items;

        State = new OrdersTableState
        {
            ShownItemsCount = 0
        };
    }
    
    public DynamicComponentComposeResult Compose(DynamicContext context)
    {
        // try to generate multiple layout versions (tables with various number of rows)
        // and pick the biggest table that still fits in the available space
        var possibleItems = Enumerable
            .Range(1, Items.Count - State.ShownItemsCount)
            .Select(itemsToDisplay => ComposeContent(context, itemsToDisplay))
            .TakeWhile(x => x.Size.Height <= context.AvailableSize.Height)
            .ToList();

        // update the state, so the component remembers how many items have already been shown on previous pages
        State = new OrdersTableState
        {
            ShownItemsCount = State.ShownItemsCount + possibleItems.Count
        };

        return new DynamicComponentComposeResult
        {
            Content = possibleItems.Last(),
            
            // check if all items have already been rendered
            HasMoreContent = State.ShownItemsCount < Items.Count
        };
    }

    private IDynamicElement ComposeContent(DynamicContext context, int itemsToDisplay)
    {
        // this method is called multiple times per page.
        // With each call, the value of the 'itemsToDisplay' argument increases
    
        var total = Items.Skip(State.ShownItemsCount).Take(itemsToDisplay).Sum(x => x.Count * x.Price);

        return context.CreateElement(container =>
        {
            container
                .MinimalBox()
                .Width(context.AvailableSize.Width) // please notice that we need to constrain the element's width to the available space
                .Table(table =>
                {
                    table.ColumnsDefinition(columns =>
                    {
                        columns.ConstantColumn(30);
                        columns.RelativeColumn();
                        columns.ConstantColumn(50);
                        columns.ConstantColumn(50);
                        columns.ConstantColumn(50);
                    });
                    
                    table.Header(header =>
                    {
                        header.Cell().Element(Style).Text("#");
                        header.Cell().Element(Style).Text("Item name");
                        header.Cell().Element(Style).AlignRight().Text("Count");
                        header.Cell().Element(Style).AlignRight().Text("Price");
                        header.Cell().Element(Style).AlignRight().Text("Total");

                        IContainer Style(IContainer container)
                        {
                            return container
                                .DefaultTextStyle(x => x.SemiBold())
                                .BorderBottom(1)
                                .BorderColor(Colors.Grey.Darken2)
                                .Padding(5);
                        }
                    });
                    
                    table.Footer(footer =>
                    {
                        footer
                            .Cell().ColumnSpan(5)
                            .AlignRight()
                            .Text($"Subtotal: {total}$", TextStyle.Default.Size(14).SemiBold());
                    });
                    
                    foreach (var index in Enumerable.Range(State.ShownItemsCount, itemsToDisplay))
                    {
                        var item = Items[index];
                            
                        table.Cell().Element(Style).Text(index + 1);
                        table.Cell().Element(Style).Text(item.ItemName);
                        table.Cell().Element(Style).AlignRight().Text(item.Count);
                        table.Cell().Element(Style).AlignRight().Text($"{item.Price}$");
                        table.Cell().Element(Style).AlignRight().Text($"{item.Count*item.Price}$");

                        IContainer Style(IContainer container)
                        {
                            return container
                                .BorderBottom(1)
                                .BorderColor(Colors.Grey.Lighten2)
                                .Padding(5);
                        }
                    }
                });
        });
    }
}
```

```csharp
// generate random data
var items = Enumerable.Range(0, 25).Select(x => new OrderItem()).ToList();

container
    .Background(Colors.White)
    .Padding(25)
    .Decoration(decoration =>
    {
        decoration
            .Header()
            .PaddingBottom(5)
            .Text(text =>
            {
                text.DefaultTextStyle(TextStyle.Default.SemiBold().FontColor(Colors.Blue.Darken2).FontSize(16));
                text.CurrentPageNumber();
                text.Span(" / ");
                text.TotalPages();
            });
        
        decoration
            .Content()
            .Dynamic(new OrdersTable(items));
    });
```

![example](/patterns-and-practices/dynamic-subtotals-1.png =300x)
![example](/patterns-and-practices/dynamic-subtotals-2.png =300x)

## Optimized example

In the previous example, we generate and measure multiple different sizes (with different number of rows) of table for each page. Therefore, to render one page, we may generate over 10-15 different layout versions, which means the algorithm is not optimal.

This example uses the `IDynamicElement.Size` information to better manage the generation process:
1. Generate table header and measure how much space it needs.
2. Generate table footer (subtotal) and measure the required space.
3. Incrementally generate table rows, measure each row, and fill available space. Continue until the next row fails to fit and reject it.

This way, we can build the table only once, significantly improving performance. Of course, this algorithm is slightly more complicated:

```csharp
public class OptimizedOrdersTable : IDynamicComponent<OrdersTableState>
{
    private ICollection<OrderItem> Items { get; }
    public OrdersTableState State { get; set; }

    public OptimizedOrdersTable(ICollection<OrderItem> items)
    {
        Items = items;

        State = new OrdersTableState
        {
            ShownItemsCount = 0
        };
    }
    
    public DynamicComponentComposeResult Compose(DynamicContext context)
    {
        var header = ComposeHeader(context);
        var sampleFooter = ComposeFooter(context, Enumerable.Empty<OrderItem>());
        var decorationHeight = header.Size.Height + sampleFooter.Size.Height;
        
        var rows = GetItemsForPage(context, decorationHeight).ToList();
        var footer = ComposeFooter(context, rows.Select(x => x.Item));

        var content = context.CreateElement(container =>
        {
            container.MinimalBox().Decoration(decoration =>
            {
                decoration.Header().Element(header);

                decoration.Content().Box().Stack(stack =>
                {
                    foreach (var row in rows)
                        stack.Item().Element(row.Element);
                });

                decoration.Footer().Element(footer);
            });
        });

        State = new OrdersTableState
        {
            ShownItemsCount = State.ShownItemsCount + rows.Count
        };

        return new DynamicComponentComposeResult
        {
            Content = content,
            HasMoreContent = State.ShownItemsCount < Items.Count
        };
    }

    private IDynamicElement ComposeHeader(DynamicContext context)
    {
        return context.CreateElement(element =>
        {
            element
                .Width(context.AvailableSize.Width)
                .BorderBottom(1)
                .BorderColor(Colors.Grey.Darken2)
                .Padding(5)
                .Row(row =>
                {
                    var textStyle = TextStyle.Default.SemiBold();

                    row.ConstantItem(30).Text("#", textStyle);
                    row.RelativeItem().Text("Item name", textStyle);
                    row.ConstantItem(50).AlignRight().Text("Count", textStyle);
                    row.ConstantItem(50).AlignRight().Text("Price", textStyle);
                    row.ConstantItem(50).AlignRight().Text("Total", textStyle);
                });
        });
    }
    
    private IDynamicElement ComposeFooter(DynamicContext context, IEnumerable<OrderItem> items)
    {
        var total = items.Sum(x => x.Count * x.Price);

        return context.CreateElement(element =>
        {
            element
                .Width(context.AvailableSize.Width)
                .Padding(5)
                .AlignRight()
                .Text($"Subtotal: {total}$", TextStyle.Default.Size(14).SemiBold());
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
                    .Padding(5)
                    .Row(row =>
                    {
                        row.ConstantItem(30).Text(index + 1);
                        row.RelativeItem().Text(item.ItemName);
                        row.ConstantItem(50).AlignRight().Text(item.Count);
                        row.ConstantItem(50).AlignRight().Text($"{item.Price}$");
                        row.ConstantItem(50).AlignRight().Text($"{item.Count*item.Price}$");
                    });
            });

            var elementHeight = element.Size.Height;
                
            if (totalHeight + elementHeight > context.AvailableSize.Height)
                break;
                
            totalHeight += elementHeight;
            yield return (item, element);
        }
    }
}
```