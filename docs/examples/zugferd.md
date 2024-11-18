# Creating ZUGFeRD-Compliant PDF Documents

## Introduction

ZUGFeRD (Zentraler User Guide des Forums elektronische Rechnung Deutschland) is a German standard for electronic invoicing that combines PDF documents with embedded XML data. It allows for both human-readable PDF invoices and machine-readable structured data in a single file, enabling automated processing while maintaining traditional PDF workflow compatibility.

A ZUGFeRD-compliant PDF document must meet the following requirements:
- Be PDF/A-3b compliant
- Include the invoice data as an XML attachment
- Contain specific XMP metadata

## Creating ZUGFeRD Documents

Here's a complete example showing how to create a ZUGFeRD-compliant PDF document:

```csharp
Document
   .Create(document =>
   {
       document.Page(page =>
       {
           page.Content().Text("Your invoice content");
       });
   })
   .WithSettings(new DocumentSettings { PdfA = true }) // PDF/A-3b
   .GeneratePdf("invoice.pdf");

DocumentOperation
   .LoadFile("invoice.pdf")
   .AddAttachment(new DocumentOperation.DocumentAttachment
   {
       Key = "factur-zugferd",
       FilePath = "resource-factur-x.xml",
       AttachmentName = "factur-x.xml",
       MimeType = "text/xml",
       Description = "Factur-X Invoice",
       Relationship = DocumentOperation.DocumentAttachmentRelationship.Source,
       CreationDate = DateTime.UtcNow,
       ModificationDate = DateTime.UtcNow
   })
   .ExtendMetadata(File.ReadAllText("resource-zugferd-metadata.xml"))
   .Save("zugferd-invoice.pdf");
```

:::tip
ZUGFeRD comes in different versions with varying requirements. This documentation covers ZUGFeRD 2.1, which is based on the UN/CEFACT Cross Industry Invoice (CII) standard. When implementing ZUGFeRD support, ensure you're using the correct version for your needs and that all components (XML schema, metadata, and PDF/A version) align with that version.
:::
