# Length unit types

QuestPDF uses points as default measure unit. Where 1 inch equals to 72 points, according to PDF specification. However, the vast majority of the Fluent API supports additional/optional argument to specify unit type.

| Unit       | Size             |
|------------|------------------|
| meter      | 100 centimeters  |
| inch       | 2.54 centimeters |
| centimeter | 10 millimeters   |
| feet       | 12 inches        |
| inch       | 1000 mils        |
| inch       | 72 points        |

Example usage:

```c#
// all invocations are equal
.Padding(72)
.Padding(1, Unit.Inch)
.Padding(1/12f, Unit.Feet)
.Padding(1000, Unit.Mill)

// unit types can be provided in other API methods too, e.g.
.BorderLeft(100, Unit.Mill)
row.ConstantItem(8, Unit.Centimetre)
```