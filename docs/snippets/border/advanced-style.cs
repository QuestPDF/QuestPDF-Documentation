container
    .CornerRadius(10)
    .BorderLeft(10)
    .BorderAlignmentInside()
    .BorderColor(Colors.Green.Darken2)
    .Background(Colors.Green.Lighten4)
    .Padding(25)
    .PaddingLeft(10)
    .DefaultTextStyle(x => x.FontColor(Colors.Green.Darken4))
    .Column(column =>
    {
        column.Item().Text("Completed").Bold();
        column.Item().Height(5);
        column.Item().Text("The invoice has been paid in full.").FontSize(16);
    });
