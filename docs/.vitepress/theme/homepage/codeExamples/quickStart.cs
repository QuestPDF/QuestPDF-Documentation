void StockList(IContainer container, IEnumerable<Stock> stocks)
{
    container.Column(column =>
    {
        column.Spacing(8);

        foreach (var stock in stocks)
            column.Item().Element(x => StockRow(x, stock));
    });
}

void StockRow(IContainer container, Stock stock)
{
    var (background, text, icon) = stock.Change switch
    {
        > 0 => (Colors.Green.Lighten4, Colors.Green.Darken3, Icons.ArrowUp),
        < 0 => (Colors.Red.Lighten4, Colors.Red.Darken3, Icons.ArrowDown),
        _ => (Colors.Grey.Lighten3, Colors.Grey.Darken3, Icons.Dot)
    };

    container
        .Background(background)
        .CornerRadius(8)
        .Padding(12)
        .DefaultTextStyle(x => x.FontColor(text))
        .Row(row =>
        {
            row.Spacing(12);
            row.ConstantItem(14).AlignMiddle().Svg(icon);
            row.RelativeItem().Text(stock.Name).SemiBold();
            row.ConstantItem(80).AlignRight().Text($"{stock.Price:F2}");
            row.ConstantItem(70).AlignRight().Text($"{stock.Change:+0.00;-0.00;0.00}%");
        });
}
