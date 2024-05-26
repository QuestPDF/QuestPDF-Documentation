# Debug pointer

- This element is useful when finding the root cause of a DocumentLayoutException error. When generating target output (e.g. a PDF file), this element is ignored.
- `DebugPointer` does not alter a document's layout.

```c#{2}
.Width(100)
.DebugPointer("Example debug pointer")
.Width(150);
```

The code above throws an exception with the following element trace:

```c#{10-13}
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