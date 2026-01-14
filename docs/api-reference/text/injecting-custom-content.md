# Injecting custom content

It is possible to inject custom content into the document, e.g. images.

::: warning
The element must fit within one line and cannot span multiple pages.
:::


## Image

The most common use-case is to inject images into the text.

```c#{4,7}
.Text(text =>
{
    text.Span("A unit test can either ");
    text.Element().PaddingBottom(-4).Height(24).Image("unit-test-completed-icon.png");
    text.Span(" pass").FontColor(Colors.Green.Medium);
    text.Span(" or ");
    text.Element().PaddingBottom(-4).Height(24).Image("unit-test-failed-icon.png");
    text.Span(" fail").FontColor(Colors.Red.Medium);
    text.Span(".");
});
```

![example](/api-reference/text-inject-image.webp)


## SVG

Another common use-case is to inject SVG icons into the text.

```c#{4}
.Text(text =>
{
    text.Span("To synchronize your email inbox, please click the ");
    text.Element().PaddingBottom(-4).Height(24).Svg("mail-synchronize-icon.svg");
    text.Span(" icon.");
});
```

![example](/api-reference/text-inject-svg.webp)


## Position

The injected element can be positioned in relation to the text baseline or font edges.

| **Enum Value**    | **Description**                                                                                                                                                                  |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **AboveBaseline** | Aligns the bottom edge of the injected element with the text baseline. The injected element sits on top of the baseline.                                                         |
| **BelowBaseline** | Aligns the top edge of the injected element with the text baseline. The injected element hangs below the baseline.                                                               |
| **Top**           | Aligns the top edge of the injected element with the top edge of the font. If the injected element is very tall, the extra space will hang from the top and extend downward.     |
| **Bottom**        | Aligns the bottom edge of the injected element with the top edge of the font. If the injected element is very tall, the extra space will rise from the bottom and extend upward. |
| **Middle**        | Aligns the middle of the injected element with the middle of the text. If the injected element is very tall, the extra space will grow equally from the top and bottom.          |

#### Example:

```c#{5,11}
.Text(text =>
{
    text.Span("This ");

    text.Element(TextInjectedElementAlignment.AboveBaseline)
        .Width(12).Height(12)
        .Background(Colors.Green.Medium);

    text.Span(" element is positioned above the baseline, while this ");

    text.Element(TextInjectedElementAlignment.BelowBaseline)
        .Width(12).Height(12)
        .Background(Colors.Blue.Medium);

    text.Span(" element is positioned below the baseline.");
});
```

![example](/api-reference/text-inject-position.webp)
