.Row(row =>
{
    row.Spacing(25);

    row.RelativeItem()
        .Border(1, Colors.Black)
        .Padding(10)
        .AlignCenter()
        .Text("Thin");

    row.RelativeItem()
        .Border(3, Colors.Black)
        .Padding(10)
        .AlignCenter()
        .Text("Medium");

    row.RelativeItem()
        .Border(9, Colors.Black)
        .Padding(10)
        .AlignCenter()
        .Text("Bold");
});
