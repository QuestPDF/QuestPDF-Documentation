<template>
  <section class="content">
    <article class="statistic" v-for="statistic in statistics" :key="statistic.label">
      <img class="icon" :src="statistic.icon" alt="" />

      <div class="title">
        <span class="value">{{ statistic.value }}</span>
        <span class="label">{{ statistic.label }}</span>
      </div>
    </article>
  </section>
</template>

<script setup>

const statistics = [
    {
        icon: "/homepage/stargazers.svg",
        label: "GitHub stargazers",
        value: "12 200 +"
    },
    {
        icon: "/homepage/downloads.svg",
        label: "NuGet package downloads",
        value: "7 300 000 +"
    }
];

</script>

<style scoped>

.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 128px;
}

@media screen and (max-width: 750px) {
  .content {
    flex-direction: column;
    justify-content: center;
    gap: 64px;
  }
}

.statistic {
  display: flex;
  flex-direction: row;
  justify-items: center;
  gap: 24px;
}

.statistic img.icon {
  height: 64px;
  width: 64px;
}

.statistic .title {
  display: flex;
  flex-direction: column;
  justify-self: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: -4px;
}

.statistic span.value {
  margin: 0;

  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  font-size: 2rem;
  font-weight: 600;
}

.statistic span.label {
  justify-self: start;
  align-self: start;

  color: var(--vp-c-text-2);
  font-size: 1.2rem;
}

@media screen and (max-width: 700px) {
  .statistic img.icon {
    height: 48px;
    width: 48px;
  }

  .statistic span.value {
    font-size: 1.75rem;
  }
}

</style>