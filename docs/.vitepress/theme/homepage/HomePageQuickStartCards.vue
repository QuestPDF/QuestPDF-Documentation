<script setup lang="ts">
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faArrowRightArrowLeft, faBolt, faCode, faCodeBranch, faComments, faLightbulbOn, faPuzzlePiece, faShieldCheck } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../Icon.vue";
import QuickStartCodeFigure from "./QuickStartCodeFigure.vue";
import QuickStartAgentFigure from "./QuickStartAgentFigure.vue";

interface Card {
  kind: "code-card" | "agent-card";
  title: string;
  label: string;
  notes: {
    icon: IconDefinition;
    text: string;
  }[];
}

const cards: Card[] = [
  {
    kind: "code-card",
    title: "Create and review in C#",
    label: "Why write documents in C#",
    notes: [
      { icon: faCode, text: "Write loops and conditions in C#, not templates" },
      { icon: faPuzzlePiece, text: "Build reusable components with classes and methods" },
      { icon: faLightbulbOn, text: "Use IntelliSense, type checking and refactoring in IDE" },
      { icon: faCodeBranch, text: "Track changes and easily review in version-control" }
    ]
  },
  {
    kind: "agent-card",
    title: "Develop with AI agents",
    label: "How an AI assistant helps",
    notes: [
      { icon: faArrowRightArrowLeft, text: "Easily migrate legacy HTML reports to QuestPDF" },
      { icon: faComments, text: "Create and edit documents confidently with prompts" },
      { icon: faBolt, text: "Ship new documents and changes much faster" },
      { icon: faShieldCheck, text: "Keep AI changes type-checked and reviewable" }
    ]
  }
];
</script>

<template>
  <div class="quick-start-cards">
    <article v-for="card of cards" :key="card.kind" class="panel quick-start-card" :class="card.kind">
      <figure class="card-figure">
        <QuickStartCodeFigure v-if="card.kind === 'code-card'" />
        <QuickStartAgentFigure v-else />
      </figure>

      <h2 class="card-title">{{ card.title }}</h2>

      <ul class="notes" :aria-label="card.label">
        <li v-for="note of card.notes" :key="note.text" class="note">
          <Icon :icon="note.icon" />
          <span>{{ note.text }}</span>
        </li>
      </ul>
    </article>
  </div>
</template>

<style scoped>

.quick-start-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--section-gap);
}

.quick-start-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.code-card {
  --tint: #0288D1;
}

/* the cards' own glows go under the panel sheen */
html.dark .code-card {
  --tint: #80C8FF;

  background-image:
      var(--surface-sheen),
      radial-gradient(ellipse 90% 55% at 0% 64px, color-mix(in srgb, #64B5F6 10%, transparent), transparent),
      radial-gradient(ellipse 50% 30% at 0% 64px, color-mix(in srgb, #29B6F6 4%, transparent), transparent);
}

.agent-card {
  --tint: #5E35B1;
}

html.dark .agent-card {
  --tint: #B388FF;

  background-image:
      var(--surface-sheen),
      radial-gradient(ellipse 90% 55% at 0% 64px, color-mix(in srgb, #9575CD 10%, transparent), transparent),
      radial-gradient(ellipse 50% 30% at 0% 64px, color-mix(in srgb, #AB47BC 4%, transparent), transparent);
}

html.dark .quick-start-card .card-title {
  color: color-mix(in srgb, var(--tint) 60%, var(--vp-c-text-1));
}


/* both figures are 151px tall (168px at 90% zoom); the fixed box keeps the two titles level if one ever changes */
.card-figure {
  display: flex;
  align-items: flex-end;
  height: 151px;
  margin: 0 0 48px;
}

.notes {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 20px 0 0;
}

.note {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 6px 0;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.note .icon {
  flex-shrink: 0;
  width: 18px;
  margin-top: 0.25rem;
  font-size: 1rem;
  color: var(--tint);
}

@media screen and (max-width: 760px) {
  .quick-start-cards {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }
}

</style>
