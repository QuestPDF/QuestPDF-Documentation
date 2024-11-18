# PDF Document Operations

The Document Operations API provides functionality for performing various operations on PDF documents, including loading, merging, overlaying, underlaying, selecting specific pages, adding attachments, and applying encryption settings.

:::info
Features presented in this sections are created using the [qpdf](https://github.com/qpdf/qpdf) library, available under the "Apache-2.0" license.
We extend our thanks to the authors of qpdf for their contributions to the open-source community.

The code of qpdf library has been extended by QuestPDF to support important PDF/A-3b compliance requirements as well ZUGFeRD metadata extension.
:::

:::warning
Features presented in this section are available starting from the **2024.12.0** version of the library.
:::

## Loading Documents

The `LoadFile` method loads a PDF file for processing, enabling operations such as merging, overlaying or underlaying content, selecting pages, adding attachments, and encrypting.

```csharp
// Load an unprotected document and save
DocumentOperation
    .LoadFile("input.pdf")
    .Save("output.pdf");

// Load a password-protected document and save
var operation = DocumentOperation
    .LoadFile("protected.pdf", "password123")
    .Save("unprotected-output.pdf");
```

## Page Selection

The `TakePages` method selects specific pages from the current document based on the provided page selector, marking them for further operations.

```csharp
// Select specific pages
DocumentOperation
    .LoadFile("input.pdf")
    .TakePages("1,3,5-10")
    .Save("selected-pages.pdf");
```

## Page Range Format

| Example            | Description                                                                     |
|--------------------|---------------------------------------------------------------------------------|
| 1                  | Single page numbers start from 1 (first page)                                   |
| r2                 | Prefix `r` counts from end - second-to-last page                                |
| z                  | Letter `z` represents the last page (same as `r1`)                              |
| 1,6,4              | Pages can appear in any order when separated by commas                          |
| 3-7                | Pages 3 through 7 in ascending order (inclusive range)                          |
| 7-3                | Pages 7 through 3 in descending order (when first number is higher)             |
| 1-z                | All pages in ascending order                                                    |
| z-1                | All pages in descending order                                                   |
| 1,3,5-9,15-12      | Pages 1, 3, 5-9 ascending, then 15-12 descending                                |
| r3-r1              | Last three pages                                                                |
| 1-20:even          | Suffix `:even` or `:odd` selects only pages in those positions from final range |
| 1-10,x3-4          | Prefix `x` excludes specified pages from previous range                         |
| 4-10,x7-9,12-8,xr5 | Pages 4-10 (except 7-9), then 12-8 descending (except 5th from end)             |


## Document Linearization

Linearization creates web-optimized output files. Linearized files are structured to allow compliant PDF readers to begin displaying content before the entire file is downloaded. Normally, a PDF reader requires the entire file to be present to render content, as essential cross-reference data typically appears at the file's end.

```csharp
DocumentOperation
    .LoadFile("input.pdf")
    .Linearize()
    .Save("web-optimized.pdf");
```

## Merging Documents

The `MergeFile` method merges pages from the specified PDF file into the current document, according to the provided page selection.

Simple example of merging two documents:

```csharp
DocumentOperation
    .LoadFile("document1.pdf")
    .MergeFile("document2.pdf")
    .Save("merged.pdf");
```

Advanced example where two documents are merged with specific page selections:

```csharp
DocumentOperation
    .LoadFile("document1.pdf")
    .TakePages("1-5")                    // Take first 5 pages from document1
    .MergeFile("document2.pdf", "1,3,5") // Take specific pages from document2
    .Save("merged-selected.pdf");
```

## Overlays and Underlays

### Configuration Options

| Option            | Description                                                                                                                     |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------|
| FilePath          | The file path of the overlay/underlay PDF file to be used                                                                       |
| TargetPages       | Specifies the range of pages in the output document where the overlay/underlay will be applied                                  |
| SourcePages       | Specifies the range of pages in the overlay/underlay file to be used initially                                                  |
| RepeatSourcePages | Specifies an optional range of pages in the overlay/underlay file that will repeat after the initial source pages are exhausted |

A simple overlay example:

```csharp
DocumentOperation
    .LoadFile("input.pdf")
    .OverlayFile(new LayerConfiguration
    {
        FilePath = "watermark.pdf"
    })
    .Save("with-watermark.pdf");
```

More complex overlay example with specific page selections:

```csharp
DocumentOperation
    .LoadFile("input.pdf")
    .OverlayFile(new LayerConfiguration
    {
        FilePath = "header-footer.pdf",
        TargetPages = "1-z",           // Apply to all pages
        SourcePages = "1",             // Use first page initially
        RepeatSourcePages = "1"        // Repeat first page throughout
    })
    .Save("with-header-footer.pdf");
```

## Document Encryption

### Base Encryption Settings

| Setting       | Description                                                                                                                                                                                 |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| UserPassword  | The user password for the PDF, allowing restricted access based on encryption settings. May be left null to enable opening the PDF without a password                                       |
| OwnerPassword | The owner password for the PDF, granting full access to all document features. An empty owner password is considered insecure, as is using the same value for both user and owner passwords |

### Encryption Types and Permissions

| Permission             | 40-bit | 128-bit | 256-bit | Description                                                          |
|------------------------|--------|---------|---------|----------------------------------------------------------------------|
| AllowAnnotation        | ✓      | ✓       | ✓       | Allows adding or modifying text annotations                          |
| AllowContentExtraction | ✓      | ✓       | ✓       | Allows copying text and graphics                                     |
| AllowModification      | ✓      | -       | -       | Allows document modifications                                        |
| AllowPrinting          | ✓      | ✓       | ✓       | Allows printing the document                                         |
| AllowAssembly          | -      | ✓       | ✓       | Allows inserting, rotating, or deleting pages and creating bookmarks |
| AllowFillingForms      | -      | ✓       | ✓       | Allows filling in form fields                                        |
| EncryptMetadata        | -      | ✓       | ✓       | Controls whether document metadata is encrypted                      |

40-bit encryption example:

```csharp
DocumentOperation
    .LoadFile("input.pdf")
    .Encrypt(new Encryption40Bit
    {
        UserPassword = "user123",
        OwnerPassword = "owner456",
        AllowPrinting = true,
        AllowModification = false,
        AllowContentExtraction = false,
        AllowAnnotation = true
    })
    .Save("encrypted-40bit.pdf");
```

128-bit encryption example:

```csharp
DocumentOperation
    .LoadFile("input.pdf")
    .Encrypt(new Encryption128Bit
    {
        UserPassword = "user123",
        OwnerPassword = "owner456",
        AllowPrinting = true,
        AllowContentExtraction = false,
        AllowFillingForms = true,
        AllowAssembly = false,
        AllowAnnotation = true,
        EncryptMetadata = true
    })
    .Save("encrypted-128bit.pdf");
```

256-bit encryption example:

```csharp
DocumentOperation
    .LoadFile("input.pdf")
    .Encrypt(new Encryption256Bit
    {
        UserPassword = "user123",
        OwnerPassword = "owner456",
        AllowPrinting = true,
        AllowContentExtraction = false,
        AllowFillingForms = true,
        AllowAssembly = false,
        AllowAnnotation = true,
        EncryptMetadata = true
    })
    .Save("encrypted-256bit.pdf");
```

## File Attachments

### Configuration Options

| Option           | Description                                                                                                                                         |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| Key              | Sets the key for the attachment, specific to the PDF format. Defaults to the file name without its path                                             |
| FilePath         | The file path of the attachment. The specified file must exist                                                                                      |
| AttachmentName   | Specifies the display name for the attachment. This name is typically shown to the user and used by most graphical PDF viewers when saving the file |
| CreationDate     | Specifies the creation date of the attachment. Defaults to the file's creation time                                                                 |
| ModificationDate | Specifies the modification date of the attachment. Defaults to the file's last modified time                                                        |
| MimeType         | Specifies the MIME type of the attachment (e.g., "text/plain", "application/pdf", "image/png")                                                      |
| Description      | Sets a description for the attachment, which may be displayed by some PDF viewers                                                                   |
| Replace          | Indicates whether to replace an existing attachment with the same key                                                                               |
| Relationship     | Specifies the relationship of the embedded file to the document for PDF/A-3b compliance                                                             |

### Attachment Relationships

| Relationship | Description                                                                              |
|--------------|------------------------------------------------------------------------------------------|
| Data         | Indicates data files relevant to the document (e.g., supporting datasets or data tables) |
| Source       | Represents a source file directly used to create the document                            |
| Alternative  | An alternative representation of the document content (e.g., XML, HTML)                  |
| Supplement   | A file supplementing the content, like additional resources                              |
| Unspecified  | No specific relationship is defined                                                      |

A simple attachment example:

```csharp
DocumentOperation
    .LoadFile("input.pdf")
    .AddAttachment(new DocumentAttachment
    {
        FilePath = "data.csv",
        Description = "Supporting data table",
        MimeType = "text/csv"
    })
    .Save("with-attachment.pdf");
```

### PDF/A-3b Compliant Attachment

The PDF/A-3b standard requires that all attachments provide more information about their relationship to the document. The `Relationship` property is used to specify the attachment's relationship to the document content.

```csharp
DocumentOperation
    .LoadFile("input.pdf")
    .AddAttachment(new DocumentAttachment
    {
        FilePath = "invoice-data.xml",
        Description = "Invoice XML data",
        MimeType = "application/xml",
        Relationship = DocumentAttachmentRelationship.Alternative,
        CreationDate = DateTime.UtcNow,
        ModificationDate = DateTime.UtcNow,
        Replace = true
    })
    .Save("pdfa3b-compliant.pdf");
```

## XMP Metadata Extension

The `ExtendMetadata` method extends the current document's XMP metadata by adding content within the `rdf:Description` tag. This allows for adding additional descriptive metadata to the PDF, which is useful for compliance standards like PDF/A or for industry-specific metadata (e.g., ZUGFeRD).

```csharp
var metadata = @"<custom:Metadata xmlns:custom='http://example.com/custom'>
    <custom:Value>Example metadata</custom:Value>
</custom:Metadata>";

var operation = DocumentOperation
    .LoadFile("input.pdf")
    .ExtendMetadata(metadata)
    .Save("with-metadata.pdf");
```

## Advanced Examples

### Combining Multiple Operations

```csharp
DocumentOperation
    .LoadFile("input.pdf")
    .TakePages("1-10")                 // Select first 10 pages
    .MergeFile("appendix.pdf", "1-z")  // Append all pages from appendix
    .OverlayFile(new LayerConfiguration
    {
        FilePath = "watermark.pdf",
        TargetPages = "1-z"
    })
    .AddAttachment(new DocumentAttachment
    {
        FilePath = "metadata.xml",
        Relationship = DocumentAttachmentRelationship.Supplement
    })
    .Encrypt(new Encryption256Bit
    {
        OwnerPassword = "owner456",
        AllowPrinting = true,
        AllowContentExtraction = false
    })
    .Linearize()                       // Optimize for web
    .Save("final-document.pdf");
```
