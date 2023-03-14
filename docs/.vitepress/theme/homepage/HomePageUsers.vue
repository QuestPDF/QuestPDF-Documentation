<template>
  <section class="content">
    <h2>What you need is here</h2>

    <div class="user-groups">
      <article class="user-group" v-for="group in UserGroupsContent">
        <img class="icon" :src="group.icon" alt="" />
        <h3 class="title">{{ group.label }}</h3>
        <p class="details">{{ group.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>

import { UserGroupsContent } from './configuration';

</script>

<style scoped>

.user-groups {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 64px 96px;

  margin-top: 64px;
}

@media screen and (max-width: 700px) {
  .user-groups {
    grid-template-columns: 1fr;
  }
}

.user-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-group img.icon {
  align-self: center;
  height: 96px;
}

.user-group h3 {
  text-align: center;
}

.user-group p.details {
  text-align: justify;
}

@media screen and (max-width: 700px) {
  .user-group img.icon {
    height: 72px;
  }
}


</style>