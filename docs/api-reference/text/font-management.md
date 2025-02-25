# Font management

## Library default font

To ensure successful document generation, QuestPDF uses and includes the `Lato` font version 2.015 by default.

::: tip
[Lato](https://www.latofonts.com) is a sanserif typeface family designed in the Summer 2010 by Warsaw-based designer Łukasz Dziedzic (“Lato” means “Summer” in Polish).

It is available under the [SIL Open Font License, Version 1.1](http://scripts.sil.org/OFL).

You can download it from the [Adobe Fonts website](https://fonts.adobe.com/fonts/lato).
:::


## System font registration

By default, QuestPDF loads all fonts available in the execution environment. 
This simplifies the development process, as your code can easily access all system fonts.

However, in most cloud deployments, few or no fonts are available, which may lead to unexpected results. 
To avoid this, you can disable environment font loading using the following setting:

```c#
// true by default
QuestPDF.Settings.UseEnvironmentFonts = false;
```


## Automatic local font registration

During application startup, QuestPDF automatically loads all font files present in the deployment directory (as specified by the `CopyToOutputDirectory` property in the `.csproj` file). 
This allows you to include font files in your project without the need for manual registration.

If you prefer to manually specify directories for font discovery, use the following approach:

```c#
QuestPDF.Settings.FontDiscoveryPaths.Clear();

// adjust the path based on your project structure
QuestPDF.Settings.FontDiscoveryPaths.Add("resources/fonts"); 
```


## Manual font registration

You can manually register custom fonts using the `FontManager` class.
Please perform this operation only once, during application startup or initialization.

```c#
using QuestPDF.Drawing;

// register font from a file
using var fontStream = File.OpenRead("NotoEmoji-Regular.ttf");
FontManager.RegisterFont(fontStream);

// register font from an embedded resource
// ensure the file is located in the YourApplication project under Resources/Fonts
FontManager.RegisterFontFromEmbeddedResource("YourApplication.Resources.Fonts.NotoEmoji-Regular.ttf");
```

You can also register fonts under custom names to simplify usage within your documents:

```c#
// load the font at startup
using var fontStream = File.OpenRead("LibreBarcode39-Regular.ttf");
FontManager.RegisterFontWithCustomName("MyBarcodeFont", fontStream);

// use it during document generation
container
    .Text("*QuestPDF*")
    .FontFamily("MyBarcodeFont") // use your custom font name
    .FontSize(64);
```


## Checking if all glyphs are available

If your document contains non-Latin characters or special symbols such as emojis, you may want to verify that all required glyphs are available in the selected font.
If glyphs are missing in both the primary font and all registered fallback fonts, they will be replaced with placeholder characters.

To detect such issues, enable the following setting:

```c#
// enabled by default only when the debugger is attached
QuestPDF.Settings.CheckIfAllTextGlyphsAreAvailable = true;
```

When enabled, the library will throw an exception if any glyphs are missing from the selected font.


## Removing the default Lato font

QuestPDF includes the Lato font by default to ensure a seamless experience when generating PDFs. 
However, if you are using your own fonts and want to optimize your package size, you can safely remove Lato from the output.

To follow this approach, please add the following snippet to your `.csproj` file:

```xml{3-5,7-9}
<Project Sdk="Microsoft.NET.Sdk">

    <Target Name="QuestPDF_DoNotIncludeLatoFont_AfterBuild" AfterTargets="Build">
        <RemoveDir Directories="$(OutDir)/LatoFont" />
    </Target>

    <Target Name="QuestPDF_DoNotIncludeLatoFont_AfterPublish" AfterTargets="Publish">
        <RemoveDir Directories="$(PublishDir)/LatoFont" />
    </Target>

</Project>

```
