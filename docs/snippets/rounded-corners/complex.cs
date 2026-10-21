container
    .Border(1, Colors.Black)
    .CornerRadius(15)
    .Table(table =>
    {
        table.ColumnsDefinition(columns =>
        {
            columns.ConstantColumn(100);
            columns.RelativeColumn();
            columns.ConstantColumn(150);
        });

        table.Header(header =>
        {
            header.Cell().Element(Style).Text("Index");
            header.Cell().Element(Style).Text("Label");
            header.Cell().Element(Style).Text("Price");

            IContainer Style(IContainer container)
            {
                return container
                    .Border(1, Colors.Grey.Darken2)
                    .Background(Colors.Grey.Lighten3)
                    .PaddingVertical(10)
                    .PaddingHorizontal(15)
                    .DefaultTextStyle(x => x.Bold());
            }
        });

        var products = new[]
        {
            (Index: 1, Label: "Desk lamp", Price: "$34.99"),
            (Index: 2, Label: "Notebook", Price: "$4.99"),
            (Index: 3, Label: "Fountain pen", Price: "$59.00"),
            (Index: 4, Label: "Paper clips", Price: "$1.49"),
            (Index: 5, Label: "Monitor stand", Price: "$89.00")
        };

        foreach (var product in products)
        {
            table.Cell().Element(Style).Text(product.Index.ToString());
            table.Cell().Element(Style).Text(product.Label);
            table.Cell().Element(Style).Text(product.Price);

            IContainer Style(IContainer container)
            {
                return container
                    .Border(1, Colors.Grey.Darken2)
                    .PaddingVertical(10)
                    .PaddingHorizontal(15);
            }
        }
    });
