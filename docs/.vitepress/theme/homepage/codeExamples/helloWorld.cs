Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Size(PageSizes.A4);
            page.Margin(32);

            page.Content()
                .Text("Hello PDF!")
                .FontSize(24);
        });
    })
    .GeneratePdfAndShow();