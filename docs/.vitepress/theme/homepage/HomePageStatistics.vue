<template>
  <section class="content">
    <div class="section-header">
      <h2>Trusted by the .NET Community</h2>
      <p class="sub-header">Join thousands of developers and organizations worldwide building PDF solutions with QuestPDF</p>
    </div>

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
        value: "13 650 +"
    },
    {
        icon: "/homepage/nuget.svg",
        label: "NuGet package downloads",
        link: "https://www.nuget.org/packages/QuestPDF/",
        value: "15 000 000 +"
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  flex-direction: row;
  justify-content: center;
}

@media screen and (max-width: 750px) {
  .statistics {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
  }
}

.statistic {
  display: flex;
  flex-direction: row;
  justify-items: center;
  gap: 24px;

  border: 1px solid #8882;
  border-radius: 12px;
  padding: 24px;
}

.statistic img.icon {
  height: 48px;
  width: 48px;
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
  font-size: 1.75rem;
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
    font-size: 1.5rem;
  }
}

</style>
