# License configuration

## Introduction

QuestPDF is a modern open-source library.

We identify the importance of the library in your projects and therefore want to make sure you can safely and confidently continue the development.

Being a healthy and growing community is the primary goal that motivates us to pursue professionalism.


## Community MIT License

We love and highly appreciate the .NET Community, and therefore the vast majority of users are welcome to use the library completely for free under the QuestPDF Community MIT license.

::: warning
Before using the code snippet below, please make sure you are eligible for the QuestPDF Community MIT License.

More details can be found on [the QuestPDF License and Pricing](https://www.questpdf.com/pricing.html#license) page.
:::

Please use the following code to configure the library for the Community MIT License.
You need to execute this code only once when the application starts, most likely in the `Program.cs` or the `Startup.cs` file.

```csharp
QuestPDF.Settings.License = LicenseType.Community;
```


## Professional and Enterprise Licenses

If you are consuming the QuestPDF library as a Direct Package Dependency for usage in a Closed Source software in the capacity of a for-profit company/individual with more than 1M USD annual gross revenue, you must purchase the QuestPDF Professional or Enterprise License, depending on the number of software developers.

::: tip
The library does not require any license key.
We trust our users, and therefore the process is simple.
:::

::: warning
Before setting up this license configuration, please make sure you have purchased the license.

More details can be found on [the QuestPDF License and Pricing](https://www.questpdf.com/pricing.html#tiers) page.
:::

Please use the following code to configure the library for the Professional or Enterprise License. 
You need to execute this code only once when the application starts, most likely in the `Program.cs` or the `Startup.cs` file.

```csharp
QuestPDF.Settings.License = LicenseType.Professional;
// or
QuestPDF.Settings.License = LicenseType.Enterprise;
```
