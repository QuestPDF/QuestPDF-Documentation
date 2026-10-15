<template>
  <!-- one direction: a note strip (letter, name, measurements, why, trade-offs, copy), then the header
       above a copy of today's cards, exactly as it would sit on the page -->
  <div class="container purchase-direction-note" :id="id">
    <div class="content">
      <div class="direction-head">
        <span class="direction-letter">{{ letter }}</span>
        <h2 class="direction-name">{{ name }}</h2>
        <span v-if="metrics" class="direction-metrics">{{ metrics }}</span>
      </div>

      <div class="direction-notes">
        <div>
          <div class="direction-label">Why it is simpler</div>
          <p><slot name="why" /></p>
        </div>
        <div>
          <div class="direction-label">Trade-offs</div>
          <p><slot name="tradeoffs" /></p>
        </div>
        <div v-if="$slots.copy">
          <div class="direction-label">Copy</div>
          <p><slot name="copy" /></p>
        </div>
      </div>
    </div>
  </div>

  <div class="container" :class="{ 'texture-dots': dots }">
    <div class="content purchase-preview">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ letter: string; name: string; id?: string; metrics?: string; dots?: boolean }>(), { dots: true });
</script>

<style scoped>

.purchase-direction-note {
  margin-top: 64px;
  scroll-margin-top: 80px;
  border-top: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
}

.purchase-direction-note .content {
  padding-bottom: 0;
}

.direction-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
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

.direction-metrics {
  margin-left: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}

.direction-notes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px 40px;
  margin-top: 16px;
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

/* the page's own layout: the header and the cards in one centred column, 32px apart */
.purchase-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

@media screen and (max-width: 960px) {
  .direction-notes {
    grid-template-columns: minmax(0, 1fr);
  }

  .direction-metrics {
    margin-left: 0;
    flex-basis: 100%;
  }
}

</style>
