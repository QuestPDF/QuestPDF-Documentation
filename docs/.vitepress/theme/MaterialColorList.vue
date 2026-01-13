<script setup lang="ts">
  import {MaterialColors} from "./materialColors.js";

  function getLabelColor(hexcolor: string) {
    const r = parseInt(hexcolor.substring(1, 3), 16);
    const g = parseInt(hexcolor.substring(3, 5), 16);
    const b = parseInt(hexcolor.substring(5, 7), 16);

    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (brightness >= 150) ? "black" : "white";
  }
</script>

<template>
  <div class="material-colors-container">
    <div v-for="(swatches, colorName) in MaterialColors" :key="colorName" class="color-group">
      <div v-for="(hexValue, shadeName) in swatches" :key="shadeName" class="swatch" :style="{ backgroundColor: hexValue, color: getLabelColor(hexValue) }">
        {{ colorName }}.{{ shadeName }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.material-colors-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
}

.color-group {
  width: 300px;

  border-radius: 8px;
  overflow: hidden;
}

.swatch {
  padding: 12px 24px;
  font-weight: 500;
  font-size: 14px;
}
</style>