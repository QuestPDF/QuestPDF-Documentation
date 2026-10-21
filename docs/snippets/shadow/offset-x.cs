.Row(row =>
{
    row.Spacing(50);

    foreach (var offsetX in new[] { -10, 0, 10 })
    {
        row.ConstantItem(100)
            .AspectRatio(1)
            .Shadow(new BoxShadowStyle
            {
                Color = Colors.Grey.Darken1,
                Blur = 10,
                OffsetX = offsetX
            })
            .Background(Colors.White);
    }
});
