.Text(text =>
{
    text.Span("Moreover, the decoration can be ");

    text.Span("solid").FontColor(Colors.Indigo.Medium).Underline().DecorationSolid();
    text.Span(", ");
    text.Span("double").FontColor(Colors.Blue.Medium).Underline().DecorationDouble();
    text.Span(", ");
    text.Span("wavy").FontColor(Colors.LightBlue.Medium).Underline().DecorationWavy();
    text.Span(", ");
    text.Span("dotted").FontColor(Colors.Cyan.Medium).Underline().DecorationDotted();
    text.Span(" or ");
    text.Span("dashed").FontColor(Colors.Green.Medium)
        .Underline().DecorationDashed();
    text.Span(".");
});
