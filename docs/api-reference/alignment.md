# Alignment

- This container is used for positioning its child along X and Y axes.
- Use multiple invocations to align for X and Y axis independently.
- By default, it takes only the required space. Therefore, it is sometimes used after the `Extend` component.

```csharp
// horizontal alignment
.AlignLeft()
.AlignCenter()
.AlignRight()

// vertical alignment
.AlignTop()
.AlignMiddle()
.AlignBottom()
```