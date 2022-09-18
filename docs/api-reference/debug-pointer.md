# Debug pointer

- This element is useful when finding the root cause of the DocumentLayoutException. When generating target output (e.g. PDF file), this element is ignored.
- It does not alter document's layout.

```csharp{2}
.Width(100)
.DebugPointer("Example debug pointer")
.Width(150);
```

The code above will throw the exception with the following element trace:

```csharp{10-13}
🔥 Constrained
--------------
Available space: (Width: 500, Height: 360)
Requested space: Wrap
Min Width: 100
Max Width: 100
Min Height: -
Max Height: -

    🔥 Example debug pointer 🌟
    ---------------------------
    Available space: (Width: 100, Height: 360)
    Requested space: Wrap

        🔥 Constrained
        --------------
        Available space: (Width: 100, Height: 360)
        Requested space: Wrap
        Min Width: 150
        Max Width: 150
        Min Height: -
        Max Height: -

```