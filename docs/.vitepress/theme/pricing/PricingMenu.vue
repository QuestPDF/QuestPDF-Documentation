<script setup lang="ts">

interface LicensePage {
    link: string;
    image: string;
    title: string;
    description: string;
    buttonText: string;
}

const licensePages : LicensePage[] = [
    {
        link: "/license/guide",
        image: "/pricing/selection.svg",
        title: "License Selection Guide",
        description: "Explore our detailed article covering all rules related to the three available QuestPDF licenses. We did out best to simplify all nuances.",
        buttonText: "Read guide"
    },
    {
        link: "/pricing/survey",
        image: "/pricing/survey.svg",
        title: "Not sure which license to choose?",
        description: "Answer a few quick questions and our survey tool will suggest the most suitable license for your use-case, as well as provide all necessary details.",
        buttonText: "Take survey"
    }
]

</script>

<template>

<section>
  <h2>Let us help</h2>

  <div class="menu">
    <template v-for="licensePage of licensePages">
      <a :href="licensePage.link">
        <article  class="menu-item card">
          <img :src="licensePage.image" alt="">
          <h3>{{ licensePage.title }}</h3>
          <p>{{ licensePage.description }}</p>
          <a class="action" :href="licensePage.link">{{ licensePage.buttonText }}</a>
        </article>
      </a>
    </template>
  </div>
</section>

</template>

<style scoped>

.menu {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr));
  gap: 48px;
}

.menu-item {
  display: grid;
  grid-template-areas:
        "icon title"
        "icon description"
        "_ action";
  grid-gap: 8px;
  gap: 8px;
}

@media screen and (max-width: 450px) {
  .menu-item {
    display: flex;
    flex-direction: column;
  }
}

.menu-item img {
  grid-area: icon;
  align-self: start;
  height: 56px;
  margin-right: 16px;
  margin-bottom: 16px;
}

.menu-item h3 {
  grid-area: title;
  margin-top: 0;
}

.menu-item p {
  grid-area: description;
}

.menu-item a {
  margin-top: 32px;
  grid-area: action;
  align-self: end;
  justify-self: end;
}

</style>