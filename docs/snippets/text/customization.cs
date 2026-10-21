.Column(column =>
{
    column.Spacing(10);

    column.Item()
        .Element(CellStyle)
        .Text("Text with blue color")
        .FontColor(Colors.Blue.Darken1);

    column.Item()
        .Element(CellStyle)
        .Text("Bold and underlined text")
        .Bold()
        .Underline();

    column.Item()
        .Element(CellStyle)
        .Text("Centered small text")
        .FontSize(12)
        .AlignCenter();

    static IContainer CellStyle(IContainer container) =>
        container.Background(Colors.Grey.Lighten3).Padding(10);
});
