container.Column(column =>
{
    column.Item().Text("Order Items").Bold();

    if (Model.ShowSummary)
        column.Item().Element(ComposeOrderSummary);

    foreach (var item in Model.Items)
        column.Item().Element(c => ComposeItem(c, item));
});

void ComposeItem(IContainer container, OrderItem item)
{
    container
        .Border(1, Colors.Grey.Darken2)
        .Background(item.HighlightColor)
-       .Padding(12)
+       .Padding(16)
        .Row(row =>
        {
            row.RelativeItem().Text(item.Name);
            row.AutoItem().Text($"{item.Price:F2} USD");
        });
}