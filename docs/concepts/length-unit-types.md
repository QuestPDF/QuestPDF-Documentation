---
outline: false
---


# Length unit types

Following the PDF specification, QuestPDF uses points as its default measurement unit. 
Most Fluent API methods accept an optional unit parameter for specifying alternative measurement units.


## Available units

| Unit                | Size             |
|---------------------|------------------|
| Unit.**Point**      | 1/72 inch        |
| Unit.**Inch**       | 72 points        |
| Unit.**Feet**       | 12 inches        |
| Unit.**Mil**        | 1/1000 inch      |
| Unit.**Meter**      | 100 centimeters  |
| Unit.**Centimetre** | 10 millimeters   |
| Unit.**Millimetre** | 1/1000 meter     |

Note the British spelling of the metric values: `Unit.Centimetre` and `Unit.Millimetre`.


## Example

Unit types can be optionally specified in most of length-related API methods.
As an example, the following code snippets are equivalent:

```csharp
using QuestPDF.Infrastructure;

.Padding(72)
.Padding(1, Unit.Inch)
.Padding(1/12f, Unit.Feet)
.Padding(1000, Unit.Mil)
```