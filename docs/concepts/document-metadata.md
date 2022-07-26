# Document metadata

You can modify the PDF document metadata by returning the `DocumentMetadata` object from the `IDocument.GetMetadata()` method. There are multiple properties available, some of them have default values:

```csharp
public class DocumentMetadata
{
    public int ImageQuality { get; set; } = 101;
    public int RasterDpi { get; set; } = 72;
    public bool PdfA { get; set; }

    public string? Title { get; set; }
    public string? Author { get; set; }
    public string? Subject { get; set; }
    public string? Keywords { get; set; }
    public string? Creator { get; set; }
    public string? Producer { get; set; }

    public DateTime CreationDate { get; set; } = DateTime.Now;
    public DateTime ModifiedDate { get; set; } = DateTime.Now;

    public int DocumentLayoutExceptionThreshold { get; set; } = 250;

    public bool ApplyCaching { get; set; } // false when debugger is attached
    public bool ApplyDebugging { get; set; } // true when debugger is attached

    public static DocumentMetadata Default => new DocumentMetadata();
}
```

::: tip
If the number of generated pages exceeds the `DocumentLayoutExceptionThreshold` (likely due to infinite layout), the exception is thrown. Please adjust this parameter, so the library can stop as soon as possible, saving CPU and memory resources.
:::

::: tip
The `ImageQuality` property controls the trade-off between quality and size. The default value `101` corresponds to lossless encoding. When you use a value less than 100, all images are opaque and encoded using the JPEG algorithm. The smaller the value is, the higher compression is used.
:::
