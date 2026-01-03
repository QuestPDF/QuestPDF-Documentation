<script setup>

const platforms = [
  { src: 'windows.svg', name: 'Windows' },
  { src: 'linux.svg', name: 'Linux' },
  { src: 'apple.svg', name: 'macOS' },
  { src: 'azure.svg', name: 'Azure' },
  { src: 'aws.svg', name: 'AWS' },
  { src: 'docker.svg', name: 'Docker' },
  { src: 'rider.svg', name: 'Rider' },
  { src: 'vscode.svg', name: 'VS Code' },
  { src: 'visual-studio.svg', name: 'Visual Studio' }
];

</script>

<template>
  <section class="content">
    <div class="section-header">
      <h2>Works everywhere you do</h2>
      <p class="sub-header">Deploy on any major operating system and integrate seamlessly with your favorite IDEs, cloud platforms, and development tools.</p>
    </div>

    <div class="platforms">
      <div v-for="platform of platforms" class="platform-item">
        <img :src="'/homepage/supported-platforms/' + platform.src" :alt="platform.name" :title="platform.name" />
        <span class="platform-name">{{ platform.name }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.platforms {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  width: 100%;
  max-width: 800px;
  align-self: center;
  justify-content: center;
}

@media screen and (max-width: 600px) {
  .platforms {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

.platform-item {
  width: 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  border: 1px solid #8882;
  border-radius: 12px;

  padding: 16px;
  align-content: center;
}

.platform-item img {
  width: 48px;
  height: 48px;
}

.platform-name {
  font-size: 0.875rem;
  line-height: 1rem;
  text-align: center;
}

@media screen and (max-width: 600px) {
  .platform-item {
    width: 100px;
  }

  .platform-item img {
    width: 36px;
    height: 36px;
  }
}

@media screen and (max-width: 380px) {
  .platforms {
    gap: 12px;
  }

  .platform-item {
    width: 100px;
    padding: 16px 8px;
  }

  .platform-item img {
    width: 36px;
    height: 36px;
  }
}

</style>