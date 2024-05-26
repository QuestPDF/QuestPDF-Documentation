# Document previewer

## Introduction

The QuestPDF Previewer is a tool designed to simplify and speed up your development lifecycle. First, it shows a preview of your document. But the real magic starts with the hot-reload capability! It observes your code and updates the preview every time you change the implementation. Get real-time results without the need of code recompilation. Save time and enjoy the task!

<video width="100%" controls autoplay loop>
  <source src="/previewer/video.mp4" type="video/mp4">
</video>

::: warning
The hot-reload feature is available only in the .NET 6 environment and beyond.
:::

## Installation

The Previewer tool is available as a NuGet tool. Therefore, it is installed on your local development environment and does not change your project.

📁 To install the QuestPDF Previewer, please execute the following command on your PC:

```c#
dotnet tool install QuestPDF.Previewer --global
```

🚀 Optional: you can start an independent previewer application:

```
questpdf-previewer

// specify HTTP port on which previewer will communicate (default is 12500)
questpdf-previewer 12345
```

🔁 To update the tool, please use:

```c#
dotnet tool update questpdf.previewer --global
```

🗑️ And to remove:

```c#
dotnet tool uninstall questpdf.previewer --global
```

### Changes in your code

To preview your document, you need to slightly modify your code.

```c#{17-18}
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using QuestPDF.Previewer;

// code in your main method
var document = Document.Create(container =>
{
    container.Page(page =>
    {
        // page content
    });
});

// instead of the standard way of generating a PDF file
document.GeneratePdf("hello.pdf");

// use the following invocation
document.ShowInPreviewer();

// optionally, you can specify an HTTP port to communicate with the previewer host (default is 12500)
document.ShowInPreviewer(12345);
```

## How to use hot-reload

### Visual Studio

Start your application in the DEBUG mode with the 'Hot Reload on Save' flag enabled. On every file save, the document will be refreshed.

![example](/previewer/visual-studio.png =444x)

### JetBrains Rider

Start your application without debugger attached. To apply code changes, click on the "Apply changes" button displayed on the top bar, or use the `Alt+F10` shortcut.

![example](/previewer/jetbrains-rider.png =570x)

### Terminal

Start your application using the following command:

```
dotnet watch
```
