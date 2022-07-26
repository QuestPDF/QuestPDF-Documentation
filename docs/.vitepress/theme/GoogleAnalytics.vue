<template>
  <component :is="'script'">
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-L6Z2378WVB');
  </component>
</template>

<script setup>
import { useRouter } from 'vitepress';
import { watch } from 'vue';
import { onMounted } from 'vue';

function addGoogleAnalyticsScript() {
  const plugin = document.createElement("script");

  plugin.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-L6Z2378WVB");
  plugin.async = true;

  document.head.appendChild(plugin);
}

function registerViewChangeListener() {
  if (typeof window === 'undefined')
    return;

  const router = useRouter();
  watch(() => router.route.data.relativePath, handleViewChange, { immediate: true });

  function handleViewChange(path) {
    if (!window.ga)
      return;

    window.ga('set', 'page', path);
    window.ga('send', 'pageview');
  }
}

onMounted(() => {
  addGoogleAnalyticsScript();
  registerViewChangeListener();
});

</script>