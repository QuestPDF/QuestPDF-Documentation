.Row(row =>
{
    row.Spacing(50);

    foreach (var spread in new[] { 0, 5, 10 })
    {
        row.ConstantItem(100)
            .AspectRatio(1)
            .Shadow(new BoxShadowStyle
            {
                Color = Colors.Grey.Darken1,
                Blur = 5,
                Spread = spread
            })
            .Background(Colors.White);
    }
});
