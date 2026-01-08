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
            // organize your code by splitting logic into functions
            column.Item()
                .Element(container => ComposeItem(container, item));
        }
    });