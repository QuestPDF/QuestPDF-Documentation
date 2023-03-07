# Settings

There are several parameters that alter the generation process. These are available using the static `Settings` class.

```csharp
// settings definition with default settings
public static class Settings
{
    public static int DocumentLayoutExceptionThreshold { get; set; } = 250;
    public static bool EnableCaching { get; set; } = !System.Diagnostics.Debugger.IsAttached;
    public static bool EnableDebugging { get; set; } = System.Diagnostics.Debugger.IsAttached;
    public static bool CheckIfAllTextGlyphsAreAvailable { get; set; } = System.Diagnostics.Debugger.IsAttached;
}

// adjust properties wherever you want
// best in the startup code
QuestPDF.Settings.DocumentLayoutExceptionThreshold = 1000;
```

## Maximum document length

This value represents the maximum length of the document that the library produces. This is useful when layout constraints are too strong, e.g. one element does not fit in another. In such cases, the library would produce a document of infinite length, consuming all available resources. To break the algorithm and save the environment, the library breaks the rendering process after reaching the specified document length.

If your content requires generating longer documents, please assign a suitable value.

```csharp
QuestPDF.Settings.DocumentLayoutExceptionThreshold = 250;
```

## Caching

This flag generates additional document elements to cache layout calculation results. In the vast majority of cases, this significantly improves performance, while slightly increasing memory consumption.

By default, this flag is enabled only when the debugger is NOT attached.

```csharp
QuestPDF.Settings.EnableCaching = true;
```

## Debugging

This flag generates additional document elements to improve the layout debugging experience. When `DocumentLayoutException` is thrown, the library is able to provide additional execution context. It includes layout calculation results and the path to the problematic area.

By default, this flag is enabled only when the debugger IS attached.

```csharp
QuestPDF.Settings.EnableDebugging = false;
```

## Checking font glyph availability

This flag enables the checking of font glyph availability. 

If your text contains glyphs that are not present in the specified font:
1) when this flag is enabled: `DocumentDrawingException` is thrown. 
2) when this flag is disabled: placeholder characters are visible in the produced PDF file. 

Enabling this flag may slightly decrease document generation performance. However, it provides hints that used fonts are not sufficient to produce correct results.

By default, this flag is enabled only when the debugger IS attached.

```csharp
QuestPDF.Settings.CheckIfAllTextGlyphsAreAvailable = false;
```
