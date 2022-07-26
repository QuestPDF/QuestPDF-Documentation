# Quality assurance

Thanks to the architecture of the library, it is easy to choose a proper testing approach. Even the most complex documents have layout that consists of thousands of simple elements. It is possible to test the implementation on the several stages:

## Element-specific testing

In this approach, unit tests are checking if the given element (e.g. Padding, Border) is behaving correctly and is meeting design requirements. That means, if the element applies correct layout rules, performs expected canvas operations and properly interacts with its children. What is important, each element is tested in separation, in the isolated environment. This is possible because there are no intra-element dependencies or couplings.

To make this type of testing easier, a special testing environment was created. In this environment, each element is tested in separation by injecting mock children. This way, it is possible to check all income and outcome operations performed by the element. During the measuring step:

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

...and the drawing step:

```csharp
[Test]
public void Measure_FitArea_ToWidth()
{
    TestPlan
        .For(x => new AspectRatio
        {
            Child = x.CreateChild(),
            Option = AspectRatioOption.FitArea,
            Ratio = 2f
        })
        .MeasureElement(new Size(400, 300))
        .ExpectChildMeasure(new Size(400, 200), new FullRender(100, 50))
        .CheckMeasureResult(new FullRender(400, 200));
}
```


## Composition testing

This testing approach is accomplished by preparing various examples for the documentation. In such a case, each example contains a very simple layout, though still containing multiple elements. This way, it is possible to visually validate the output image to the simple-to-understand and concise code.

Additionally, some library components are in fact a combination of simpler elements. For example, the Grid element does not contain its layout implementation. It uses the Stack and Row elements to compose more sophisticated structures. For such cases, it is enough to test if the generated structure is the same.

## Document testing

By generating complex documents with deep element's hierarchy, it is possible to check implementation stability and cross-element interactions. Having documents that are semi-randomized, increases the chance of stopping corner cases. It is also the best approach to analyze implementation performance and track it over time.
