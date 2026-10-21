.Text(text =>
{
    text.Span("There are a couple of available text decorations: ");
    text.Span("underline").Underline().FontColor(Colors.Red.Medium);
    text.Span(", ");
    text.Span("strikethrough").Strikethrough().FontColor(Colors.Green.Medium);
    text.Span(" and ");
    text.Span("overline").Overline().FontColor(Colors.Blue.Medium);
    text.Span(". ");
});
