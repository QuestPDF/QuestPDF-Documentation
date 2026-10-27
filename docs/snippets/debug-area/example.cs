container
    .Width(250)
    .Height(250)
    .Padding(25)
    .DebugArea("Photo gallery", Colors.Blue.Medium)
    .Column(column =>
    {
        column.Spacing(5);

        foreach (var _ in Enumerable.Range(0, 3))
        {
            column.Item().Row(row =>
            {
                row.Spacing(5);

                foreach (var _ in Enumerable.Range(0, 3))
                    row.RelativeItem().Height(50).Placeholder();
            });
        }
    });
