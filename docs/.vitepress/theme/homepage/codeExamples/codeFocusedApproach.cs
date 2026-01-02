container
    .Column(column =>
    {
        column.Item().Text("Order Items").Bold();

        // use conditionals to show content based on logic
        if (Model.ShowSummary)
            column.Item().Element(ComposeOrderSummary);

        // use loops to iterate over collections naturally
        foreach (var item in Model.Items)
        {
            column.Item()
                .Element(container => ComposeItem(container, item));
        }
    });

// use functions to organize and reuse code
void ComposeItem(IContainer container, OrderItem item)
{
    container
        .Border(1)
        .Background(item.IsHighlighted
            ? Colors.Green.Lighten4
            : Colors.Transparent)
-       .Padding(12)
+       .Padding(16)
        .Row(row =>
        {
            row.RelativeItem().Text(item.Name);
            row.ConstantItem(80).AlignRight().Text(item.Price);
        });
}