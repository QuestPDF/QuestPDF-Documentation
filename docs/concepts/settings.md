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


## Debugging

This flag generates additional document elements to improve layout debugging experience.

When the provided content contains size constraints impossible to meet, the library generates an enhanced exception message with additional location and layout measurement details.

```csharp
// by default, enabled only when debugger is attached
QuestPDF.Settings.EnableDebugging = false;
```


## Checking Font Glyph Availability

This flag enables checking the font glyph availability. 
If your text contains glyphs that are not present in the specified font:
- when this flag is **enabled**: the `DocumentDrawingException` is thrown.
- when this flag is **disabled**: placeholder characters are visible in the produced PDF file. 

::: info
Enabling this flag may slightly decrease document generation performance.
However, it provides hints that used fonts are not sufficient to produce correct results.
:::

```csharp
// by default, enabled only when debugger is attached
QuestPDF.Settings.CheckIfAllTextGlyphsAreAvailable = false;
```


## Using System Fonts

Decides whether the application should use the fonts available in the environment:
- when this flag is **enabled**: the application will use the fonts installed on the system where it is running. This is the default behavior.
- when this flag is **disabled**: the application will only use the fonts that have been registered using the `FontManager` class in the QuestPDF library.

This property is useful when you want to control the fonts used by your application, especially in cases where the environment might not have the necessary fonts installed.

```csharp
// enabled by default
QuestPDF.Settings.UseEnvironmentFonts = true;
```


## Font Discovery Paths

Specifies the collection of paths where the library will automatically search for font files to register.

By default, this collection contains the application files path.
You can add additional paths to this collection to include more directories for automatic font registration.

```csharp
QuestPDF.Settings.FontDiscoveryPaths.Add("/custom/font/directory");
```
