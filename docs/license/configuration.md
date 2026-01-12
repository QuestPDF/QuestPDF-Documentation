# License configuration

QuestPDF uses a hybrid license, which is a model that benefits everyone.
Commercial licenses provide businesses with legal safety and long-term stability, while funding a feature-complete, unrestricted library for the open-source community.

::: tip
The library is free for individuals, non-profits, all FOSS projects, and organizations under $1M in annual revenue.

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
