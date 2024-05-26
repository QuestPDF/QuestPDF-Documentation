# Show entire

Use this container to prevent the element from being paged. If there is not enough space on a page, the element is wrapped to the next page without splitting its content.

This container is commonly used with the `Column` and `Row` elements to make sure that their content is fully visible on a single page.

```c#
.ShowEntire()
// element that will not be paged
```

::: danger
Please be careful when using the `ShowEntire` container. If its content requires more space than is available on the page, the rendering process will result in a layout exception.
:::