<script setup lang="ts">
import {usePaddle} from "./paddle";
import {onMounted} from "vue";

onMounted(() => {
  if (typeof window === 'undefined')
    return;

  usePaddle();
})
</script>

<template>

</template>

<style scoped>

</style>