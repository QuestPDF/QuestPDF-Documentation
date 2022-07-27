# Components

A component is a special type of element that can generate content depending on its state. This approach is really common in many web-development libraries and solves multiple issues. You should consider creating your own component when part of the document is going to be reused in other documents. Another good scenario is when you plan to repeat a more complex section. In such a case, you can implement a component that takes input provided as constructor's argument, and generates PDF content. Then, such component can be easily used in a for loop in the document itself. All things considered, components are a useful tool to organize and reuse your code.

::: tip
Components offer a lot of flexibility and extendability. Because of that, the QuestPDF library will receive several important updates to enhance components features even more. Stay tuned for slots!
:::

In this tutorial, we will cover a simple component that generates a random image taken from the fantastic webpage called [Lorem Picsum](https://picsum.photos/). To show how component's behaviour can be dynamically changed, the end result will offer optional greyscale flag.

Additionally, the constructor of the template is going to offer of showing only greyscale images.

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

The result of sample code looks as follows:

![example](/patterns-and-practices/component-example.png =350x)

::: tip
If the component class has parameter-less constructor, you can use the generic `Template` method like so:
```csharp
.Component<ComponentClass>();
```
:::