# License configuration

## Introduction

QuestPDF is a modern open-source library.

We identify the importance of the QuestPDF library in your projects, and therefore want to ensure you can safely and confidently continue the development.

Being a healthy and growing community is the primary goal that motivates us to pursue professionalism.

::: warning
Before using code snippets in this documentation, please make sure you are eligible for the chosen license.

More details can be found on the [QuestPDF License and Pricing](/license/) page.
:::


## Code change

Please use the following code to configure the appropriate license.

You need to execute this code only once when the application starts, most likely in the `Program.cs` or the `Startup.cs` file.

```csharp
QuestPDF.Settings.License = LicenseType.Community;
```

```csharp
QuestPDF.Settings.License = LicenseType.Professional;
```

```csharp
QuestPDF.Settings.License = LicenseType.Enterprise;
```

::: tip
The library does not require any license key.
We trust our users, and therefore the process is simple.
:::
