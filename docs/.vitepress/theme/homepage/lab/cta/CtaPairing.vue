<script setup lang="ts">
import CtaLabCard from "./CtaLabCard.vue";

/* One pairing: a note strip (letter, name, why it gets clicked, trade-offs) and then the two cards at the
   real homepage size with the pairing's two visuals in the slots. The copy, the links and the accents are
   the production ones. */
withDefaults(defineProps<{
  id: string;
  letter: string;
  name: string;
  why: string;
  tradeoffs: string;
  motion: string;
  glow?: "full" | "soft" | "none";
  embed?: boolean;
}>(), { glow: "soft", embed: false });
</script>

<template>
  <div class="container" :id="id">
    <section class="content pairing">
      <div v-if="!embed" class="lab-note">
        <div class="lab-note-title">
          <span class="lab-letter">{{ letter }}</span>
          <h2>{{ name }}</h2>
        </div>
        <p><strong>Why it gets clicked.</strong> {{ why }}</p>
        <p><strong>Motion.</strong> {{ motion }}</p>
        <p><strong>Trade-offs.</strong> {{ tradeoffs }}</p>
      </div>

      <div class="cta-row">
        <cta-lab-card
            title="Watch the 10-minute intro"
            description="A short video introduces the library and its core concepts, then builds a production-ready invoice in fewer than 200 lines of C#."
            label="Watch the intro"
            detail="10 min"
            href="/quick-start.html"
            :glow="glow">
          <slot name="video" />
        </cta-lab-card>

        <cta-lab-card
            title="Browse the sample gallery"
            description="Explore complete documents such as invoices, reports and certificates, plus reusable components and layout ideas. Each comes with source code you can copy and adapt."
            label="Open the gallery"
            detail="40+ samples"
            href="/sample-gallery.html"
            accent="#5C6BC0"
            accent-secondary="#3F51B5"
            :glow="glow">
          <slot name="gallery" />
        </cta-lab-card>
      </div>
    </section>
  </div>
</template>
