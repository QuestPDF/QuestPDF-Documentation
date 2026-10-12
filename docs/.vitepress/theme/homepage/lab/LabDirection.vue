<template>
  <!-- one direction: a note strip with the letter, the name, why it gets read and its trade-offs,
       then the section itself exactly as it would sit on the homepage -->
  <div class="container lab-direction-note" :id="id">
    <div class="content">
      <div class="direction-head">
        <span class="direction-letter">{{ letter }}</span>
        <h2 class="direction-name">{{ name }}</h2>
      </div>

      <div class="direction-notes">
        <div>
          <div class="direction-label">Why it gets read</div>
          <p><slot name="why" /></p>
        </div>
        <div>
          <div class="direction-label">Trade-offs</div>
          <p><slot name="tradeoffs" /></p>
        </div>
      </div>
    </div>
  </div>

  <!-- the dot wings frame a section header on the canvas; a direction without one opts out -->
  <div class="container" :class="{ 'texture-dots': dots }">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ letter: string; name: string; dots?: boolean; id?: string }>(), { dots: true, id: undefined });
</script>

<style scoped>

.lab-direction-note {
  margin-top: 64px;
  scroll-margin-top: 80px; /* anchors land below the fixed navbar */
  border-top: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
}

.lab-direction-note .content {
  padding-bottom: 0;
}

.direction-head {
  display: flex;
  align-items: center;
  gap: 16px;
}

.direction-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-bg);
  background-color: var(--vp-c-text-1);
}

.direction-name {
  margin: 0;
  font-size: 1.5rem;
  line-height: 2rem;
}

.direction-notes {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 32px;
  margin-top: 16px;
  max-width: 1100px;
}

.direction-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.direction-notes p {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

@media screen and (max-width: 768px) {
  .direction-notes {
    grid-template-columns: minmax(0, 1fr);
  }
}

</style>
