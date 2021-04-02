# Quality assurance

## Context

As the library slowly matures, I am planning to spend more and more time on tests and stability fixes. The library is already stable and successfully covers the vast majority of cases. However, while adding new features, I want to be confident about existing functionalities.

The biggest strength of this library is its simplicity and composability. Complicated layouts are achieved by using many simple elements, therefore implemented layouting algorithm are simple as well. The most complex elements have around 100 lines of code, so the risk of issues is relatively low.

In the first stages of development, I have been working on features by creating a sample report that uses some complex layouts. The more corner cases I want to cover, the harder it is to prepare real examples. This is the reason for the planned unit testing effort.

## Behavioral testing

I have been working on a custom test environment that focuses on element behavioral testing. Via abstracting away the canvas drawing logic into the separate and injectable interface, it is possible to test each call with great precision, not only noticing if the call was performed but also take into account the order of calls.

This approach allows creating small and simple environments where the tested element is injected, then simulate different calls and check if the element's behavior is correct, where the behaviour consists of both canvas drawing operations as well as any communication with its children.

Please take a look at the example test case:

```csharp
[Test]
public void Measure_FitArea_ToHeight()
{
    TestPlan
        .For(x => new AspectRatio
        {
            Child = x.CreateChild(),
            Option = AspectRatioOption.FitArea,
            Ratio = 2f
        })
        .MeasureElement(new Size(500, 200))
        .ExpectChildMeasure(new Size(400, 200), new FullRender(100, 50))
        .CheckMeasureResult(new FullRender(400, 200));
}
```

## Progress

Below you can find the rough estimation of the progress:

- [X] Alignment
- [X] Aspect Ratio
- [X] Background
- [X] Border
- [X] Constrained
- [X] Dynamic Image
- [ ] Extend
- [ ] External Link
- [X] Image
- [ ] Internal Link / Internal Location
- [X] Padding
- [ ] Page
- [ ] Page Break
- [ ] Page Number
- [ ] Row
- [ ] Section
- [ ] Show Once (needs revision)
- [ ] Stack (needs revision)
- [ ] Text
