# Font management

The QuestPDF library has access to all fonts installed on the hosting system. Sometimes though, you don't have control over fonts installed on the production environment. Or you may want to use self-hosted fonts that come with your application as files or embedded resources. In such case, you need to register those fonts as follows:

```c#{2,5,13}
// static method definition
FontManager.RegisterFont(Stream fontDataStream);

// perform similar invocation only once, when the application starts or during its initialization step
FontManager.RegisterFont(File.OpenRead("LibreBarcode39-Regular.ttf")); // use file name

// then, you will have access to the font by its name
container
    .Background(Colors.White)
    .AlignCenter()
    .AlignMiddle()
    .Text("*QuestPDF*")
    .FontFamily("Libre Barcode 39") // use real font family name
    .FontSize(64);
```

This way, it is possible to generate barcodes:

![example](/patterns-and-practices/custom-font.png =400x)

