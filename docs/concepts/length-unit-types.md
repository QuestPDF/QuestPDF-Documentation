# Length unit types

QuestPDF uses points as default measure unit. Where 1 inch equals to 72 points, according to PDF specification. However, the vast majority of the Fluent API supports additional/optional argument to specify unit type.

| Unit       | Size                 |
|------------|----------------------|
| meter      | 100 centimeters      |
| centimetre | 2.54 inches          |
| millimetre | 1/10th of centimeter |
| feet       | 12 inches            |
| inch       | 72 points            |
| mill       | 1/1000th of inch     |

Example usage:

```csharp
// all invocations are equal
.Padding(72)
.Padding(1, Unit.Inch)
.Padding(1/12f, Unit.Feet)
.Padding(1000, Unit.Mill)

// unit types can be provided in other API methods too, e.g.
.BorderLeft(100, Unit.Mill)
row.ConstantItem(8, Unit.Centimetre)
```