# Code pattern: local helpers

When building complex document layouts, you might find yourself repeating similar code structures. 
C# local functions offer an elegant solution to this challenge, allowing you to encapsulate reusable layout logic directly within your document generation method.

Local functions help maintain clean, readable code by defining specialized helper methods exactly where they're needed. 
This approach keeps related code together, improving both readability and maintainability without polluting your class with single-use methods.

```c#
container.Column(column =>
{
    column.Spacing(15);

    column.Item().Text("Business details:").FontSize(24).Bold().FontColor(Colors.Blue.Darken2);
    
    AddContactItem("Resources/Icons/phone.svg", Placeholders.PhoneNumber());
    AddContactItem("Resources/Icons/email.svg", Placeholders.Email());
    AddContactItem("Resources/Icons/web.svg", Placeholders.WebpageUrl());

    void AddContactItem(string iconPath, string label)
    {
        column.Item().Row(row =>
        {
            row.ConstantItem(32).AspectRatio(1).Svg(iconPath);
            row.ConstantItem(15);
            row.AutoItem().AlignMiddle().Text(label);
        });
    }
});
```

![example](/patterns-and-practices/code-pattern-local-helpers.webp)
