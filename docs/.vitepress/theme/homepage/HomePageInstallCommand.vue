<script setup lang="ts">
import { ref } from "vue";

/* The install command as a chip that copies itself. Two sizes: the full chip with an "Install" label
   (the quick start panel) and a compact pill without it (the hero, under the tagline), which is kept
   lighter than a button so that the two CTA cards below the hero stay the primary calls to action. */

withDefaults(defineProps<{ compact?: boolean }>(), { compact: false });

const installCommand = "dotnet add package QuestPDF";
const copied = ref(false);

async function copyInstallCommand() {
  try {
    await navigator.clipboard.writeText(installCommand);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
  } catch {
    /* clipboard access denied: the command is plain text, so it can still be selected and copied */
  }
}
</script>

<template>
  <button
      type="button"
      class="install"
      :class="{ copied, compact }"
      :title="copied ? 'Copied' : 'Copy to clipboard'"
      :aria-label="copied ? 'Copied' : `Copy ${installCommand} to clipboard`"
      @click="copyInstallCommand">
    <span v-if="!compact" class="install-label">Install</span>
    <code class="install-command"><span class="prompt">$</span> {{ installCommand }}</code>
    <i class="fa-regular" :class="copied ? 'fa-check' : 'fa-copy'" aria-hidden="true"></i>
  </button>
</template>

<style scoped>

.install {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  max-width: 100%;
  padding: 12px 20px 12px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--home-surface-inner);
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.install:hover {
  border-color: var(--vp-c-brand-2);
}

.install:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.install-label {
  flex: 0 0 auto;
  padding: 4px 10px;
  border-radius: 8px;
  background-color: color-mix(in srgb, var(--vp-c-brand-2), transparent 85%);
  color: var(--vp-c-brand-1);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  text-transform: uppercase;
}

.install-command {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.install-command .prompt {
  color: var(--vp-c-text-3);
}

.install i {
  flex: 0 0 auto;
  width: 20px;
  font-size: 20px;
  color: var(--vp-c-text-3);
}

.install.copied i {
  color: #4CAF50;
}

/* compact: a quiet pill on the page itself, no label, a smaller icon */
.install.compact {
  gap: 12px;
  padding: 8px 14px 8px 16px;
  border-radius: 999px;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 4%, transparent);
}

.install.compact:hover {
  background-color: color-mix(in srgb, var(--vp-c-text-1) 7%, transparent);
}

.install.compact i {
  width: 16px;
  font-size: 16px;
}

@media screen and (max-width: 700px) {
  .install-label {
    display: none;
  }
}

</style>
