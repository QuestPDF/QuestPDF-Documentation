.Row(row =>
{
    var colors = new[]
    {
        Colors.Red.Medium,
        Colors.Green.Medium,
        Colors.Blue.Medium
    };

    row.Spacing(25);

    foreach (var color in colors)
    {
        row.RelativeItem()
            .Border(5)
            .BorderColor(color)
            .Padding(15)
            .Text(color)
            .FontColor(color);
    }
});
