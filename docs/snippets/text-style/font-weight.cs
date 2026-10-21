.Text(text =>
{
    text.Span("This sentence demonstrates ");
    text.Span("bold").Bold();
    text.Span(", ");
    text.Span("normal").NormalWeight();
    text.Span(", ");
    text.Span("light").Light();
    text.Span(" and ");
    text.Span("thin").Thin();
    text.Span(" font weights.");
});
