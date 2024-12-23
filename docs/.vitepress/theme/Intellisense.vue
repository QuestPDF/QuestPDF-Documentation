<template>
  <div id="intellisense" @click="redirectToDocumentation">
    <div class="title">{{ title }}</div>
    <div class="description">{{ description }}</div>
    <div v-if="isMobile" class="link">Read more</div>
  </div>
</template>

<script setup lang="ts">
import {onContentUpdated, useRouter} from "vitepress";
import {onMounted, ref} from "vue";

const title = ref<string>('');
const description = ref<string>('');
const linkUrl = ref<string>('');
const isMobile = ref<boolean>(false);

const router = useRouter();

const API_DOCUMENTATION = [
  {
    triggers: ["Text"],
    description: "Supports drawing text of different styles.",
    linkUrl: "/api-reference/text"
  },
  {
    triggers: ["Image"],
    description: "Draws an image with a known or dynamic size.",
    linkUrl: "/api-reference/image"
  },
  {
    triggers: ["Background"],
    description: "Applies solid background color beneath its children.",
    linkUrl: "/api-reference/background"
  },
  {
    triggers: ["Border", "BorderVertical", "BorderHorizontal", "BorderLeft", "BorderRight", "BorderTop", "BorderBottom", "BorderColor"],
    description: "Applies solid border around its children.",
    linkUrl: "/api-reference/border"
  },
  {
    triggers: ["LineVertical", "LineHorizontal", "LineColor"],
    description: "Draws vertical or horizontal line.",
    linkUrl: "/api-reference/line"
  },
  {
    triggers: ["Placeholder"],
    description: "Draws a simple placeholder image for prototyping purposes.",
    linkUrl: "/api-reference/placeholder"
  },
  {
    triggers: ["Width", "MinWidth", "MaxWidth"],
    description: "Applies minimum and/or maximum width constraints to its children.",
    linkUrl: "/api-reference/width"
  },
  {
    triggers: ["Height", "MinHeight", "MaxHeight"],
    description: "Applies minimum and/or maximum height constraints to its children.",
    linkUrl: "/api-reference/height"
  },
  {
    triggers: [ "AlignLeft", "AlignCenter", "AlignRight", "AlignTop", "AlignMiddle", "AlignBottom"],
    description: "Allows you to specify the exact position of its child, e.g. in the middle, or in the bottom left corner.",
    linkUrl: "/api-reference/alignment"
  },
  {
    triggers: ["Padding", "PaddingHorizontal", "PaddingVertical", "PaddingLeft", "PaddingRight", "PaddingTop", "PaddingBottom"],
    description: "Applies empty space around its children.",
    linkUrl: "/api-reference/padding"
  },
  {
    triggers: ["AspectRatio"],
    description: "Reserves an area with a specified aspect ratio.",
    linkUrl: "/api-reference/aspect-ratio"
  },
  {
    triggers: ["Extend", "ExtendHorizontal", "ExtendVertical"],
    description: "Extends child size to fit the entire content vertically and/or horizontally.",
    linkUrl: "/api-reference/extend"
  },
  {
    triggers: [ "Shrink", "ShrinkHorizontal", "ShrinkVertical"],
    description: "Minimizes child size to the smallest possible. Useful when the parent element provides more space than is necessary.",
    linkUrl: "/api-reference/shrink"
  },
  {
    triggers: ["Translate", "TranslateX", "TranslateY"],
    description: "Virtually moves the child horizontally and/or vertically in spaces.",
    linkUrl: "/api-reference/translate"
  },
  {
    triggers: ["Rotate", "RotateLeft", "RotateRight"],
    description: "Rotates its child.",
    linkUrl: "/api-reference/rotate"
  },
  {
    triggers: ["Scale", "ScaleVertical", "ScaleHorizontal"],
    description: "Scales its child to make it bigger or smaller.",
    linkUrl: "/api-reference/scale"
  },
  {
    triggers: ["ScaleToFit"],
    description: "Scales its child to fit available space.",
    linkUrl: "/api-reference/scale-to-fit"
  },
  {
    triggers: ["FlipOver", "FlipHorizontal", "FlipVertical"],
    description: "Rotates its child in 90 degree increments.",
    linkUrl: "/api-reference/flip"
  },
  {
    triggers: ["Unconstrained"],
    description: "Removes any size constraints, giving its child unlimited space.",
    linkUrl: "/api-reference/unconstrained"
  },
  {
    triggers: ["PageBreak"],
    description: "Forces all subsequent content to be moved to the next page.",
    linkUrl: "/api-reference/page-break"
  },
  {
    triggers: ["ShowIf"],
    description: "Conditionally displays its children.",
    linkUrl: "/api-reference/show-if"
  },
  {
    triggers: ["ShowOnce"],
    description: "Displays its children only once, on the first page of the occurrence. The element is not visible on subsequent pages.",
    linkUrl: "/api-reference/show-once"
  },
  {
    triggers: ["SkipOnce"],
    description: "Hides its children on the first page of the occurrence. The element is visible on all subsequent pages.",
    linkUrl: "/api-reference/skip-once"
  },
  {
    triggers: ["ShowEntire"],
    description: "Makes sure that the element is fully visible on a single page, without page breaking.",
    linkUrl: "/api-reference/show-entire"
  },
  {
    triggers: ["EnsureSpace"],
    description: "A less strict version of the ShowEntire element. If there is not enough space to display the entire element on a single page, it ensures that the first page of the occurrence has at least the minimum specified size available. Used to visually optimize the layout.",
    linkUrl: "/api-reference/ensure-space"
  },
  {
    triggers: ["StopPaging"],
    description: "Displays its element on the first page only. If some part of the element does not fit, it is ignored.",
    linkUrl: "/api-reference/stop-paging"
  },
  {
    triggers: ["Page"],
    description: "Allows you to manage page settings, e.g. size, margin, color, watermark, etc.",
    linkUrl: "/api-reference/page"
  },
  {
    triggers: ["Table"],
    description: "Arranges its children using a table-layout algorithm. Supports row and column spanning.",
    linkUrl: "/api-reference/table"
      },
  {
    triggers: ["Column"],
    description: "Places its children vertically, one under another.",
    linkUrl: "/api-reference/column"
      },
  {
    triggers: ["Row"],
    description: "Places its children horizontally, one alongside another.",
    linkUrl: "/api-reference/row"
  },
  {
    triggers: ["Grid"],
    description: "Arranges its children using grid-layout algorithm. Available space is divided into a set of equally-spaced columns. Its child can occupy any number of columns.",
    linkUrl: "/api-reference/grid"
  },
  {
    triggers: ["Inlined"],
    description: "Draws its elements in a line. Supports various element alignments.",
    linkUrl: "/api-reference/inlined"
  },
  {
    triggers: ["Decoration"],
    description: "Places additional content before and/or after its children. The additional content is repeated on all pages.",
    linkUrl: "/api-reference/decoration"
  },
  {
    triggers: ["Layers"],
    description: "Places additional content underneath and/or above its children. The additional content is repeated on all pages. Useful when implementing watermarks.",
    linkUrl: "/api-reference/layers"
  },
  {
    triggers: ["List"],
    description: "Draws its children as an ordered or unordered list.",
    linkUrl: "/api-reference/list"
  },
  {
    triggers: ["Section" ],
    description: "Specifies a multi-page area spanning its children. Used to create internal document links and for showing custom page numbers.",
    linkUrl: "/api-reference/section"
  },
  {
    triggers: ["SectionLink"],
    description: "Creates a link to the specified section. Redirects the user to the page containing the section's first occurrence.",
    linkUrl: "/api-reference/section-link"
  },
  {
    triggers: ["Hyperlink"],
    description: "Creates a link to an external location, e.g. redirects the user to a webpage.",
    linkUrl: "/api-reference/hyperlink"
  },
  {
    triggers: ["Element"],
    description: "Allows you to break the Fluent API chain and inject dynamic content using a lambda expression.",
    linkUrl: "/api-reference/element"
  },
  {
    triggers: ["DefaultTextStyle"],
    description: "Applies additional text styling for all text elements inside its hierarchy.",
    linkUrl: "/api-reference/default-text-style"
  },
  {
    triggers: ["DebugArea"],
    description: "Draws a colorful box with a label around its children. Useful for designing purposes.",
    linkUrl: "/api-reference/debug-area"
  },
  {
    triggers: [ "DebugPointer"],
    description: "Marks its children with a special label. That label is useful to better understand document structure when the library throws layout-related exceptions.",
    linkUrl: "/api-reference/debug-pointer"
  },
];

function applyIntellisense() {
  const codeElements = document.querySelectorAll('code');

  function registerIntellisense(codeElement: HTMLElement) {
    const spans = codeElement.querySelectorAll('span');

    for (let span of spans) {
      if (API_DOCUMENTATION.some(x => x.triggers.includes(span.textContent)) === false)
        continue;

      span.classList.add('intellisense-available');

      if (isMobile.value) {
        span.addEventListener("click", x => { showIntellisense(span); x.stopPropagation(); });
      }
      else {
        span.addEventListener("mouseenter", () => showIntellisense(span));
        span.addEventListener("mouseleave", () => hideIntellisense());
        span.addEventListener("click", () => redirectToDocumentation());
      }
    }

    if (isMobile.value) {
      codeElement.addEventListener("click", () => hideIntellisense());
    }
  }

  for (let codeElement of codeElements)
    registerIntellisense(codeElement);
}

function showIntellisense(span: HTMLSpanElement) {
  const intellisense = document.getElementById('intellisense');
  const documentation = API_DOCUMENTATION.find(x => x.triggers.includes(span.textContent));

  title.value = span.textContent;
  description.value = documentation.description;
  linkUrl.value = documentation.linkUrl;

  const position = span.getBoundingClientRect();
  intellisense.style.display = "block";
  intellisense.style.top = `${position.top + position.height + window.scrollY + 12}px`;
  intellisense.style.left = `${position.x}px`;
}

function hideIntellisense() {
  const intellisense = document.getElementById('intellisense');
  intellisense.style.display = "none";
  intellisense.style.top = '0';
  intellisense.style.left = '0';
}

function redirectToDocumentation() {
  hideIntellisense();
  router.go(linkUrl.value);
}

onMounted(() => {
  isMobile.value = window.innerWidth < 600;
  applyIntellisense();
});

onContentUpdated(applyIntellisense);

</script>

<style>

/* INTELLISENSE POPUP DIALOG */

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
  padding: 4px 8px;
  filter: drop-shadow(0 4px 8px #0001);
}

#intellisense .title {
  font-weight: 600;
  margin-bottom: 4px;
}

#intellisense .description {
  line-height: 1.25;
  margin-bottom: 4px;
}

@media screen and (max-width: 600px) {
  #intellisense {
    left: 16px !important;
    right: 16px !important;
    max-width: calc(100vw - 32px);
  }
}

#intellisense .link {
  color: var(--vp-code-link-color);
}

/* CODE INTERACTION HIGHLIGHTING */

code .intellisense-available {
  cursor: pointer;
}

code:hover .intellisense-available {
  text-decoration: underline;
  text-decoration-color: currentColor;
}

code .intellisense-available:hover {
  text-decoration: none;
  background-color: var(--vp-c-bg);
  filter: drop-shadow(0 4px 8px #0001);
  border: 1px solid var(--vp-c-border);
  margin: -2px -3px;
  padding: 2px;
  border-radius: 4px;
}

</style>