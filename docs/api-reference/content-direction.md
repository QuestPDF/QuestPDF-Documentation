# Content Direction

## Introduction

Most languages (such as English, German, Polish, etc.) are using the left-to-right content direction. However, there are languages (e.g. Arabic) that use the right-to-left content direction.

The right-to-left content direction significantly changes how the layout is planned:
1) Text position (aligned to the right).
2) Text direction where text starts on the right side and ends on the left side.
3) Text word-wrapping algorithm that needs to take into account direction of text when breaking a line.
4) Order of elements in collections, e.g. the first item in a row should be placed most to the right (in RTL) or to the left (int LTR).
5) Default content position (aligned to the right).

## API

You can set content direction using the following API:

```csharp
.ContentFromLeftToRight() // default
.ContentFromRightToLeft()
```

It is possible to set the target direction for all descendants:

```csharp
.ContentFromRightToLeft()
.Column(column => 
{
    // this content uses inherited right-to-left content direction
    column.Item() // ... content
        
    // this item overrides the content direction to right-to-left    
    column.Item().ContentFromLeftToRight() // ... content     
});
```

## Examples

The RTL mode is supported in all available elements. Let's quickly analyse a couple of examples to learn on how this mode infers the rendering process. In the `Row` element, the elements are displayed in accordance to the content direction. For example, the first element is put most to the left (in LTR mode) or most to the right (int RTL) mode:

```csharp
.ContentFromRightToLeft() // LTR or RTL mode
.Row(row =>
{
    row.Spacing(5);
    
    row.AutoItem().Height(50).Width(50).Background(Colors.Red.Lighten1);
    row.AutoItem().Height(50).Width(50).Background(Colors.Green.Lighten1);
    row.AutoItem().Height(50).Width(75).Background(Colors.Blue.Lighten1);
});
```

![example](/api-reference/content-direction-row.png =585x)


Similar situation is visible, when using the `Table` element:

```csharp
.ContentFromRightToLeft() // LTR or RTL mode
.Table(table =>
{
    table.ColumnsDefinition(columns =>
    {
        columns.RelativeColumn();
        columns.RelativeColumn();
        columns.RelativeColumn();
    });
    
    table.Cell().Height(50).Background(Colors.Red.Lighten1);
    table.Cell().Height(50).Background(Colors.Green.Lighten1);
    table.Cell().Height(50).Background(Colors.Blue.Lighten1);
    table.Cell().ColumnSpan(2).Height(50).Background(Colors.Orange.Lighten1);
});
```

![example](/api-reference/content-direction-table.png =585x)

It is important to notice that content direction does NOT impact element alignment:

![example](/api-reference/content-direction-inlined.png =585x)
