<template>
  <!-- one direction: a note strip (letter, name, why it gets read, trade-offs, who it serves, copy that
       changes), then the section exactly as it would sit on the homepage. LabDirection.vue with two
       more notes; kept separate so the other labs are untouched. -->
  <div class="container license-direction-note" :id="id">
    <div class="content">
      <div class="direction-head">
        <span class="direction-letter">{{ letter }}</span>
        <h2 class="direction-name">{{ name }}</h2>
        <span v-if="height" class="direction-height">{{ height }}</span>
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
        <div v-if="$slots.personas">
          <div class="direction-label">Who it serves</div>
          <p><slot name="personas" /></p>
        </div>
        <div v-if="$slots.copy">
          <div class="direction-label">Copy and facts</div>
          <p><slot name="copy" /></p>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ letter: string; name: string; id?: string; height?: string }>();
</script>

<style scoped>

.license-direction-note {
  margin-top: 64px;
  scroll-margin-top: 80px;
  border-top: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
}

.license-direction-note .content {
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

.direction-height {
  margin-left: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}

.direction-notes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 40px;
  margin-top: 16px;
  max-width: 1200px;
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

  .direction-height {
    display: none;
  }
}

</style>
