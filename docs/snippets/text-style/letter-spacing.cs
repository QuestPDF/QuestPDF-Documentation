.Column(column =>
{
    column.Spacing(20);

    var letterSpacing = new[] { -0.08f, 0f, 0.2f };
    var paragraph = "Letter spacing changes the space between characters.";

    foreach (var spacing in letterSpacing)
    {
        column
            .Item()
            .Background(Colors.Grey.Lighten3)
            .Padding(5)
            .Text(paragraph)
            .FontSize(18)
            .LetterSpacing(spacing);
    }
});
