static readonly Color Accent = Colors.Grey.Darken4;

void ComposePage(PageDescriptor page)
{
    page.Size(PageSizes.A4);
    page.Margin(50);
    page.DefaultTextStyle(x => x.FontSize(10));

    page.Header().Element(ComposeHeader);
    page.Content().Element(ComposeContent);
    page.Footer().Element(ComposeFooter);
}

void ComposeHeader(IContainer container)
{
    container.Row(row =>
    {
        row.ConstantItem(40).Svg("logo.svg");

        row.RelativeItem()
            .PaddingLeft(12)
            .AlignMiddle()
            .Column(column =>
            {
                column.Item()
                    .Text("Alderwick")
                    .FontSize(16)
                    .Bold();

                column.Item()
                    .Text("Design Studio")
                    .FontColor(Colors.Grey.Darken1);
            });

        row.AutoItem().Column(column =>
        {
            column.Item()
                .Text($"Invoice {Model.Number}")
                .FontSize(20)
                .Bold()
                .FontColor(Accent);

            column.Item().Text($"Issued {Model.Issued:d MMM yyyy}");
            column.Item().Text($"Due {Model.Due:d MMM yyyy}");
        });
    });
}

void ComposeContent(IContainer container)
{
    container.PaddingVertical(36).Column(column =>
    {
        column.Spacing(28);

        column.Item().Element(ComposeAddresses);
        column.Item().Element(ComposeItems);
        column.Item().Element(ComposeTotals);
    });
}

void ComposeAddresses(IContainer container)
{
    container.Row(row =>
    {
        row.Spacing(24);

        AddAddressBlock("From", Model.Seller);
        AddAddressBlock("Bill to", Model.Customer);

        void AddAddressBlock(string label, Address address)
        {
            row.RelativeItem().Column(column =>
            {
                column.Item()
                    .PaddingBottom(4)
                    .Text(label)
                    .Bold()
                    .FontColor(Accent);

                column.Item().Text(address.Name);
                column.Item().Text(address.Street);
                column.Item().Text(address.City);
            });
        }
    });
}

void ComposeItems(IContainer container)
{
    container.Table(table =>
    {
        table.ColumnsDefinition(columns =>
        {
            columns.RelativeColumn();
            columns.ConstantColumn(40);
            columns.ConstantColumn(80);
            columns.ConstantColumn(80);
        });

        table.Header(header =>
        {
            header.Cell().Element(Label).Text("Item");
            header.Cell().Element(Label).AlignRight().Text("Qty");
            header.Cell().Element(Label).AlignRight().Text("Price");
            header.Cell().Element(Label).AlignRight().Text("Total");
        });

        foreach (var item in Model.Items)
        {
            table.Cell().Element(Cell).Text(item.Name);
            table.Cell().Element(Number).Text($"{item.Quantity}");
            table.Cell().Element(Number).Text($"{item.Price:C}");
            table.Cell().Element(Number).Text($"{item.Amount:C}");
        }
    });

    IContainer Label(IContainer cell) => cell
        .BorderBottom(1)
        .BorderColor(Accent)
        .PaddingBottom(6)
        .DefaultTextStyle(x => x.Bold().FontColor(Accent));

    IContainer Cell(IContainer cell) => cell
        .BorderBottom(0.5f)
        .BorderColor(Colors.Grey.Lighten2)
        .PaddingVertical(8);

    IContainer Number(IContainer cell) => Cell(cell).AlignRight();
}

void ComposeTotals(IContainer container)
{
    container.AlignRight().Width(220).Column(column =>
    {
        column.Spacing(4);

        AddLine("Subtotal", Model.Subtotal);
        AddLine("VAT", Model.Vat);

        column.Item()
            .BorderTop(1)
            .BorderColor(Accent)
            .PaddingTop(8)
            .AlignRight()
            .Text($"Total due {Model.Total:C}")
            .FontSize(14)
            .Bold()
            .FontColor(Accent);

        void AddLine(string label, decimal amount)
        {
            column.Item().Row(row =>
            {
                row.RelativeItem().Text(label);
                row.AutoItem().Text($"{amount:C}");
            });
        }
    });
}

void ComposeFooter(IContainer container)
{
    container.Row(row =>
    {
        row.RelativeItem()
            .Text($"IBAN {Model.Iban} · Payment within 14 days")
            .FontSize(8)
            .FontColor(Colors.Grey.Darken1);

        row.AutoItem().Text(text =>
        {
            text.DefaultTextStyle(x => x.FontSize(8));
            text.CurrentPageNumber();
            text.Span(" / ");
            text.TotalPages();
        });
    });
}
