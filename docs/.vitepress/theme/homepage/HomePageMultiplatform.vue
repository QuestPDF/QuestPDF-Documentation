<script setup>

const platforms = [
  { src: 'windows.svg', alt: 'Windows' },
  { src: 'linux.svg', alt: 'Linux' },
  { src: 'apple.svg', alt: 'macOS' },
  { src: 'docker.svg', alt: 'Docker' },
  { src: 'azure.svg', alt: 'Azure' },
  { src: 'aws.svg', alt: 'AWS' },
  { src: 'rider.svg', alt: 'Rider' },
  { src: 'vscode.svg', alt: 'VS Code' },
  { src: 'visual-studio.svg', alt: 'Visual Studio' }
];

</script>

<template>
  <section class="content">
    <h2>Multiplatform</h2>

    <p class="sub-header" style="max-width: 600px;">
      The library supports all major operating systems, integrates seamlessly with leading IDEs as well as popular cloud platforms and technologies to ensure maximum flexibility.
    </p>

    <div class="icons">
      <img v-for="platform of platforms" :src="'/homepage/supported-platforms/' + platform.src" :alt="platform.alt" :title="platform.alt" />
    </div>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
}

.icons {
  display: flex; flex-direction: row; align-content: center; gap: 32px; margin-top: 24px;
}

.icons > img {
  height: 48px;
}

</style>