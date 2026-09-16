# Settings

QuestPDF provides several configurable settings to fine-tune the document generation process. 
These settings are accessible via the static `QuestPDF.Settings` class.


## Caching

This flag generates additional document elements to cache layout calculation results.
In the vast majority of cases, this significantly improves performance, while slightly increasing memory consumption.

```csharp
// enabled by default
QuestPDF.Settings.EnableCaching = true;
```


## Detailed layout errors

When the provided content contains size constraints impossible to meet, the library determines the element that most likely causes the problem and enriches the `DocumentLayoutException` with its location and layout measurements.

This search is performed only when the document fails to generate, so the setting does not affect the performance of successfully generated documents.

```csharp
// enabled by default
QuestPDF.Settings.EnableDetailedLayoutErrors = true;
```


## Using system fonts

Decides whether the library should use the fonts installed in the operating system:
- when this flag is **disabled**: only the bundled `Lato` family, files found in the [discovery paths](#font-discovery-paths), and fonts registered via the `FontManager` class are available. This is the default behavior.
- when this flag is **enabled**: system fonts are available as well.

```csharp
// disabled by default
QuestPDF.Settings.UseSystemFonts = false;
```

Fonts installed on the operating system vary between machines.
A document that looks correct during development may fall back to a different typeface, display placeholder glyphs, or lose text entirely after deployment.
Relying only on files deployed along with the application ensures that a document renders identically everywhere.


## Font discovery paths

Specifies the collection of paths where the library automatically searches for font files to register.

By default, this collection contains the application files path.
You can add additional paths to this collection to include more directories for automatic font registration.

```csharp
QuestPDF.Settings.FontDiscoveryPaths.Add("/custom/font/directory");
```

Font files that cannot be loaded are skipped.


## Missing font families

Decides how the library reacts when document content references a font family that is not available:
- when this flag is **enabled**: the `DocumentDrawingException` is thrown, listing the missing families, the registered fonts, and suggested solutions.
- when this flag is **disabled**: the library silently substitutes another available font.

```csharp
// enabled by default
QuestPDF.Settings.ThrowOnMissingFontFamilies = true;
```

::: tip
Use `FontManager.GetRegisteredFonts()` to inspect the family names accepted by `TextStyle.FontFamily`.
Learn more in the [font management](/api-reference/text/font-management) section.
:::


## Missing text glyphs

Decides how the library reacts when text contains characters that are not present in the selected font nor in any of its fallbacks:
- when this flag is **enabled**: the `DocumentDrawingException` is thrown, identifying the missing glyphs and the fonts involved.
- when this flag is **disabled**: placeholder characters are visible in the produced PDF file. 

```csharp
// enabled by default
QuestPDF.Settings.ThrowOnMissingTextGlyphs = true;
```

::: info
Enabling this flag may slightly decrease document generation performance.
However, it provides hints that the used fonts are not sufficient to produce correct results.
:::
