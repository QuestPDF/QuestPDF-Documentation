# Introduction

QuestPDF is an open-source .NET library for PDF documents generation.

It offers a layout engine designed with a full paging support in mind. The document consists of many simple elements (e.g. border, background, image, text, padding, table, grid etc.) that are composed together to create more complex structures. This way, as a developer, you can understand the behavior of every element and use them with full confidence. Additionally, the document and all its elements support paging functionality. For example, an element can be moved to the next page (if there is not enough space) or even be split between pages like table's rows.

Unlike other libraries, it does not rely on the HTML-to-PDF conversion which in many cases is not reliable. Instead, it implements its own layouting engine that is optimized to cover all paging-related requirements.

:::info
Many QuestPDF features are built upon the [Skia](https://github.com/google/skia) library, which is available under the BSD-3-Clause license.
We extend our thanks to the Skia authors for their contributions to the open-source community.
:::
