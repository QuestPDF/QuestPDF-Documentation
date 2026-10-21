.Text(text =>
{
    text.Span("Each pixel consists of three sub-pixels: ");
    text.Span("red").FontColor(Colors.Red.Medium);
    text.Span(", ");
    text.Span("green").FontColor(Colors.Green.Medium);
    text.Span(" and ");
    text.Span("blue").FontColor(Colors.Blue.Medium);
    text.Span(".");
});
