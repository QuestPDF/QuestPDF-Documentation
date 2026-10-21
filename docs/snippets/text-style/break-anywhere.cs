.Column(column =>
{
    column.Spacing(20);

    column.Item()
        .Background(Colors.Grey.Lighten3)
        .Text("https://www.questpdf.com/api-reference/text/font-management.html#manual-font-registration");

    column.Item()
        .Background(Colors.Grey.Lighten3)
        .Text("https://www.questpdf.com/api-reference/text/font-management.html#manual-font-registration")
        .BreakAnywhere();
});
