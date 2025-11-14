---
outline: [2, 3]
---


# Accessibility

For software developers, PDF accessibility means programmatically creating documents that everyone, including people with disabilities, can use effectively.

## Introduction

At its core, it's about ensuring your generated PDFs—like invoices, reports, or statements—work seamlessly with assistive technologies such as screen readers, braille displays, and navigation software.

An accessible PDF isn't defined by its visual appearance, but by the hidden logical structure you build into the file. This structure, which you create with your code, dictates the correct reading order, identifies headings, describes tables, and explains images. A screen reader cannot interpret a document based on visual layout alone; it relies entirely on the structural information you provide.

### Tagged PDF

This is the foundation of accessibility. A tagged PDF contains hidden structural metadata (tags) that define the document's logical structure. This is very similar to semantic HTML elements (e.g., `<h1>`, `<p>`, `<table>`). These tags describe the *meaning* of your content, allowing assistive technologies to navigate and read the document correctly.

### PDF/A (Archival)
This standard (ISO 19005) is primarily focused on the long-term preservation of electronic documents, ensuring a file can be opened and viewed reliably many years in the future. While its main goal isn't accessibility, several of its levels (like PDF/A-2a and PDF/A-3a) require the document to also be a Tagged PDF, thus incorporating accessibility as part of the archival requirements.

### PDF/UA (Universal Accessibility)
This is the gold standard for PDF accessibility. PDF/UA (ISO 14289) is a formal standard that specifies exactly how a PDF must be structured to be considered fully accessible. Achieving PDF/UA-1 compliance ensures your document provides the best possible experience for all users. When you enable accessibility features in QuestPDF, this is the standard you are working to meet.


## Compliance Tools

While QuestPDF handles the technical implementation of accessibility tags, it's crucial to validate your output. Generating a compliant document is a critical step, and several excellent tools are available to help you ensure your PDFs meet the necessary standards.

### VeraPDF

VeraPDF is an open-source, industry-supported tool designed specifically to validate PDF files against the PDF/A (Archival) and PDF/UA (Universal Accessibility) standards.

Developed with support from the PDF Association, VeraPDF performs a deep, technical analysis of a file's structure to confirm it fully conforms to the complex ISO specifications. It's the definitive tool for proving formal compliance, which is often a requirement for legal or archival purposes.

You can download VeraPDF from the [official website](https://verapdf.org/software/). Once installed, you can use its command-line interface to check a document:

```bash
verapdf document.pdf
```

### PAC (PDF Accessibility Checker)

PAC (PDF Accessibility Checker) is a free Windows tool that focuses on the practical aspects of accessibility. While VeraPDF checks for strict conformance to the standard, PAC checks how usable the document is for people relying on assistive technologies.

This tool is invaluable for developers because it simulates how a screen reader will interpret your document. It provides clear, actionable reports that highlight issues like incorrect reading order, missing image descriptions, or improperly tagged tables. Using PAC helps you move beyond simple compliance to ensure you're delivering a genuinely good experience for all users.

You can download PAC from the [official website](https://pac.pdf-accessibility.org/en).



## Minimal Example

Generating accessible PDF documents with QuestPDF is a straightforward process. 
Beyond just creating the visual layout, accessibility requires a few key considerations, all demonstrated in the example below.

First, you must apply a semantic structure to the content. 
This tells assistive technologies what is a header, paragraph, or image, creating a logical reading order. 
Second, it's essential to provide complete document metadata, such as the document's title and language. 
Finally, you need to enable the correct conformance settings to formally declare the document as PDF/A and PDF/UA compliant.

```csharp{11,23,28,41,46,53,59-69}
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Size(PageSizes.A5);
            page.Margin(30);

            page.Header()
                .PaddingBottom(15)
                .SemanticHeader1()
                .Text("Accessibility Test Document")
                .FontColor(Colors.Blue.Darken3)
                .FontSize(24)
                .Bold();
            
            page.Content()
                .Column(column =>
                {
                    column.Spacing(20);
                    
                    column.Item()
                        .SemanticSection()
                        .Column(column =>
                        {
                            column.Item()
                                .PaddingBottom(10)
                                .SemanticHeader2()
                                .Text("Section with text content")
                                .FontColor(Colors.Blue.Darken1)
                                .FontSize(16);
                            
                            column.Item()
                                .Text(Placeholders.Paragraphs())
                                .FontSize(12)
                                .ParagraphSpacing(8);
                        });
                    
                    column.Item()
                        .PreventPageBreak()
                        .SemanticSection()
                        .Column(column =>
                        {
                            column.Item()
                                .PaddingBottom(10)
                                .SemanticHeader2()
                                .Text("Section with image")
                                .FontColor(Colors.Blue.Darken1)
                                .FontSize(16);
                            
                            column.Item()
                                .Width(250)
                                .SemanticImage("Image showing a laptop")
                                .Image("Resources/product.jpg");
                        });
                });
        });
    })
    .WithMetadata(new DocumentMetadata
    {
        Language = "en-US",
        Title = "Accessibility Test",
        Subject = "This document shows how easy it is to create accessible PDF documents with QuestPDF"
    })
    .WithSettings(new DocumentSettings
    {
        PDFA_Conformance = PDFA_Conformance.PDFA_3A,
        PDFUA_Conformance = PDFUA_Conformance.PDFUA_1
    })
    .GeneratePdf("accessibility-minimal-example.pdf");
```

<object data="/patterns-and-practices/accessibility-minimal-example.pdf" type="application/pdf" class="pdf-viewer">
  <p>Unable to display PDF file. <a href="/patterns-and-practices/accessibility-minimal-example.pdf">Download</a> instead.</p>
</object>


## Semantic Elements

`Semantic` extension methods allow you to add logical structure to your PDF document, which is essential for accessibility and content extraction. 
By wrapping your layout elements (containers) with these methods, you are tagging the content according to its meaning, such as a heading, paragraph, or figure.

This "semantic tree" is used by assistive technologies, like screen readers, to navigate and understand the document's structure, making your content accessible to all users. It also improves content reflow and copy-paste behavior.


### Document Structure

These methods define the high-level organization of your document, which is essential for accessibility and creating a logical flow.

| Method               | Description                                                                                                                                              |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **SemanticSection**  | Groups a set of related content. A section typically includes a heading (e.g., `SemanticHeader2`) and its corresponding content. Sections can be nested. |
| **SemanticArticle**  | Marks a self-contained body of text that forms a single narrative, such as a blog post or news story.                                                    |
| **SemanticDivision** | Marks a generic block-level container for grouping elements, similar to an HTML `<div>`. Use this when a more specific tag doesn't apply.                |


### Headings

Headings are fundamental for document navigation and outlining the content's structure. 
Using them correctly is crucial for accessibility and allowing a PDF reader to generate a navigable Table of Contents.

| Method              | Description                                                                               |
|---------------------|-------------------------------------------------------------------------------------------|
| **SemanticHeader1** | Marks the content as a level 1 heading (H1), the highest level in the document hierarchy. |
| **SemanticHeader2** | Marks the content as a level 2 heading (H2).                                              |
| **SemanticHeader3** | Marks the content as a level 3 heading (H3).                                              |
| **SemanticHeader4** | Marks the content as a level 4 heading (H4).                                              |
| **SemanticHeader5** | Marks the content as a level 5 heading (H5).                                              |
| **SemanticHeader6** | Marks the content as a level 6 heading (H6), the lowest level.                            |

::: tip Document Outline
QuestPDF uses these semantic headers to automatically generate the document outline (often called a Table of Contents) in PDF readers. 
This allows end-users to quickly browse and jump to different parts of your document, significantly improving usability.
:::


### Text Content

These methods are used to tag common block-level text elements, distinguishing them from other structural elements like headings or lists.

| Method                     | Description                                                                                                                             |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| **SemanticParagraph**      | Marks a container as a paragraph. This is one of the most common tags for organizing text.                                              |
| **SemanticBlockQuotation** | Designates a block of text that is a quotation, typically consisting of one or more paragraphs. For inline quotes, use `SemanticQuote`. |


### Lists

Use this set of methods to properly structure ordered or unordered lists. 
Correctly tagging list components is vital for screen readers to announce the list structure correctly.

| Method                   | Description                                                                             |
|--------------------------|-----------------------------------------------------------------------------------------|
| **SemanticList**         | Marks a container as a list. Its direct children should be `SemanticListItem` elements. |
| **SemanticListItem**     | Marks an individual item within a `SemanticList`.                                       |
| **SemanticListLabel**    | Marks the label of a list item. This holds the bullet, number (e.g., '1.'), or term.    |
| **SemanticListItemBody** | Marks the body or descriptive content of a `SemanticListItem`.                          |

Here is a practical example of how to build a semantically correct list:

```csharp{1,9,13,17}
.SemanticList()
.Column(listColumn =>
{
    listColumn.Spacing(10);
    
    foreach (var i in Enumerable.Range(2, 5))
    {
        listColumn.Item()
            .SemanticListItem()
            .Row(row =>
            {
                row.ConstantItem(20)
                    .SemanticListLabel()
                    .Text($"{i}.");

                row.RelativeItem()
                    .SemanticListItemBody()
                    .Text(Placeholders.Sentence());
            });
    }
});
```

<object data="/patterns-and-practices/accessibility-list.pdf" type="application/pdf" class="pdf-viewer">
  <p>Unable to display PDF file. <a href="/patterns-and-practices/accessibility-list.pdf">Download</a> instead.</p>
</object>


### Tables

Tables are complex structural elements, and conformance standards require detailed tagging. 
This process is essential to ensure the document is accessible, especially for users who rely on screen readers to navigate and understand the data relationships.

QuestPDF simplifies this by automatically tagging tables for accessibility when you use the SemanticTable helper method.

```csharp{1}
.SemanticTable()
.Table(table =>
{
    // table content
});
```

It is also possible to mark specific cells as headers. 
Horizontal headers (often called Row Headers) provide a title or description for the data presented in their respective rows. 
Tagging them is crucial for accessibility, as it allows screen readers to correctly associate data cells with their corresponding row titles. 

For example, a screen reader can announce "Position: Senior Developer" rather than just "Senior Developer."

You can apply this tag using the AsSemanticHorizontalHeader method:

```csharp{23,28,33,38}
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Margin(60);

            page.Content()
                .Shrink()
                .Border(1)
                .BorderColor(Colors.Grey.Darken1)
                .SemanticTable()                        
                .Table(table =>
                {
                    table.ColumnsDefinition(columns =>
                    {
                        columns.RelativeColumn();
                        columns.RelativeColumn();
                        columns.RelativeColumn();
                    });

                    // Row 1: Name
                    table.Cell().AsSemanticHorizontalHeader().Element(HeaderCellStyle).Text("Name");
                    table.Cell().Element(CellStyle).Text("John Smith");
                    table.Cell().Element(CellStyle).Text("Jane Doe");

                    // Row 2: Position
                    table.Cell().AsSemanticHorizontalHeader().Element(HeaderCellStyle).Text("Position");
                    table.Cell().Element(CellStyle).Text("Senior Developer");
                    table.Cell().Element(CellStyle).Text("UX Designer");

                    // Row 3: Department
                    table.Cell().AsSemanticHorizontalHeader().Element(HeaderCellStyle).Text("Department");
                    table.Cell().Element(CellStyle).Text("Engineering");
                    table.Cell().Element(CellStyle).Text("Design");

                    // Row 4: Experience
                    table.Cell().AsSemanticHorizontalHeader().Element(HeaderCellStyle).Text("Experience");
                    table.Cell().Element(CellStyle).Text("5 years");
                    table.Cell().Element(CellStyle).Text("3 years");

                    IContainer HeaderCellStyle(IContainer container) =>
                        container
                            .Border(1)
                            .BorderColor(Colors.Grey.Lighten2)
                            .Background(Colors.Grey.Lighten3)
                            .Padding(8)
                            .AlignMiddle()
                            .DefaultTextStyle(x => x.Bold());

                    IContainer CellStyle(IContainer container) =>
                        container
                            .Border(1)
                            .BorderColor(Colors.Grey.Lighten2)
                            .Padding(8);
                });
        });![img.png](img.png)
    });
```

<object data="/patterns-and-practices/accessibility-table-horizontal-headers.pdf" type="application/pdf" class="pdf-viewer">
  <p>Unable to display PDF file. <a href="/patterns-and-practices/accessibility-table-horizontal-headers.pdf">Download</a> instead.</p>
</object>



### Table of Contents

Use accessibility tags to identify navigational aids within your document, such as a Table of Contents (TOC) or an Index. 
Properly tagging these sections is crucial for assistive technologies, allowing them to understand the document's structure and provide effective navigation for users.

QuestPDF provides the following methods for tagging these specific elements:

| Method                          | Description                                                                                                      |
|---------------------------------|------------------------------------------------------------------------------------------------------------------|
| **SemanticTableOfContents**     | Marks a container as a Table of Contents (TOC). It should be composed of `SemanticTableOfContentsItem` elements. |
| **SemanticTableOfContentsItem** | Marks an individual item within a `SemanticTableOfContents`.                                                     |
| **SemanticIndex**               | Marks a section of the document as an index, which typically holds a sequence of entries and references.         |

The example below demonstrates how to build a fully functional and accessible Table of Contents. 
It generates a list of entries, and each entry links to a corresponding section later in the document. 
The page numbers for each entry are automatically resolved by referencing the target section.

```csharp{47-67}
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Margin(60);

            page.Content()
                .PaddingVertical(30)
                .Column(column =>
                {
                    column.Item()
                        .ExtendVertical()
                        .AlignMiddle()
                        .SemanticHeader1()
                        .Text("Conformance Test:\nTable of Contents")
                        .FontSize(36)
                        .Bold()
                        .FontColor(Colors.Blue.Darken2);

                    column.Item().PageBreak();

                    column.Item().Element(GenerateTableOfContentsSection);

                    column.Item().PageBreak();

                    column.Item().Element(GeneratePlaceholderContentSection);
                });
        });
    });

static void GenerateTableOfContentsSection(IContainer container)
{
    container
        .SemanticSection()
        .Column(column =>
        {
            column.Spacing(15);
            
            column
                .Item()
                .Text("Table of Contents")
                .Bold()
                .FontSize(20)
                .FontColor(Colors.Blue.Medium);
            
            column.Item()
                .SemanticTableOfContents()
                .Column(column =>
                {
                    column.Spacing(5);
                    
                    foreach (var i in Enumerable.Range(1, 10))
                    {
                        column.Item()
                            .SemanticTableOfContentsItem()
                            .SemanticLink($"Link to section {i}")
                            .SectionLink($"section-{i}")
                            .Row(row =>
                            {
                                row.ConstantItem(25).Text($"{i}.");
                                row.AutoItem().Text(Placeholders.Label());
                                row.RelativeItem().PaddingHorizontal(2).TranslateY(11).LineHorizontal(1).LineDashPattern([1, 3]);
                                row.AutoItem().Text(text => text.BeginPageNumberOfSection($"section-{i}"));
                            });
                    }
                });
        });
}

static void GeneratePlaceholderContentSection(IContainer container)
{
    container
        .Column(column =>
        {
            foreach (var i in Enumerable.Range(1, 10))
            {
                column.Item()
                    .SemanticSection()
                    .Section($"section-{i}")
                    .Column(column =>
                    {
                        column.Spacing(15);
                        
                        column.Item()
                            .SemanticHeader2()
                            .Text($"Section {i}")
                            .Bold()
                            .FontSize(20)
                            .FontColor(Colors.Blue.Medium);
                        
                        column.Item().Text(Placeholders.Paragraph());
                        
                        foreach (var j in Enumerable.Range(1, i))
                        {
                            column.Item()
                                .SemanticIgnore()
                                .Width(200)
                                .Height(150)
                                .CornerRadius(10)
                                .Background(Placeholders.BackgroundColor());
                        }
                    });
                
                if (i < 10)
                    column.Item().PageBreak();
            }
        });
}
```

<object data="/patterns-and-practices/accessibility-table-of-contents.pdf" type="application/pdf" class="pdf-viewer">
  <p>Unable to display PDF file. <a href="/patterns-and-practices/accessibility-table-of-contents.pdf">Download</a> instead.</p>
</object>


### Inline Elements

These methods apply semantic meaning to a portion of text, often within a Text element's span. 

This helps assistive technologies, like screen readers, understand the structure and type of content, even when it's mixed with other text.

| Method            | Description                                                                                                                           |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| **SemanticSpan**  | Marks a generic inline portion of text, similar to an HTML `<span>`. `alternativeText` can provide an expansion for an abbreviation.  |
| **SemanticQuote** | Marks an inline portion of text as a quote. This differs from `SemanticBlockQuotation`, which is for block-level content.             |
| **SemanticCode**  | Marks a fragment of text as computer code.                                                                                            |
| **SemanticLink**  | Marks the content as a hyperlink. **Alternative text is essential** to describe the link's purpose or destination for screen readers. |


### Illustrations and Media

Use these methods to identify non-text content. 

Providing clear and descriptive alternative text for these elements is one of the most important aspects of creating an accessible document.

| Method              | Description                                                                                                                    |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------|
| **SemanticFigure**  | Marks a container as a figure (e.g., a chart, diagram, or photograph). **Alternative text is essential** for accessibility.    |
| **SemanticImage**   | An alias for `SemanticFigure`. Marks the content as an image. **Alternative text is essential**.                               |
| **SemanticFormula** | Marks the content as a mathematical formula. It is treated like a figure and **requires alternative text** (e.g., "E = mc^2"). |
| **SemanticCaption** | Identifies a brief caption or description for a table, figure, or image. It should be placed near the element it describes.    |

```csharp{1,9}
.SemanticImage("Sample image description")
.Column(column =>
{
    column.Item().Image(imageData);
    
    column.Item()
        .PaddingTop(5)
        .AlignCenter()
        .SemanticCaption()
        .Text("Sample image caption");
});
```

<object data="/patterns-and-practices/accessibility-image.pdf" type="application/pdf" class="pdf-viewer">
  <p>Unable to display PDF file. <a href="/patterns-and-practices/accessibility-image.pdf">Download</a> instead.</p>
</object>


### Language

This method applies a language attribute to a container, specifying the natural language of its content (e.g., "en-US", "fr-FR", "es-ES"). 

This is crucial for accessibility, as it allows screen readers to switch to the correct pronunciation rules, ensuring the text is read clearly and accurately.

> **Example:**
>
> ```csharp
> .SemanticLanguage("es-ES")
> .Text("Hola, Mundo!");
> ```


### Ignoring Content

This method excludes a container and all its children from the PDF's semantic (accessibility) tree. 
This is essential for decorative elements—such as background shapes, ornamental borders, or layout helper lines—that add visual flair but provide no structural or informational value.

Ignoring these elements prevents screen readers from announcing confusing, non-essential content, leading to a much cleaner and more understandable experience for the user.

`public static IContainer SemanticIgnore(this IContainer container)`
