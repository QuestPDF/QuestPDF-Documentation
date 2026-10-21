.Column(column =>
{
    column.Spacing(20);

    float[] lineHeights = [0.75f, 1f, 2f];
    var paragraph = "Line height is the vertical distance between lines of text. Tight lines save space, while generous spacing makes long paragraphs easier to follow.";

    foreach (var lineHeight in lineHeights)
    {
        column
            .Item()
            .Background(Colors.Grey.Lighten3)
            .Padding(5)
            .Text(paragraph)
            .FontSize(16)
            .LineHeight(lineHeight);
    }
});
