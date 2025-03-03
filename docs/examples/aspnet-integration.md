# Integration with ASP.NET

## License configuration

Configure your license in either the Startup.cs or Program.cs file depending on your project configuration. 
This code should be executed only once, when the application starts or during its initialization step.

```c#
// please kindly ensure what license is appropriate for your project
QuestPDF.Settings.License = LicenseType.Community;
```

::: tip
Learn more about the licensing and related configuration [here](https://www.questpdf.com/license/configuration.html).
:::

## Generating PDF files in controller endpoints

This section demonstrates how to generate and return a PDF file in an ASP.NET controller endpoint using QuestPDF. 
The example below creates a simple PDF document and sends it as a response when the endpoint is accessed.

```c#{5-14}
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    [HttpGet(Name = "GeneratePdf")]
    public IResult GeneratePdf()
    {
        // use any method to create a document, e.g.: injected service
        var document = CreateDocument();
        
        // generate PDF file and return it as a response
        var pdf = document.GeneratePdf();
        return Results.File(pdf, "application/pdf", "hello-world.pdf");
    }

    QuestPDF.Infrastructure.IDocument CreateDocument()
    {
        return Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(2, Unit.Centimetre);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(x => x.FontSize(20));

                page.Header()
                    .Text("Hello PDF!")
                    .SemiBold().FontSize(36).FontColor(Colors.Blue.Medium);

                page.Content()
                    .PaddingVertical(1, Unit.Centimetre)
                    .Column(x =>
                    {
                        x.Spacing(20);

                        x.Item().Text(Placeholders.LoremIpsum());
                        x.Item().Image(Placeholders.Image(200, 100));
                    });

                page.Footer()
                    .AlignCenter()
                    .Text(x =>
                    {
                        x.Span("Page ");
                        x.CurrentPageNumber();
                    });
            });
        });
    }
}
```