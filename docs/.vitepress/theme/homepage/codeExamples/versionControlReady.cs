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