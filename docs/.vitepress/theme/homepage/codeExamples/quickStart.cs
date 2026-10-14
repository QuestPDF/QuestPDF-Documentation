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
                .Strikethrough(task.IsDone);

            row.ConstantItem(50).Text(task.DueDate?.ToString("d") ?? "No due date");

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
