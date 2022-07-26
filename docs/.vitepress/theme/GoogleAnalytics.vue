<template>
  <component :is="'script'">
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-L6Z2378WVB');
  </component>
</template>

<script>
export default {
  mounted() {
    const plugin = document.createElement("script");

    plugin.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-L6Z2378WVB");
    plugin.async = true;

    document.head.appendChild(plugin);
  }
};
</script>