# Font management

Fonts installed on the operating system vary between machines. 
A document that looks correct during development may fall back to a different typeface, display placeholder glyphs, or lose text entirely after deployment.

To keep rendering predictable across development machines, CI pipelines, containers, and cloud environments, QuestPDF ignores them by default and validates font availability during document generation.


## Library default font

To ensure successful document generation, QuestPDF uses and includes the `Lato` font version 2.015 by default.
It covers the Latin, Greek and Cyrillic scripts.
For other writing systems, please refer to the [covering additional languages](#covering-additional-languages) section.

::: tip
[Lato](https://www.latofonts.com) is a sanserif typeface family designed in the Summer 2010 by Warsaw-based designer Łukasz Dziedzic (“Lato” means “Summer” in Polish).

It is available under the [SIL Open Font License, Version 1.1](http://scripts.sil.org/OFL).

You can download it from the [Adobe Fonts website](https://fonts.adobe.com/fonts/lato).
:::


## Automatic local font registration

During application startup, QuestPDF automatically loads all font files present in the deployment directory (as specified by the `CopyToOutputDirectory` property in the `.csproj` file). 
This allows you to include them in your project without the need for manual registration.

If you prefer to specify the searched directories yourself, use the following approach:

```csharp
QuestPDF.Settings.FontDiscoveryPaths.Clear();

// adjust the path based on your project structure
QuestPDF.Settings.FontDiscoveryPaths.Add("resources/fonts"); 
```

Files that cannot be loaded are skipped.


## Manual font registration

You can manually register fonts using the `FontManager` class.
Please perform this operation only once, at application startup, before generating any documents.

```csharp
using QuestPDF.Drawing;

// from a file
FontManager.RegisterFontFromFile("Fonts/NotoEmoji-Regular.ttf");

// from all files available in a directory
FontManager.RegisterFontsFromDirectory("Fonts/Noto");

// from a stream
using var fontStream = File.OpenRead("Fonts/NotoEmoji-Regular.ttf");
FontManager.RegisterFontFromStream(fontStream);

// from binary data
var fontData = File.ReadAllBytes("Fonts/NotoEmoji-Regular.ttf");
FontManager.RegisterFontFromBinaryData(fontData);

// from an embedded resource
// ensure the file is located in the YourApplication project under Resources/Fonts
FontManager.RegisterFontFromEmbeddedResource("YourApplication.Resources.Fonts.NotoEmoji-Regular.ttf");
```

Family names and attributes are read directly from the registered files.
Use the name stored in the file to reference the font in your document:

```csharp
// at application startup
FontManager.RegisterFontFromFile("Fonts/LibreBarcode39-Regular.ttf");

// during document generation
container
    .Text("*QuestPDF*")
    .FontFamily("Libre Barcode 39") // the family name stored in the file
    .FontSize(64);
```

Matching is case-insensitive.
Both `FontFamily("lato")` and `FontFamily("LATO")` select `Lato`.


## Inspecting available fonts

To determine the names accepted by `TextStyle.FontFamily`, inspect what the library can reach:

```csharp
// bundled with the library, discovered automatically, or registered manually
foreach (var font in FontManager.GetRegisteredFonts())
    Console.WriteLine(font.FamilyName);

// installed in the operating system
foreach (var font in FontManager.GetSystemFonts())
    Console.WriteLine(font.FamilyName);
```

Both methods return `FontInfo` records describing the family name, the PostScript name, the weight, and flags indicating whether a font is italic or variable.


## System font registration

Fonts installed in the execution environment are not used by default.
In most cloud deployments, few or none are available, which may lead to unexpected results.

If your application runs in a controlled environment where the required fonts are guaranteed to be present, you can enable them with the following setting:

```csharp
// false by default
QuestPDF.Settings.UseSystemFonts = true;
```


## Covering additional languages

For scripts beyond Latin, Greek and Cyrillic, such as Chinese, Japanese, Korean, Arabic, Hebrew, Thai, or emoji, we recommend deploying the free and open-source [Google Noto](https://fonts.google.com/noto) family, registering it with the `FontManager` class, and configuring it as a fallback in the default text style of the document.

```csharp
// at application startup
FontManager.RegisterFontsFromDirectory("Fonts/Noto");
```

```csharp
// in the document
Document.Create(document => 
{
    document.Page(page => 
    {
        page.DefaultTextStyle(style => style.FontFamily("Lato", "Noto Sans", "Noto Sans CJK SC", "Noto Emoji"));
    });
});
```

Learn more in the [font fallback](/api-reference/text/text-style#font-fallback) section.


## Checking if all font families are available

When document content references a font family that is not available, QuestPDF throws the `DocumentDrawingException`.
It lists the missing families, the registered fonts, and suggested solutions, helping you catch incomplete deployments before a PDF reaches its recipient.

```csharp
// enabled by default
QuestPDF.Settings.ThrowOnMissingFontFamilies = true;
```

When disabled, the library silently substitutes another available font.


## Checking if all glyphs are available

Documents containing non-Latin characters or special symbols such as emojis may require glyphs that the selected font does not provide.
When none of the configured fallbacks provides them either, QuestPDF throws the `DocumentDrawingException`, identifying the missing glyphs and the fonts involved.

```csharp
// enabled by default
QuestPDF.Settings.ThrowOnMissingTextGlyphs = true;
```

When disabled, placeholder characters are visible in the produced PDF file.


## Removing the default Lato font

The bundled font is distributed as a single compressed archive: `QuestPDF.Fonts.Lato.br` on .NET 5 and newer, and `QuestPDF.Fonts.Lato.gz` on .NET Standard 2.0 and .NET Framework.

If you are using your own fonts and want to optimize your package size, you can safely remove it from the output.
To follow this approach, please add the following snippet to your `.csproj` file:

```xml{3-5,7-9}
<Project Sdk="Microsoft.NET.Sdk">

    <Target Name="QuestPDF_DoNotIncludeLatoFont_AfterBuild" AfterTargets="Build">
        <Delete Files="$(OutDir)QuestPDF.Fonts.Lato.br;$(OutDir)QuestPDF.Fonts.Lato.gz" />
    </Target>

    <Target Name="QuestPDF_DoNotIncludeLatoFont_AfterPublish" AfterTargets="Publish">
        <Delete Files="$(PublishDir)QuestPDF.Fonts.Lato.br;$(PublishDir)QuestPDF.Fonts.Lato.gz" />
    </Target>

</Project>

```

::: warning
Removing the archive leaves the library without any default font.
Please ensure that all families referenced by your documents are deployed and registered.
:::
