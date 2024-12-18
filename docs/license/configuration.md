# License configuration

QuestPDF is an open-source library committed to long-term sustainability and continuous improvement.

By offering free access to most users and premium licenses for larger organizations, the project maintains its commitment to excellence while ensuring sustainable, long-term development for all.

::: warning
The library is free to use for any individual or business with less than 1 million USD annual gross revenue, or operates as a non-profit organization, or is a FOSS project.

More details can be found on the [QuestPDF License and Pricing page](/license/).
:::

## Software Activation

We trust our users and clients. Therefore, the software does not require any license key. 
Instead, you can select and configure the appropriate license in your code. 
Please put one of the following lines at the startup of your application:

```c#
QuestPDF.Settings.License = LicenseType.Community;
// or
QuestPDF.Settings.License = LicenseType.Professional;
// or
QuestPDF.Settings.License = LicenseType.Enterprise;
```

The library does not perform any network calls, does not send any data to external servers, and does not collect any personal information. 
All computations are performed locally on your machine.

::: tip
Please ensure that you are eligible for the chosen license before using it in your project.

By choosing the right license, you help ensure that our project remains transparent, sustainable, and continuously improving for everyone.

Thank you for supporting QuestPDF! ❤️
:::
