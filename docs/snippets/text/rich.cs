container
    .Text(text =>
    {
        text.AlignCenter();

        text.Span("The ");
        text.Span("chemical formula").Underline();
        text.Span(" of ");
        text.Span("sulfuric acid").BackgroundColor(Colors.Amber.Lighten3);
        text.Span(" is H");
        text.Span("2").Subscript();
        text.Span("SO");
        text.Span("4").Subscript();
        text.Span(".");
    });
