.Row(row =>
{
    row.Spacing(50);

    foreach (var offsetY in new[] { -10, 0, 10 })
    {
        row.ConstantItem(100)
            .AspectRatio(1)
            .Shadow(new BoxShadowStyle
            {
                Color = Colors.Grey.Darken2,
                Blur = 10,
                OffsetY = offsetY
            })
            .Background(Colors.White);
    }
});
