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
      Supports all major operating systems and works seamlessly with leading IDEs, cloud platforms, and modern development tools.
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
  display: flex;
  flex-direction: row;
  align-content: center;
  flex-wrap: wrap;
  gap: 32px;
  margin-top: 24px;
}

.icons > img {
  height: 48px;
}

@media screen and (max-width: 700px) {
  .icons {
    gap: 24px;
  }

  .icons > img {
    height: 40px;
  }
}

</style>