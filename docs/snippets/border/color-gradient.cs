.Column(column =>
{
    column.Spacing(25);

    column.Item()
        .Border(5)
        .BorderLinearGradient(0, [Colors.Red.Darken1, Colors.Blue.Darken1])
        .BorderAlignmentInside()
        .Padding(25)
        .Text("Horizontal gradient");

    column.Item()
        .Border(10)
        .BorderLinearGradient(45, [Colors.Green.Darken1, Colors.LightGreen.Darken1, Colors.Yellow.Darken1])
        .BorderAlignmentInside()
        .Padding(25)
        .Text("Diagonal gradient");

    column.Item()
        .Border(10)
        .BorderLinearGradient(90, [Colors.Yellow.Darken1, Colors.Amber.Darken1, Colors.Orange.Darken1])
        .CornerRadius(20)
        .Padding(25)
        .Text("Vertical gradient");
});
