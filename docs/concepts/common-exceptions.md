---
outline: false
---


# Exceptions

While developing with QuestPDF, you might encounter issues during the PDF rendering process. 
Understanding the potential sources of these exceptions, their root causes, and the appropriate fixes is crucial. 
QuestPDF categorizes exceptions into three distinct groups:

<!--@include: ../api-reference/tip-debugging.md--> 


##  DocumentComposeException

This exception arises during the document composition phase, where you use the Fluent API to assemble various elements and create the final layout. 
Common tasks in this phase include working with your input data, applying conditions, iterating through loops, and calling additional methods.

#### Possible Causes:
- Invalid or unexpected data being processed.
- Incorrect or incomplete API usage.
- Errors in custom logic such as conditions or loops.

#### Resolution:
- Review the stack trace to identify the problematic code.
- Validate input data before composing the document.
- Debug your composition logic for potential issues in method calls or API interactions.


## DocumentDrawingException

This exception occurs during the document generation phase, when the rendering engine converts the layout tree into drawing commands. 

#### Possible Causes:
- Document content references a font family that is not available. The exception lists the missing families, the registered fonts, and suggested solutions.
- Text contains glyphs that none of the available fonts can render. The exception identifies the missing glyphs and the fonts involved.
- Errors thrown inside [Dynamic Components](/concepts/code-patterns/dynamic-components), which bubble up as this type of exception.
- Internal issues within the rendering engine.

#### Resolution:
- Deploy the required font files with your application and register them, as described in the [font management](/api-reference/text/font-management) section.
- Configure a font fallback that covers all scripts and symbols used in your document.
- Review the implementation of your dynamic components.

::: info
If none of the above applies, this exception could indicate a bug in the QuestPDF library.
:::


## DocumentLayoutException

This exception can be challenging to resolve as it occurs with valid document trees that impose constraints impossible to satisfy. 

For instance, attempting to draw a rectangle larger than the available page space triggers the rendering engine to wrap the content, hoping sufficient space will be available on the next page.


### Enhanced Debugging Context

The library provides additional information to help you diagnose and resolve layout issues.
This behavior is controlled by the `QuestPDF.Settings.EnableDetailedLayoutErrors` setting, which is enabled by default.


### Example

The code below contains conflicting size constraints.

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

And generates the following exception: 

```
The provided document content contains conflicting size constraints. For example, some elements may require more space than is available. 

The layout issue is likely present in the following part of the document: 

-> Document

-> Page

-> Page

-> Content

-> Content

-> In method:   content
   Called from: Render
   Source path: /Users/marcinziabek/RiderProjects/QuestPDF/Source/QuestPDF.Examples/Engine/RenderingTest.cs
   Line number: 100

-> Example debug pointer



To learn more, please analyse the document measurement of the problematic location: 

🔴 Column
==========
Available Space: (Width: 100,000, Height: 340,000)
Space Plan: Wrap
Wrap Reason: The available space is not sufficient for even partially rendering a single item.
----------


   ⚪️ TextBlock
   =============
   Alignment: Start
   Content Direction: LeftToRight
   Line Clamp: -
   Line Clamp Ellipsis: -
   Paragraph Spacing: 0
   Paragraph First Line Indentation: 0
   Text: Test


   🚨 Constrained 🚨
   ==================
   Available Space: (Width: 100,000, Height: 340,000)
   Space Plan: Wrap
   Wrap Reason: The available horizontal space is less than the minimum width.
   ------------------
   Content Direction: LeftToRight
   Min Width: 150
   Max Width: 150
   Min Height: -
   Max Height: -
   Enforce Size When Empty: False


      🟢 Empty
      =========
      Available Space: (Width: 0,000, Height: 0,000)
      Space Plan: FullRender (Width: 0,000, Height: 0,000)
      ---------


Legend: 
🚨 - Element that is likely the root cause of the layout issue based on library heuristics and prediction. 
🔴 - Element that cannot be drawn due to the provided layout constraints. This element likely causes the layout issue, or one of its descendant children is responsible for the problem. 
🟡 - Element that can be partially drawn on the page and will also be rendered on the consecutive page. In more complex layouts, this element may also cause issues or contain a child that is the actual root cause.
🟢 - Element that is successfully and completely drawn on the page.
⚪️ - Element that has not been drawn on the faulty page. Its children are omitted.
```
