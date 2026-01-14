---
outline: false
---


<script setup>
import MaterialColorList from '../.vitepress/theme/MaterialColorList.vue';
</script>


# Colors

QuestPDF supports multiple color formats.

```c#{6,7,11,14}
using QuestPDF.Helpers;

container
    .Padding(20)
    .Border(1)
    .BorderColor("#03A9F4")
    .Background(Colors.LightBlue.Lighten5)
    .Padding(20)
    .Text("Blue text")
    .Bold()
    .FontColor(Colors.LightBlue.Darken4)
    .Underline()
    .DecorationWavy()
    .DecorationColor(0xFF0000);
```

![example](/patterns-and-practices/colors.webp)

## Color definitions

### HEX Colors

A hexadecimal color is specified with: `#RRGGBB`, where the RR (red), GG (green) and BB (blue) hexadecimal integers specify the components of the color.
All values range from 00 to FF, and are case-insensitive.


### Alpha channel

To specify an alpha channel, add two more hexadecimal digits in front of the color code: `#AARRGGBB` where AA is the alpha channel.
The alpha channel defines the transparency of a color and ranges from 00 (fully transparent) to FF (fully opaque).


### Shorthand HEX

You can use shorthand HEX codes with 3 or 4 digits. The library will automatically expand them to the full 6 or 8-digit format.
For example, `#123` will be expanded to `#112233` and `#89AB` to `#8899AABB`.

You can also omit the hash sign (`#`) at the beginning of the color code.


::: warning
Please be aware that in some software the alpha channel is specified at the end of the color code, e.g. `#RRGGBBAA`.
:::

## Examples

<div class="documentation-color-examples">
    <div v-for="color of ['#FF0000', '#0000FF', '#3CB371', '#EE82EE', '#FFA500', '#6A5ACD']" :style="{ backgroundColor: color }">{{ color }}</div>
</div>


## Material Design colors

For your convenience, QuestPDF provides a list of colors from the Google Material Design palette.

| Variant                 | Recommended Use                                                                     |
|-------------------------|-------------------------------------------------------------------------------------|
| **Medium Shade (Base)** | Base color for the palette                                                          |
| **Lighter Shades**      | Large background areas or surfaces                                                  |
| **Darker Shades**       | Text, headlines, or elements requiring higher contrast against a lighter background |
| **Accent Swatches**     | Small elements where user attention is needed                                       |


<br>

<MaterialColorList />


<style>
.documentation-color-examples {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}

.documentation-color-examples > div {
  width: 150px;
  height: 75px;

  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 600;
  color: white;
}
</style>