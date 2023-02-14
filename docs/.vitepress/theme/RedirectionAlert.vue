<template>
  <a :href="link" target="_blank">
    <div class="alert warning custom-block redirection-alert">
      <img :src="icon" style="width: 32px;" />
      <div>{{ content }}</div>
    </div>
  </a>
</template>

<script setup>
defineProps(["icon", "content", "link"])
</script>


<style scoped>

.redirection-alert {
  width: 100%;

  padding: 16px;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 16px;
  place-items: center start;
}

</style>