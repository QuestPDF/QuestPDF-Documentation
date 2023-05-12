# Document metadata

You can modify the PDF document metadata by returning the `DocumentMetadata` object from the `IDocument.GetMetadata()` method. There are several properties available, and some of them have default values (see below).

```csharp
public class DocumentMetadata
{
    public string? Title { get; set; }
    public string? Author { get; set; }
    public string? Subject { get; set; }
    public string? Keywords { get; set; }
    public string? Creator { get; set; }
    public string? Producer { get; set; }

    public DateTime CreationDate { get; set; } = DateTime.Now;
    public DateTime ModifiedDate { get; set; } = DateTime.Now;

    public static DocumentMetadata Default => new DocumentMetadata();
}
```
