<template>
  <section class="content">
    <h2>Trusted by the .NET Community</h2>

    <div class="statistics">
      <template v-for="statistic in statistics" :key="statistic.label">
        <a :href="statistic.link" target="_blank">
          <article class="statistic">
            <img class="icon" :src="statistic.icon" alt="" />

            <div class="title">
              <span class="value">{{ statistic.value }}</span>
              <span class="label">{{ statistic.label }}</span>
            </div>
          </article>
        </a>
      </template>
    </div>
  </section>
</template>

<script setup>

const statistics = [
    {
        icon: "/homepage/github.svg",
        label: "GitHub stargazers",
        link: "https://github.com/QuestPDF/QuestPDF",
        value: "13 000 +"
    },
    {
        icon: "/homepage/nuget.svg",
        label: "NuGet package downloads",
        link: "https://www.nuget.org/packages/QuestPDF/",
        value: "10 500 000 +"
    }
];

</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.statistics {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 128px;
}

@media screen and (max-width: 750px) {
  .statistics {
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