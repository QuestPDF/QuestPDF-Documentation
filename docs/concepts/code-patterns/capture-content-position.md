# Code pattern: Capture Content Position

When generating PDF documents, you sometimes need to create elements that depend on the position of other content already placed in the document. 

QuestPDF provides the CaptureContentPosition API to address these scenarios elegantly. 

This feature observes the rendering process of your content and captures its precise position and size on each page. 
You can then use this captured positional data in a Dynamic component to build and position other elements exactly where you need them, creating sophisticated layout relationships between different parts of your document.

::: danger
When using the `GetContentCapturedPositions` method, keep in mind that it may return an empty or incomplete array depending on the current document rendering phase. 
It is expected behavior, as the document generation process requires two rendering passes. 

Your implementation should handle these cases gracefully, as shown in the example above.
:::

### Example

The following example demonstrates how to implement a demo of proofreading functionality. 
It highlights incorrect words in red with strikethrough formatting and adds corrected versions in green.
Finally, it places an icon beside each correction for easy identification.

To implement this feature, we need to capture two types of positions: the position of the entire text container as a reference point, and the specific positions of each mistake that needs an icon.

```c#{16,18,36,40}
Document
.Create(document =>
{
    document.Page(page =>
    {
        page.ContinuousSize(575);
        page.DefaultTextStyle(x => x.FontSize(20));
        page.Margin(25);

        page.Content()
            .Background(Colors.White)
            .Row(row =>
            {
                row.Spacing(25);

                row.ConstantItem(0).Dynamic(new DynamicTextSpanPositionCapture());

                row.RelativeItem().CaptureContentPosition("container").Text(text =>
                {
                    text.Justify();
                    
                    var mistakeTextStyle = TextStyle.Default
                        .FontColor(Colors.Red.Darken3)
                        .BackgroundColor(Colors.Red.Lighten4)
                        .Strikethrough()
                        .DecorationThickness(2);
                    
                    var correctionTextStyle = TextStyle.Default
                        .FontColor(Colors.Green.Darken3)
                        .BackgroundColor(Colors.Green.Lighten4);

                    text.Span("Proofreading").Bold().Underline().DecorationThickness(2);
                    text.Span(" technical documentation is a critical quality assurance step that ensures clarity, accuracy, and consistency across all written content. It involves more than just checking for grammar and ");
                    text.Span("spilling").Style(mistakeTextStyle);
                    text.Span("spelling").Style(correctionTextStyle);
                    text.Element(TextInjectedElementAlignment.Middle).CaptureContentPosition("mistake");
                    text.Span(" errors—it also includes verifying terminology, code syntax, formatting standards, and logical flow. A common best practice is to have the content reviewed by both a subject matter ");
                    text.Span("export").Style(mistakeTextStyle);
                    text.Span("expert").Style(correctionTextStyle);
                    text.Element(TextInjectedElementAlignment.Middle).CaptureContentPosition("mistake");
                    text.Span(" and a language specialist, ensuring that the material is technically sound while also being accessible to the intended audience.");
                });
            });
    });
})
.GeneratePdf("file.pdf");
```

The dynamic component below uses the captured positions to generate and place correction icons. 
Notice how we retrieve both the container position and the positions of each mistake marker to calculate the proper placement of each icon.

```c#{5,6}
public class DynamicTextSpanPositionCapture : IDynamicComponent
{
    public DynamicComponentComposeResult Compose(DynamicContext context)
    {
        var containerLocation = context.GetContentCapturedPositions("container").FirstOrDefault(x => x.PageNumber == context.PageNumber);
        var mistakeLocations = context.GetContentCapturedPositions("mistake").Where(x => x.PageNumber == context.PageNumber).ToList();
        
        if (containerLocation == null || mistakeLocations.Count == 0)
        {
            return new DynamicComponentComposeResult
            {
                Content = context.CreateElement(_ => { }),
                HasMoreContent = false
            };
        }

        var content = context.CreateElement(container =>
        {
            container.Layers(layers =>
            {
                layers.PrimaryLayer();

                foreach (var mistakeLocation in mistakeLocations)
                {
                    layers
                        .Layer()
                        .Unconstrained() 
                        .TranslateY(mistakeLocation.Y - containerLocation.Y)
                        .TranslateX(-12)
                        .TranslateY(-12)
                        .Width(24)
                        .Svg("Resources/proofreading.svg");
                }
            });
        });

        return new DynamicComponentComposeResult
        {
            Content = content,
            HasMoreContent = false
        };
    }
}
```

![example](/patterns-and-practices/code-pattern-element-position-locator.webp =575x)
