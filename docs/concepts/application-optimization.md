# Application Optimization

## Removing Lato Font

When the publish package size is important, and you are using your own font files in the project, you may want to remove the default Lato font from the package.

Add the following content to your `*.csproj` file:

```xml{3-5,7-9}
<Project Sdk="Microsoft.NET.Sdk">

    <Target Name="QuestPDF_DoNotIncludeLatoFont_AfterBuild" AfterTargets="Build">
        <RemoveDir Directories="$(OutDir)/LatoFont" />
    </Target>

    <Target Name="QuestPDF_DoNotIncludeLatoFont_AfterPublish" AfterTargets="Publish">
        <RemoveDir Directories="$(PublishDir)/LatoFont" />
    </Target>

</Project>

```
