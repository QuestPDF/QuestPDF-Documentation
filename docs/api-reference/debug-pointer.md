---
outline: false
---


# Debug pointer

Inserts a virtual debug element visible in the document hierarchy tree in the QuestPDF Companion App, as well as in the enhanced debugging message provided by the DocumentLayoutException.
It does not appear in the final PDF output.

<!--@include: tip-debugging.md--> 

::: tip
Learn more about the [DocumentLayoutException](/concepts/common-exceptions#documentlayoutexception).
:::


## Example

```c#{2-4}
container
    .Width(100)
    .DebugPointer("Product details section")
    .Width(150)
    .Column(column =>
    {
        column.Item().Text("Coffee Beans");
        column.Item().Text("$19.99");
    });
```

The code above throws an exception with the following element trace:

```c#{20}
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

-> Product details section



To learn more, please analyse the document measurement of the problematic location: 

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


   🟡 Column
   ==========
   Available Space: (Width: 0,000, Height: 0,000)
   Space Plan: PartialRender (Width: 0,000, Height: 0,000)
   ----------


      🟡 TextBlock
      =============
      Available Space: (Width: 0,000, Height: 0,000)
      Space Plan: PartialRender (Width: 0,000, Height: 0,000)
      -------------
      Alignment: Start
      Content Direction: LeftToRight
      Line Clamp: -
      Line Clamp Ellipsis: -
      Paragraph Spacing: 0
      Paragraph First Line Indentation: 0
      Text: Coffee Beans


      ⚪️ TextBlock
      =============
      Alignment: Start
      Content Direction: LeftToRight
      Line Clamp: -
      Line Clamp Ellipsis: -
      Paragraph Spacing: 0
      Paragraph First Line Indentation: 0
      Text: $19.99


Legend: 
🚨 - Element that is likely the root cause of the layout issue based on library heuristics and prediction. 
🔴 - Element that cannot be drawn due to the provided layout constraints. This element likely causes the layout issue, or one of its descendant children is responsible for the problem. 
🟡 - Element that can be partially drawn on the page and will also be rendered on the consecutive page. In more complex layouts, this element may also cause issues or contain a child that is the actual root cause.
🟢 - Element that is successfully and completely drawn on the page.
⚪️ - Element that has not been drawn on the faulty page. Its children are omitted.

```