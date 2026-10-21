.Row(row =>
{
    row.Spacing(25);

    row.RelativeItem()
        .Background(Colors.Grey.Lighten1)
        .Padding(25)
        .Text("No Border");

    row.RelativeItem()
        .Border(10, Colors.Grey.Darken2)
        .BorderAlignmentInside()
        .Padding(25)
        .Text("Border Inside");

    row.RelativeItem()
        .Border(10, Colors.Grey.Darken2)
        .BorderAlignmentMiddle()
        .Padding(25)
        .Text("Border Middle");

    row.RelativeItem()
        .Border(10, Colors.Grey.Darken2)
        .BorderAlignmentOutside()
        .Padding(25)
        .Text("Border Outside");
});
