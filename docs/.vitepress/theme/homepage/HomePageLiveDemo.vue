<template>
  <section class="panel live-demo">
    <h2>Experience the Simplicity</h2>
    <p class="sub-header">See how QuestPDF's Fluent API lets you build professional documents with just a few lines of readable, intuitive C# code.</p>

    <!-- the animation plays on its own page (live-demo.md), which starts it automatically -->
    <a class="action primary watch" href="/live-demo.html">
      <i class="fa-solid fa-play" />
      Watch Live Demo
      <div class="divider"></div>
      <span>~90 sec</span>
    </a>
  </section>
</template>

<style scoped>

.live-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h2, .sub-header {
  max-width: 560px;
  text-align: center;
}

.action.watch {
  display: flex;
  align-items: center;
  gap: 16px;
  width: fit-content;
  padding: 4px 24px;
}

.action.watch i {
  color: white;
}

.action.watch .divider {
  border-left: 1px solid #FFF8;
  margin: 8px 0;
  height: 20px;
}

.action.watch span {
  font-weight: 400;
}

</style>
