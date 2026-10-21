.Column(column =>
{
    column.Spacing(20);

    var wordSpacing = new[] { -0.2f, 0f, 0.4f };
    var paragraph = "Word spacing changes the space between words.";

    foreach (var spacing in wordSpacing)
    {
        column.Item()
            .Background(Colors.Grey.Lighten3)
            .Padding(5)
            .Text(paragraph)
            .FontSize(16)
            .WordSpacing(spacing);
    }
});
