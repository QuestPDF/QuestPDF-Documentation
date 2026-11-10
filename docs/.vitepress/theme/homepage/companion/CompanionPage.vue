<script setup lang="ts">
import { faImage } from "@fortawesome/pro-light-svg-icons";
import Icon from "../../Icon.vue";
import { lines, rects, texts } from "./companionData";

/* The invoice page in A4 points: 1 local px = 1 pt, the camera scales it. In skeleton mode every word becomes a bar
   of the same box, so positions and readouts stay identical between both modes. */
defineProps<{
  skeleton: boolean;
  commentsColor: string;
}>();
</script>

<template>
  <div class="sheet" :class="{ skeleton }">
    <span class="box logo" :style="{ left: `${rects.logo.x}px`, top: `${rects.logo.y}px`, width: `${rects.logo.w}px`, height: `${rects.logo.h}px` }">
      <Icon :icon="faImage" />
    </span>

    <span
        class="box comments"
        :style="{
          left: `${rects.comments.x}px`, top: `${rects.comments.y}px`,
          width: `${rects.comments.w}px`, height: `${rects.comments.h}px`,
          backgroundColor: commentsColor
        }"></span>

    <span
        v-for="(line, index) of lines"
        :key="`l${index}`"
        class="rule"
        :class="line.tone"
        :style="{ left: `${line.x}px`, top: `${line.y}px`, width: `${line.w}px`, height: `${line.h}px` }"></span>

    <span
        v-for="(text, index) of texts"
        :key="index"
        class="text"
        :class="[text.tone ?? 'body', text.align ?? 'left']"
        :style="{ left: `${text.x}px`, top: `${text.y}px`, width: `${text.w}px`, height: `${text.h}px`, fontSize: `${text.size}px`, '--size': `${text.size}px` }">
      <i v-if="skeleton" class="bone"></i>
      <template v-else>{{ text.text }}</template>
    </span>
  </div>
</template>

<style scoped>

.sheet {
  position: absolute;
  inset: 0;
  width: 595px;
  height: 842px;
  background-color: #FFFFFF;
  color: #1F212C;
  font-family: Lato, var(--vp-font-family-base);
  line-height: 1.2;
}

.box,
.rule,
.text {
  position: absolute;
  display: block;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E0E0E0;
  font-size: 22px;
  color: #212121;
}

.comments {
  transition: background-color 0.6s ease;
}

.rule.strong {
  background-color: #212121;
}

.rule.soft {
  background-color: #E0E0E0;
}

.text {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.text.right {
  justify-content: flex-end;
}

.text.center {
  justify-content: center;
}

.text.accent {
  color: #2196F3;
}

.text.muted {
  color: #616161;
}

.bone {
  display: block;
  width: 100%;
  height: calc(var(--size) * 0.62);
  border-radius: calc(var(--size) * 0.31);
  background-color: #C9CDD6;
}

.strong .bone {
  background-color: #8E95A3;
}

.accent .bone {
  background-color: #64B5F6;
}

.muted .bone {
  background-color: #D5D8DF;
}

.skeleton .logo {
  color: #9AA1AE;
}

</style>
