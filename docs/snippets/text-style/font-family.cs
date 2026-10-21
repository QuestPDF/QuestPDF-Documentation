.Column(column =>
{
    column.Spacing(10);

    column.Item().Text("This is text with default font (Lato)");

    column.Item().Text("This is text with Noto Serif font")
        .FontFamily("Noto Serif");

    column.Item().Text("This is text with JetBrains Mono font")
        .FontFamily("JetBrains Mono");
});
