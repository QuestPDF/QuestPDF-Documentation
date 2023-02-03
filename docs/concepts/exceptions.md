# Exceptions

During the development process, you may encounter different issues associated with the PDF document rendering process.
It is important to understand the potential sources of such exceptions, their root causes and how to fix them properly.
In the QuestPDF library, exceptions have been divided into three groups as described below.

##  DocumentComposeException

This exception may occur during the document composition process (when you are using the fluent API to compose various elements to create the final layout). During this process you are interacting with report data, using conditions, loops and even additional methods. All these operations are a potential source of exceptions which have been grouped together in the `DocumentComposeException` type.

## DocumentDrawingException

This exception occurs during the document generation process (when the generation engine translates the elements tree into proper drawing commands). If you encounter such an exception, please contact us - it is most probably a bug that we want to fix for you! Additionally, if you are using custom components, all exceptions thrown there are going to bubble up as an `DocumentDrawingException` type.

## DocumentLayoutException

This exception may be extremely hard to fix because it happens for valid document trees which nevertheless enforce constraints that are impossible to meet. For example, when you try to draw a rectangle bigger than the available space on the page, the rendering engine is going to wrap the content in the hopes that on the next page there will be enough space. Generally, such wrapping behaviour happens routinely and works well. However, there are cases when it can lead to infinite wrapping. When a certain document length threshold is passed, the algorithm stops the rendering process and throws `DocumentLayoutException`. In such case, please revise your code and search for indivisible elements requiring too much space.

When you have a debugger attached, this exception provides an additional `ElementTrace` property showing which elements have been rendered when the exception was thrown. Please analyse the example below:

```csharp{2,8}
.Padding(10)
.Width(100)
.Background(Colors.Grey.Lighten3)
.DebugPointer("Example debug pointer")
.Column(x =>
{
    x.Item().Text("Test");
    x.Item().Width(150); // requires 150pt width where only 100pt is available
});
```

Below is the element trace returned by the exception. Nested elements (children) are indented. Sometimes you may find additional, library-specific elements.

Additional symbols are used to help you find the problem cause:
- 🌟 - represents special elements, e.g. page header/content/footer or the debug pointer element,
- 🔥 - represents an element that causes the layout exception. Follow the symbol deeper to find the root cause.

```
🔥 Page content 🌟
------------------
Available space: (Width: 500, Height: 360)
Requested space: PartialRender (Width: 120,00, Height: 20,00)

    🔥 Background
    -------------
    Available space: (Width: 500, Height: 360)
    Requested space: PartialRender (Width: 120,00, Height: 20,00)
    Color: #ffffff

        🔥 Padding
        ----------
        Available space: (Width: 500, Height: 360)
        Requested space: PartialRender (Width: 120,00, Height: 20,00)
        Top: 10
        Right: 10
        Bottom: 10
        Left: 10

            🔥 Constrained
            --------------
            Available space: (Width: 480, Height: 340)
            Requested space: PartialRender (Width: 100,00, Height: 0,00)
            Min Width: 100
            Max Width: 100
            Min Height: -
            Max Height: -

                🔥 Background
                -------------
                Available space: (Width: 100, Height: 340)
                Requested space: PartialRender (Width: 0,00, Height: 0,00)
                Color: #eeeeee

                    🔥 Example debug pointer 🌟
                    ---------------------------
                    Available space: (Width: 100, Height: 340)
                    Requested space: PartialRender (Width: 0,00, Height: 0,00)

                        🔥 Column
                        --------
                        Available space: (Width: 100, Height: 340)
                        Requested space: PartialRender (Width: 0,00, Height: 0,00)

                            🔥 Padding
                            ----------
                            Available space: (Width: 100, Height: 340)
                            Requested space: PartialRender (Width: 0,00, Height: 0,00)
                            Top: 0
                            Right: 0
                            Bottom: -0
                            Left: 0

                                🔥 BinaryColumn
                                --------------
                                Available space: (Width: 100, Height: 340)
                                Requested space: PartialRender (Width: 0,00, Height: 0,00)

                                    🔥 Constrained
                                    --------------
                                    Available space: (Width: 100, Height: 340)
                                    Requested space: Wrap
                                    Min Width: 150
                                    Max Width: 150
                                    Min Height: -
                                    Max Height: -
```
::: info
Remember, this trace is only available, when you have a debugger attached.
:::