.Text(text =>
{
    var hyperlinkStyle = TextStyle.Default
        .FontColor(Colors.Blue.Medium)
        .Underline();

    text.Span("To learn more about QuestPDF, please visit its ");
    text.Hyperlink("homepage", "https://www.questpdf.com/").Style(hyperlinkStyle);
    text.Span(", ");
    text.Hyperlink("GitHub repository", "https://github.com/QuestPDF/QuestPDF").Style(hyperlinkStyle);
    text.Span(" and ");
    text.Hyperlink("NuGet package page", "https://www.nuget.org/packages/QuestPDF").Style(hyperlinkStyle);
    text.Span(".");
});
