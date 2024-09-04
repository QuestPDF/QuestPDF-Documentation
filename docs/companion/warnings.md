# Companion App: Warning Messages

## Complex document

**Reason:** This warning message is displayed when the document contains complex content. The hot-reload performance may be impacted.

**Solution:** Please consider using simpler and shorter content while working on the document's design.


## Hot-reload

**Reason:** This warning message is displayed when the content preview is refreshed using hot-reload. 
Modern dotnet hot-reload feature has certain limitations that may impact accuracy of a stack trace collection.
As a result, any feature related to code navigation may not be as precise as expected.

**Solution:** If code navigation is crucial, please consider using the dotnet watch command instead of hot-reload: `dotnet watch --no-hot-reload`.

