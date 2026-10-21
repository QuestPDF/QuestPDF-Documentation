container
    .Border(3, Colors.Blue.Darken4)
    .Background(Colors.Blue.Lighten5)
    .Padding(25)
    .Text(text =>
    {
        text.DefaultTextStyle(x => x.FontColor(Colors.Blue.Darken4).FontSize(16));
        text.Span("TIP: ").Bold();
        text.Span("You can use borders to create visual separation between elements in your document. Borders can be applied to any element, including text, images, and containers.");
    });
