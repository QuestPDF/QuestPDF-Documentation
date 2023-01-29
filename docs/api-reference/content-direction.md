# Content Direction

## Introduction

Most languages (such as English, German, Polish, etc.) are written left-to-right. However, there are languages (e.g. Arabic) that use a right-to-left script.

The right-to-left content direction significantly changes how the layout is planned:

1) Text position (aligned to the right).
2) Text direction where text starts on the right side and ends on the left side.
3) Text word-wrapping algorithm that needs to take into account the direction of text when breaking a line.
4) Order of elements in collections, e.g. the first item in a row should be placed first on the right (in RTL) or to first on the left (in LTR).
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

The RTL mode is supported for all elements. The following examples show how this mode affects the rendering process. In the `Row` element, the elements are displayed in accordance with the content direction. For example, the first element is placed first on the left (in LTR mode) or first on the right (in RTL) mode:

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


A similar situation exists when using the `Table` element as shown below:

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

It is important to note that content direction does *not* affect element alignment:

![example](/api-reference/content-direction-inlined.png =585x)
