# Document metadata

It is possible to include additional information about the PDF document. 
This metadata is stored in the PDF file and can be viewed in the document properties.

```c#{9-19}
Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Content().Text("Your invoice content");
        });
    })
    .WithMetadata(new DocumentMetadata
    {
        Title = "Invoice",
        Author = "John Doe",
        Subject = "Invoice for services",
        Keywords = "invoice, services, payment",
        Creator = "MyApplication",
        Producer = "PdfRpt"
        Language = "en-US",
        CreationDate = DateTimeOffset.Now,
        ModifiedDate = DateTimeOffset.Now
    })
    .GeneratePdf("document.pdf");
```

| Property         | Description                                                                                                                                                   |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Title**        | Represents the main heading or name of the document, often displayed as a prominent identifier or label in PDF metadata.                                      |
| **Author**       | Specifies the individual or entity responsible for creating the document.                                                                                     |
| **Subject**      | Provides a brief description or main topic related to the document content.                                                                                   |
| **Keywords**     | Defines a collection of terms or phrases that describe the document's content or purpose, improving categorization and searchability.                         |
| **Creator**      | Identifies the software or system that generated the document.                                                                                                |
| **Producer**     | Specifies the name of the application or library that generated the document.                                                                                 |
| **Language**     | Specifies the language of the document content, defined using language tags such as "en-US" for American English.                                             |
| **CreationDate** | Represents the date and time when the document was created. This property is used to specify the creation timestamp.                                          |
| **ModifiedDate** | Stores the most recent date and time when the content or metadata of the document was updated, providing information about the last revision of the document. |
