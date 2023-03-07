# Components

A component is a special type of element that can generate content depending on its state. This approach is really common in many web-development libraries and solves multiple issues. You should consider creating your own component when part of your document will be reused in other documents. Another good application of components is when you plan to repeat a complex section. In this case, you could implement a component that takes input via the constructor parameters, and generates PDF content. Such a component can readily be used in a for loop, for example. All things considered, components are a useful tool to organize and reuse your code.

::: tip
Components offer a lot of flexibility and extendability. Because of that, the QuestPDF library will receive several important updates to enhance components features even more. Stay tuned for slots!
:::

In this tutorial, we will create a simple component to generate a random image from the fantastic webpage called [Lorem Picsum](https://picsum.photos/). To show how the component's behaviour can be dynamically changed, an optional `greyscale` flag can be specified in the component constructor.

```csharp
//interface
public interface IComponent
{
    void Compose(IContainer container);
}

// example implementation
public class LoremPicsum : IComponent
{
    public bool Greyscale { get; }

    public LoremPicsum(bool greyscale)
    {
        Greyscale = greyscale;
    }
    
    public void Compose(IContainer container)
    {
        var url = "https://picsum.photos/300/200";

        if(Greyscale)
            url += "?grayscale";

        using var client = new WebClient();
        var response = client.DownloadData(url);
        container.Image(response);
    }
}
```

Example usage:

```csharp{7}
.Column(column =>
{
    column.Spacing(10);

    column
        .Element()
        .Component(new LoremPicsum(true));
    
    column
        .Element()
        .AlignRight()
        .Text("From Lorem Picsum");
});
```

The result of the sample code is shown below:

![example](/patterns-and-practices/component-example.png =350x)

::: tip
If the component class has a parameterless constructor, you can use the generic `Template` method like this:
```csharp
.Component<ComponentClass>();
```
:::