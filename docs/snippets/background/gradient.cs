.Column(column =>
{
    column.Spacing(25);

    column.Item()
        .BackgroundLinearGradient(0, [Colors.Red.Lighten2, Colors.Blue.Lighten2])
        .AspectRatio(2);

    column.Item()
        .BackgroundLinearGradient(45, [Colors.Green.Lighten2, Colors.LightGreen.Lighten2, Colors.Yellow.Lighten2])
        .AspectRatio(2);

    column.Item()
        .BackgroundLinearGradient(90, [Colors.Yellow.Lighten2, Colors.Amber.Lighten2, Colors.Orange.Lighten2])
        .AspectRatio(2);
});
