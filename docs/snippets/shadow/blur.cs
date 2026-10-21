.Row(row =>
{
    row.Spacing(50);

    foreach (var blur in new[] { 5, 10, 20 })
    {
        row.ConstantItem(100)
            .AspectRatio(1)
            .Shadow(new BoxShadowStyle
            {
                Color = Colors.Grey.Darken1,
                Blur = blur
            })
            .Background(Colors.White);
    }
});
