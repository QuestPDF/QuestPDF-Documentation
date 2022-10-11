<template>

</template>

<script setup>
import { onMounted } from 'vue';

async function watchPageChange(handler) {
  let previousHref = location.href;

  while (true) {
    const currentHref = location.href;

    if (previousHref !== currentHref) {
      previousHref = currentHref;
      handler();
    }

    await new Promise(x => setTimeout(x, 250));
  }
}

const DOCUMENTATION = [
  {
    key: "PaddingVertical",
    invocation: "(float value)",
    description: "Adds vertical padding (top and bottom)."
  },
  {
    key: "PaddingHorizontal",
    invocation: "(float value)",
    description: "Adds horizontal padding (left and right)."
  },
  {
    key: "Padding",
    invocation: "float value, Unit unit = Unit.Point",
    description: "Adds horizontal padding (left and right)."
  },
  {
    key: "Table",
    invocation: "",
    description: "Arranges its children one under another. Supports paging."
  }
];

async function injectIntellisense() {
  const body = document.getElementsByTagName("body")[0];

  const codeBlocks = document.getElementsByClassName("language-csharp");

  const keys = DOCUMENTATION.map(x => x.key);

  let tooltip = null;

  for (let codeBlock of codeBlocks) {
    const tokens = codeBlock.getElementsByTagName("span");

    for (let token of tokens) {
      if (!keys.includes(token.textContent))
        continue;

      token.addEventListener("mouseover", () => {
        const type = token.textContent;

        let docs = DOCUMENTATION.find(x => x.key === type);

        if (!docs) {
          docs = {
            key: type,
            invocation: "float value, Unit unit = Unit.Point",
            description: "Adds horizontal padding (left and right)."
          };
        }

        tooltip = document.createElement("div");
        tooltip.innerHTML = `
        <div class="code-tooltip">
            <div class="element-name">${type}( <span class="element-invocation">${docs.invocation}</span> )</div>
            <div class="element-description">${docs.description}</div>
        </div>`;

        body.appendChild(tooltip);
      });

      token.addEventListener("mouseout", () => {
        if (!tooltip)
          return;

        body.removeChild(tooltip);
        tooltip = null;
        //element.innerHTML = originalHtml;
      });
    }
  }

  document.addEventListener("mousemove", position => {
    if (!tooltip)
      return;
    tooltip.children[0].style.left = `${position.clientX + 20}px`;
    tooltip.children[0].style.top = `${position.clientY + 10}px`;
  });
}

onMounted(() => {
  if (typeof window === 'undefined')
    return;

  injectIntellisense();

  // vitepress blocks standard window events
  watchPageChange(injectIntellisense);
});
</script>

<style>
.code-tooltip {
  position: fixed;
  z-index: 100;
  background-color: #444;
  opacity: 1;
  color: white;
  max-width: 300px;
  padding: 8px 12px;
  border-radius: 6px;
  overflow: clip;
  box-shadow: 0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)!important;
}
.code-tooltip .element-name {
  font-weight: bold;
  font-size: 14px;
  color: #FFF;
  margin-bottom: 4px;
}
.code-tooltip .element-invocation {
  font-weight: normal;
  font-size: 14px;
  color: #AAA;
}
.code-tooltip .element-description {
  font-weight: normal;
  font-size: 12px;
  color: #DDD;
}
.code-tooltip hr {
  border-color: #888;
  margin: 12px -12px;
}
</style>