# Companion App

## Introduction

The QuestPDF Companion application is a tool designed to simplify and speed up your development lifecycle.
First, it shows a preview of your document. But the real magic starts with the hot-reload capability! 
It observes your code and updates the preview every time you change the implementation. 
Get real-time results without the need of code recompilation. Save time and enjoy the task!

![Application screenshot](/companion/application-light.png =1762x){.companion-screenshot .light-only}
![Application screenshot](/companion/application-dark.png =1762x){.companion-screenshot .dark-only}

:::info
Read more about features availble in the Companion App in the [Features](/companion/features) section.
:::


## Installation

The Companion App is available for download on Windows, MacOS, and Linux. 

| Operating System                   | Download link                                                                                                         |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| Windows                            | [Download](https://github.com/QuestPDF/QuestPDF/releases/download/2024.10.0-rc4/QuestPDF.Companion.2024.10.4.exe)     |
| MacOS (64-bit Intel and Apple ARM) | [Download](https://github.com/QuestPDF/QuestPDF/releases/download/2024.10.0-rc4/QuestPDF.Companion.2024.10.4.app.zip) |
| Linux                              | [Download](https://github.com/QuestPDF/QuestPDF/releases/download/2024.10.0-rc4/QuestPDF.Companion.2024.10.4.deb)     |

:::info
To access older versions of the Companion App, visit the [Download](/companion/download) section.
:::


## Changes in your code

To preview your document, you need to slightly modify your code.

```c#{19,22}
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
document.ShowInCompanion();

// optionally, you can specify an HTTP port to communicate with the previewer host (default is 12500)
document.ShowInCompanion(12345);
```

:::warning
The QuestPDF Companion integration requires the library version **2024.10** or newer.

If you cannot update, please use the legacy [QuestPDF Previewer application](/document-previewer.html).
:::


## How to use hot-reload

### Visual Studio

Start your application in the DEBUG mode with the 'Hot Reload on Save' flag enabled. On every file save, the document will be refreshed.

![example](/companion/hot-reload-visual-studio.png =444x)

### JetBrains Rider

Start your application without debugger attached. To apply code changes, click on the `Apply changes` button displayed on the top bar, or use the `Alt+F10` shortcut.

![example](/companion/hot-reload-jetbrains-rider.png =570x)

### Terminal

Start your application using the following command:

```shell
dotnet watch
dotnet watch --project YourSampleProject
```

For unit tests:

```shell
dotnet watch --project YourProjectWithTests test --filter "YourClassWithTests.TestMethodName"
```
