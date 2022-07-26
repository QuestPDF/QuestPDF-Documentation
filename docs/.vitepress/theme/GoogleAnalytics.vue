<template>
  wefwef
</template>

<script setup>
import { useRouter } from 'vitepress';
import { watch } from 'vue';
import { onMounted } from 'vue';

function addGoogleAnalyticsScript() {
  const plugin = document.createElement("script");

  plugin.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-WPSQH44KB7");
  plugin.async = true;

  document.head.appendChild(plugin);
}

async function registerGoogleAnalyticsListener() {
  // register listener
  window.dataLayer = window.dataLayer || [];

  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-WPSQH44KB7');

  // watch current route changes
  const router = useRouter();
  watch(() => router.route.data.relativePath, handleViewChange, { immediate: true });

  function handleViewChange(path) {
    gtag('set', 'page_path', path);
    gtag('event', 'page_view');
  }
}

onMounted(() => {
  if (typeof window === 'undefined')
    return;

  addGoogleAnalyticsScript();
  registerGoogleAnalyticsListener();
});

</script>