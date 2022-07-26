# Platform specific dependencies

## Support for custom environments (cloud / linux)

The QuestPDF library has a dependency called SkiaSharp which is used to render the final PDF file. This library has additional dependencies when used in the Linux environment.

When you get the exception `Unable to load shared library 'libSkiaSharp' or one of its dependencies.`, please try to install additional nuget packages provided by the SkiaSharp team.

For example: the SkiaSharp.NativeAssets.Linux.NoDependencies nuget ensures that the libSkiaSharp.so file is published and available.

## Support for custom environments (Blazor WebAssembly)

The QuestPDF library has a dependency called SkiaSharp which is used to render the final PDF file.
QuestPDF works without problems in Blazor WebAssembly but you need to provide a suitable version of SkiaSharp on runtime.

**Note:** The tools used in this section are in a prerelease state, they should be used with caution.

First you need to install the WebAssembly tools, that will be used to compile the Skia dependencies to WebAssembly. In a command shell, execute

```
dotnet workload install wasm-tools
```

Then you will need to add the SkiaSharp.Views.Blazor Nuget package to your project. SkiaSharp is a crossplatform graphics library based on Skia.

```
dotnet add package –-prerelease SkiaSharp.Views.Blazor
```

Subsecuent builds can be slower as the toolchain now compiles Skia to WebAssembly.

Another thing to consider is that WebAssembly code runs on a secured sandbox and it can't access system fonts.
For this reason any PDF created with QuestPDF in Blazor WebAssembly will not embed the used fonts. The final font used for rendering will be determined by the PDF viewer.
However you can use a custom font as shown in the section **Accessing custom fonts**.