# Font management

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

QuestPDF automatically loads all font files present in the deployment directory (as specified by the `CopyToOutputDirectory` property in the `.csproj` file).
This allows you to include font files in your project without the need for manual registration.

If you prefer to manually specify the directory for font discovery, use the following approach:

```csharp
// adjust the path based on your project structure
QuestPDF.Settings.FontDiscoveryPath = "resources/fonts";
```

Files that cannot be loaded are skipped.


## Manual font registration

You can manually register fonts using the `FontManager` class.
Please perform this operation only once, before generating any documents.

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
// ensure the file is marked with the EmbeddedResource build action
// and located in the YourApplication project under Resources/Fonts
FontManager.RegisterFontFromEmbeddedResource("YourApplication.Resources.Fonts.NotoEmoji-Regular.ttf");

// from an embedded resource located in another assembly
FontManager.RegisterFontFromEmbeddedResource(assembly, "OtherAssembly.Resources.Fonts.NotoEmoji-Regular.ttf");
```

Family names and attributes are read directly from the registered files.
Use that name to reference the font in your document:

```csharp
// at application startup
FontManager.RegisterFontFromFile("Fonts/LibreBarcode39-Regular.ttf");

// during document generation
container
    .Text("*QuestPDF*")
    .FontFamily("Libre Barcode 39") // the family name stored in the file
    .FontSize(64);
```


## Inspecting available fonts

To determine which fonts are available during PDF generation, inspect them with the following methods:

```csharp
// bundled with the library, discovered automatically, or registered manually
foreach (var font in FontManager.GetRegisteredFonts())
    Console.WriteLine(font.FamilyName);

// installed in the operating system
foreach (var font in FontManager.GetSystemFonts())
    Console.WriteLine(font.FamilyName);
```

Both methods return `FontInfo` records describing the family name, the PostScript name, the weight, and flags indicating whether a font is italic or variable.

`GetSystemFonts` inspects the operating system regardless of the `QuestPDF.Settings.UseSystemFonts` setting.
Its result is not cached, so the call may be slow.


## System font registration

System fonts are the font files installed in the operating system that hosts your application, rather than shipped with it.
Their availability differs between environments: a developer workstation typically offers hundreds, while a minimal container image may provide none at all.
A document relying on them can therefore render correctly during development and lose text after deployment.

For this reason, QuestPDF does not use system fonts by default, and we recommend deploying the required files with your application.

If your application runs in a controlled environment where the required fonts are guaranteed to be present, you can enable them with the following setting:

```csharp
// false by default
QuestPDF.Settings.UseSystemFonts = true;
```


## Covering additional languages

For scripts beyond Latin, Greek and Cyrillic, such as Chinese, Japanese, Korean, Arabic, Hebrew, Thai, or emoji, we recommend deploying the free and open-source [Google Noto](https://fonts.google.com/noto) family with your application, and configuring it as a fallback in the default text style of the document.

```csharp
Document.Create(document => 
{
    document.Page(page => 
    {
        page.DefaultTextStyle(style => style.FontFamily("Lato", "Noto Sans", "Noto Sans CJK SC", "Noto Emoji"));
    });
});
```

Learn more in the [font fallback](/api-reference/text/text-style#font-fallback) section.


## Missing font families

When document content references a font family that is not available, QuestPDF throws the `DocumentDrawingException`.
It lists the missing families, the registered fonts, and suggested solutions, helping you catch incomplete deployments before a PDF reaches its recipient.

```csharp
// enabled by default
QuestPDF.Settings.ThrowOnMissingFontFamilies = true;
```


## Missing text glyphs

A font covers only a subset of the Unicode range, so text containing non-Latin characters or special symbols such as emojis may use codepoints that the selected font cannot render.
When neither the font nor any of its fallbacks provides the codepoint, QuestPDF throws the `DocumentDrawingException`, identifying the missing glyphs and the fonts involved.

```csharp
// enabled by default
QuestPDF.Settings.ThrowOnMissingTextGlyphs = true;
```

When this setting is disabled and a glyph is not available in the font family or any of its fallbacks, placeholder characters are visible in the produced PDF file.


## Removing the default Lato font

The bundled font is distributed as a single compressed archive: `QuestPDF.Fonts.Lato.br` on .NET 5 and newer, and `QuestPDF.Fonts.Lato.gz` on .NET Standard 2.0 and .NET Framework.

If you are using your own fonts and want to optimize your package size, you can safely remove it from the output.
To follow this approach, please add the following snippet to your `.csproj` file:

```xml{3-7}
<Project Sdk="Microsoft.NET.Sdk">

    <Target Name="QuestPDF_DoNotIncludeLatoFont" BeforeTargets="AssignTargetPaths">
        <ItemGroup>
            <None Remove="@(None->WithMetadataValue('Filename','QuestPDF.Fonts.Lato'))" />
        </ItemGroup>
    </Target>

</Project>
```

The item must be removed inside a target, because the library adds it after the project body is evaluated.
