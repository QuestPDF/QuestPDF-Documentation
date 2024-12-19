<template>
  <div id="intellisense"></div>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
const { Layout } = DefaultTheme

import {onContentUpdated} from "vitepress";

const API_DOCUMENTATION = {
  "Text": "Supports drawing text of different styles.",
  "Image": "Draws an image with a known or dynamic size.",
  "Background": "Applies solid background color beneath its children.",
  "Border": "Applies solid border around its children.",
  "Line": "Draws vertical or horizontal line.",
  "Placeholder": "Draws a simple placeholder image for prototyping purposes.",
  "Width": "Applies minimum and/or maximum width constraints to its children.",
  "Height": "Applies minimum and/or maximum height constraints to its children.",
  "Alignment": "Allows you to specify the exact position of its child, e.g. in the middle, or in the bottom left corner.",
  "Padding": "Applies empty space around its children.",
  "AspectRatio": "Reserves an area with a specified aspect ratio.",
  "Extend": "Extends child size to fit the entire content vertically and/or horizontally.",
  "Shrink": "Minimizes child size to the smallest possible. Useful when the parent element provides more space than is necessary.",
  "Translate": "Virtually moves the child horizontally and/or vertically in spaces.",
  "Rotate": "Rotates its child.",
  "Scale": "Scales its child to make it bigger or smaller.",
  "ScaleToFit": "Scales its child to fit available space.",
  "Flip": "Rotates its child in 90 degree increments.",
  "Unconstrained": "Removes any size constraints, giving its child unlimited space.",
  "PageBreak": "Forces all subsequent content to be moved to the next page.",
  "ShowIf": "Conditionally displays its children.",
  "ShowOnce": "Displays its children only once, on the first page of the occurrence. The element is not visible on subsequent pages.",
  "SkipOnce": "Hides its children on the first page of the occurrence. The element is visible on all subsequent pages.",
  "ShowEntire": "Makes sure that the element is fully visible on a single page, without page breaking.",
  "EnsureSpace": "A less strict version of the ShowEntire element. If there is not enough space to display the entire element on a single page, it ensures that the first page of the occurrence has at least the minimum specified size available. Used to visually optimize the layout.",
  "StopPaging": "Displays its element on the first page only. If some part of the element does not fit, it is ignored.",
  "Page": "Allows you to manage page settings, e.g. size, margin, color, watermark, etc.",
  "Table": "Arranges its children using a table-layout algorithm. Supports row and column spanning.",
  "Column": "Places its children vertically, one under another.",
  "Row": "Places its children horizontally, one alongside another.",
  "Grid": "Arranges its children using grid-layout algorithm. Available space is divided into a set of equally-spaced columns. Its child can occupy any number of columns.",
  "Inlined": "Draws its elements in a line. Supports various element alignments.",
  "Decoration": "Places additional content before and/or after its children. The additional content is repeated on all pages.",
  "Layers": "Places additional content underneath and/or above its children. The additional content is repeated on all pages. Useful when implementing watermarks.",
  "List": "Draws its children as an ordered or unordered list.",
  "Section": "Specifies a multi-page area spanning its children. Used to create internal document links and for showing custom page numbers.",
  "SectionLink": "Creates a link to the specified section. Redirects the user to the page containing the section's first occurrence.",
  "Hyperlink": "Creates a link to an external location, e.g. redirects the user to a webpage.",
  "Element": "Allows you to break the Fluent API chain and inject dynamic content using a lambda expression.",
  "DefaultTextStyle": "Applies additional text styling for all text elements inside its hierarchy.",
  "DebugArea": "Draws a colorful box with a label around its children. Useful for designing purposes.",
  "DebugPointer": "Marks its children with a special label. That label is useful to better understand document structure when the library throws layout-related exceptions.",
};

onContentUpdated(() => {
  const codeElements = document.querySelectorAll('code');
  const intellisense = document.getElementById('intellisense');

  function registerIntellisense(codeElement: HTMLElement) {
    const spans = codeElement.querySelectorAll('span');

    for (let span of spans) {
      if (Object.keys(API_DOCUMENTATION).indexOf(span.textContent) < 0)
        continue;

      const documentation = API_DOCUMENTATION[span.textContent];

      span.addEventListener("mouseenter", () => {
        const position = span.getBoundingClientRect();

        intellisense.textContent = documentation;
        intellisense.style.display = "block";
        intellisense.style.top = `${position.top + position.height + window.scrollY + 8}px`;
        intellisense.style.left = `${position.x}px`;
      });

      span.addEventListener("mouseleave", () => {
        intellisense.style.display = "none";
      });
    }
  }

  for (let codeElement of codeElements)
    registerIntellisense(codeElement);
});

</script>

<style>
#intellisense:before {
  background-color: white;
  position: absolute;
}

#intellisense {
  display: none;
  position: absolute;
  z-index: 100;

  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);

  font-size: 14px;
  font-weight: 400;

  max-width: 400px;
  border-radius: 8px;
  padding: 2px 8px;
  filter: drop-shadow(0 4px 8px #0001);
}
</style>