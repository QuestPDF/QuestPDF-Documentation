.Row(row =>
{
    row.Spacing(50);

    var colors = new[]
    {
        Colors.Red.Darken2,
        Colors.Green.Darken2,
        Colors.Blue.Darken2
    };

    foreach (var color in colors)
    {
        row.ConstantItem(100)
            .AspectRatio(1)
            .Shadow(new BoxShadowStyle
            {
                Color = color,
                Blur = 10
            })
            .Background(Colors.White);
    }
});
