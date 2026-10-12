<script setup>

const platformGroups = [
  {
    label: "Operating systems",
    platforms: [
      { src: 'windows.svg', name: 'Windows' },
      { src: 'linux.svg', name: 'Linux' },
      { src: 'apple.svg', name: 'macOS' }
    ]
  },
  {
    label: "Cloud & containers",
    platforms: [
      { src: 'azure.svg', name: 'Azure' },
      { src: 'aws.svg', name: 'AWS' },
      { src: 'docker.svg', name: 'Docker' }
    ]
  },
  {
    label: "IDEs",
    platforms: [
      { src: 'rider.svg', name: 'Rider' },
      { src: 'vscode.svg', name: 'VS Code' },
      { src: 'visual-studio.svg', name: 'Visual Studio' }
    ]
  }
];

</script>

<template>
  <section class="panel platforms-panel">
    <div class="section-tag">Platforms</div>

    <h2>Works everywhere you do</h2>
    <p class="sub-header">Deploy on any major operating system and integrate seamlessly with your favorite IDEs, cloud platforms, and development tools.</p>

    <div class="platform-groups">
      <div v-for="group of platformGroups" :key="group.label" class="platform-group">
        <div class="platform-group-label">{{ group.label }}</div>

        <div class="chips">
          <span v-for="platform of group.platforms" :key="platform.name" class="chip">
            <img :src="'/homepage/supported-platforms/' + platform.src" alt="" />
            {{ platform.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

/* Rows shared with the features card (see .home-pair in HomePage.vue) */
.section-tag { grid-row: 1; }
h2 { grid-row: 2; }
.sub-header { grid-row: 3; }
.platform-groups { grid-row: 4; }

h2, .sub-header {
  text-align: center;
}

.platform-groups {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.platform-group-label {
  margin-bottom: 10px;

  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
  color: var(--vp-c-text-3);
}

</style>
