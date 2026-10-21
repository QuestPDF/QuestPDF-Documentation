.Text(text =>
{
    text.Span("This text contains a ");

    text.Span("seriuos")
        .Underline()
        .DecorationWavy()
        .DecorationColor(Colors.Red.Medium)
        .DecorationThickness(2);

    text.Span(" typo.");
});
