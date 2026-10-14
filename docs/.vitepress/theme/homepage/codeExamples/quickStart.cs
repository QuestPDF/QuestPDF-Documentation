IContainer DrawTask(TodoTask task)
{
    return Container.Create().Column(column =>
    {
        column.Spacing(5);

        column.Item().Row(row =>
        {
            row.ConstantItem(20).Svg(task.IsDone ? "check.svg" : "uncheck.svg");

            row.RelativeItem()
                .PaddingLeft(5)
                .Text(task.Title)
                .FontColor(task.IsImportant ? Colors.Orange.Darken2 : Colors.Black)
                .Strikethrough(task.IsDone);

            row.ConstantItem(50).Text(task.DueDate?.ToShortDateString() ?? "No due date");

            row.ConstantItem(50).Inlined(inlined =>
            {
                foreach (var tag in task.Tags)
                    inlined.Item().Element(DrawTag(tag));
            });
        });

        foreach (var subtask in task.Subtasks)
            column.Item().PaddingLeft(25).Element(DrawTask(subtask));
    });
}

IContainer DrawTag(string tag)
{
    return Container.Create()
        .CornerRadius(4).Border(1, Colors.Gray.Lighten2)
        .PaddingVertical(2).PaddingHorizontal(4)
        .Text(tag.ToUpper())
        .FontColor(Colors.Gray.Darken1).FontSize(10);
}
