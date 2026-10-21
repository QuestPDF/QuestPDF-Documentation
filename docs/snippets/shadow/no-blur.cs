.Row(row =>
{
    row.Spacing(50);

    row.ConstantItem(100)
        .AspectRatio(1)
        .Shadow(new BoxShadowStyle
        {
            Color = Colors.Grey.Lighten1,
            Blur = 0,
            OffsetX = 8,
            OffsetY = 8
        })
        .Border(1, Colors.Black)
        .Background(Colors.White);

    row.ConstantItem(100)
        .AspectRatio(1)
        .Shadow(new BoxShadowStyle
        {
            Color = Colors.Grey.Lighten1,
            Blur = 0,
            OffsetX = 8,
            OffsetY = 8
        })
        .Border(1, Colors.Black)
        .CornerRadius(16)
        .Background(Colors.White);
});
