.Row(row =>
{
    row.Spacing(25);

    row.RelativeItem()
        .Background(Colors.Grey.Lighten3)
        .Padding(10)
        .Column(column =>
        {
            column.Item().Text("Without ligatures").FontSize(16);

            column.Item()
                .Text("fly and fight")
                .FontSize(32)
                .DisableFontFeature(FontFeatures.StandardLigatures);
        });

    row.RelativeItem()
        .Background(Colors.Grey.Lighten3)
        .Padding(10)
        .Column(column =>
        {
            column.Item().Text("With ligatures").FontSize(16);

            column.Item().Text("fly and fight")
                .FontSize(32)
                .EnableFontFeature(FontFeatures.StandardLigatures);
        });
});
