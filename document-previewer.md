# Document previewer

## Introduction

The QuestPDF Previewer is a tool that helps you quickly design documents. It uses the hot-reload technology to observe changes in your code and refresh document preview. 

::: warning
The hot-reload feature is available only in the .NET 6 environment and beyond.
:::

## Installation

The Previewer tool is available as a nuget tool. Therefore, it is installed on your local development environment and does not change your project.

📁 To install the QuestPDF Previewer, please execute the following command on your PC:

```csharp
dotnet tool install QuestPDF.Previewer --global
```

🚀 Optional: you can start an independent previewer application:

```
questpdf-preview

// specify HTTP port on which previewer will communicate (default is 12500)
questpdf-previewer 12345
```

🔁 To update the tool, please use:

```csharp
dotnet tool update questpdf.previewer --global
```

🗑️ And to remove:

```csharp
dotnet tool uninstall questpdf.previewer --global
```

### Changes in your code

To preview your document, you need to slightly modify your code.

```csharp{17-18}
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

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

![example](./images/previewer/visual-studio.png =444x)

### JetBrains Rider

Start your application without debugger attached. To apply code changes, click on the "Apply changes" button displayed on the top bar, or use the `Alt+F10` shortcut.

![example](./images/previewer/jetbrains-rider.png =570x)

### Terminal

Start your application using the following command:

```
dotnet watch
```

In this method, once you finish development, you may need to manually kill your application:

```
taskkill /FI "Modules eq YourApplicationName.dll"
```