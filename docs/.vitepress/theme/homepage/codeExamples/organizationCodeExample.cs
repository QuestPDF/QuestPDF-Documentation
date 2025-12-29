.Column(column =>
{
    if (Model.Comments != null)
        column.Item().Text(Model.Comments);

    foreach(var item in Model.Items)
       column.Item().Element(c => CreateItem(c, item);
});

void CreateItem(IContainer container, Item item)
{
    container
-       .Background(Colors.Grey.Lighten2)
+       .Background(item.Color)
        .Padding(10)
        .Text(item.Text);
}