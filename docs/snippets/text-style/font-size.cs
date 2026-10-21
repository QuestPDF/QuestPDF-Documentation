.Column(column =>
{
    column.Spacing(10);

    column.Item()
        .Text("This is small text (16pt)")
        .FontSize(16);

    column.Item()
        .Text("This is medium text (24pt)")
        .FontSize(24);

    column.Item()
        .Text("This is large text (36pt)")
        .FontSize(36);
});
