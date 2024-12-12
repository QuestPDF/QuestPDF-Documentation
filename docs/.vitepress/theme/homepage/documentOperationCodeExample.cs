DocumentOperation
    .LoadFile("input.pdf")
    .TakePages("1-10")
    .MergeFile("appendix.pdf", "1-z") // all pages
    .AddAttachment(new DocumentAttachment
    {
        FilePath = "metadata.xml"
    })
    .Encrypt(new Encryption256Bit
    {
        OwnerPassword = "mypassword",
        AllowPrinting = true,
        AllowContentExtraction = false
    })
    .Save("final-document.pdf");