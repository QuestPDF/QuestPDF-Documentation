<template>
  <div class="reverse">
    <div class="container">

      <section style="display: flex; flex-direction: column;">
        <h2 class="title">What is QuestPDF?</h2>

        <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 64px;">
          <p class="details">It offers a layouting engine designed with a full paging support in mind. The document consists of many simple elements (e.g. border, background, image, text, padding, table, grid etc.) that are composed together to create more complex structures. </p>

          <p class="details">This way, as a developer, you can understand the behavior of every element and use them with full confidence. Additionally, the document and all its elements support paging functionality. For example, an element can be moved to the next page (if there is not enough space) or even be split between pages like table's rows.</p>
        </div>
      </section>

      <div class="video-container">
        <video class="video" autoplay controls muted loop>
          <source src="previewer/video.mp4" type="video/mp4">
        </video>
      </div>
    </div>
  </div>

<!--  <div class="reverse">-->
<!--    <div class="container">-->

<!--      <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 32px;">-->
<!--        <div style="display: flex; align-content: center;">-->
<!--          <img src="custom/invoice.png" style="max-width: 384px; max-height: 384px; place-self: center" />-->
<!--        </div>-->

<!--        <section style="display: flex; flex-direction: column;">-->
<!--          <h2 class="title">What the community loves</h2>-->
<!--          <p class="details">This library is created specifically for designing and arranging document layouts, with full paging support. Alternative solutions, such as HTML-based converters, are not designed for this purpose and therefore are often unpredictable and do not produce desired results.</p>-->
<!--        </section>-->
<!--      </div>-->

<!--    </div>-->
<!--  </div>-->

  <div class="container">
    <h2 class="title">Two sides of QuestPDF</h2>

    <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 32px;">

      <section class="card">
        <img class="icon" src="custom/engine.svg" />
        <h3 class="title">What the community loves</h3>
        <p class="details">This library is created specifically for designing and arranging document layouts, with full paging support. Alternative solutions, such as HTML-based converters, are not designed for this purpose and therefore are often unpredictable and do not produce desired results.</p>
      </section>

      <section class="card">
        <img class="icon" src="custom/layers.svg" />
        <h3 class="title">What the business needs</h3>
        <p class="details">The entire process of implementing PDF document, takes place in your code. Free yourself from slow visual designers and strange technological limitations. Follow simple yet highly effective approaches to create maintainable, high-quality code.</p>
      </section>

    </div>

  </div>

<!--  <div class="reverse">-->
<!--    <div class="container">-->

<!--      <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 32px;">-->
<!--        <section style="display: flex; flex-direction: column;">-->
<!--          <h2 class="title">Companion app</h2>-->
<!--          <p class="details">This library is created specifically for designing and arranging document layouts, with full paging support. Alternative solutions, such as HTML-based converters, are not designed for this purpose and therefore are often unpredictable and do not produce desired results.</p>-->
<!--        </section>-->

<!--        <img class="companion-screenshot" />-->
<!--      </div>-->

<!--    </div>-->
<!--  </div>-->

  <div class="reverse">

    <div class="container">

      <h2 class="title">Designed to be efficient</h2>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; grid-gap: 32px;">

        <section class="card">
          <img class="icon" src="custom/engine.svg" />
          <h3 class="title">Rely on solid fundamentals</h3>
          <p class="details">This library is created specifically for designing and arranging document layouts, with full paging support.</p>
        </section>

        <section class="card">
          <img class="icon" src="custom/layers.svg" />
          <h3 class="title">Work with organized code</h3>
          <p class="details">The entire process of implementing PDF document, takes place in your code. Free yourself from slow visual designers and strange technological limitations. </p>
        </section>

        <section class="card">
          <img class="icon" src="custom/extend.svg" />
          <h3 class="title">Compose simple components into complex documents</h3>
          <p class="details">Do you remember the feeling when your code just works? When your ideas are becoming real without any effort?</p>
        </section>

        <section class="card">
          <img class="icon" src="custom/compose.svg" />
          <h3 class="title">Create and reuse components</h3>
          <p class="details">Feel no fear of complex documents! Create custom, reusable components and divide the document's layout into easy to maintain pieces.</p>
        </section>

        <section class="card">
          <img class="icon" src="custom/prototype.svg" />
          <h3 class="title">Prototype with ease</h3>
          <p class="details">We understand that document generation is often tricky and require multiple iterations. The library offers additional prototyping tools such as random text generator or image placeholder element.</p>
        </section>

        <section class="card">
          <img class="icon" src="custom/performance.svg" />
          <h3 class="title">Enjoy fast PDF generation</h3>
          <p class="details">QuestPDF is created upon SkiaSharp, a well-known graphical library, and converts your data into PDF documents.</p>
        </section>

      </div>
    </div>
  </div>

  <div class="container">
    <h2 class="title">Library that truly helps</h2>

    <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 64px;">
      <div class="recommendation">
        <p class="recommendation--quote">This library is amazing, we recently did a small prototype to test RTL and Arabic support, we were impressed with it. Coming from a background where I have used Microsoft Report Designer, Crystal Reports and Fast Reports, this library is better than them all.</p>
        <p class="recommendation--author">Toss_A_Coin_Yo</p>
      </div>

      <div class="recommendation">
        <p class="recommendation--quote">Thanks for your hard work, I really appreciate QuestPDF! One of the most professional, high quality open-source PDFs library I came across so far!</p>
        <p class="recommendation--author">kbmkbm</p>
      </div>

      <div class="recommendation">
        <p class="recommendation--quote">Recently made use of this library over another older library and have to say it was a joy to work with. The previewer tool makes making small changes and designing documents such a nice task when matched up with hot reload.</p>
        <p class="recommendation--author">Lawwley</p>
      </div>

      <div class="recommendation">
        <p class="recommendation--quote">I have been monitoring this project for a couple of years and finally had the chance to utilize it. Initial thoughts are that it is amazing. Thank you for the incredible amount of work you have put into this!</p>
        <p class="recommendation--author">yooperdev</p>
      </div>
    </div>
  </div>

</template>

<script setup>

</script>

<style scoped>

.video-container {
  background-image: conic-gradient(#EEE 0deg, #CCC 90deg, #2979FF55 135deg, #CCC 180deg, #EEE 270deg, #EEE 360deg);
  padding: 64px;
  border-radius: 12px;
  margin-top: 32px;
}

html.dark .video-container {
  background-image: conic-gradient(#444 0deg, #333 90deg, #2979FF33 135deg, #3333 180deg, #444 270deg, #444 360deg);
}

.video {
  border-radius: 12px;
  filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1));
}

.container {
  padding: 96px 0;
  margin: 0 auto;
  max-width: 1152px;
}

.reverse {
  background-color: var(--vp-c-bg-soft);
}

.reverse .card {
  background-color: var(--vp-c-bg);
}

.card {
  background-color: var(--vp-c-bg-soft);
  /*border: 1px solid var(--vp-c-divider-light);*/
  border-radius: 12px;
  padding: 32px;
}

.card img.icon {
  max-height: 48px;
  max-width: 48px;

  filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1));
}

h2.title {
  font-family: var(--vp-font-family-base);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.5rem;
  margin-bottom: 2rem;
}

h3.title {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.5rem;
  margin: 18px 0 4px 0;
}

p.details {
  color: var(--vp-c-text-2);
  padding-top: 8px;
  line-height: 24px;
  font-size: 1rem;
}




.companion-screenshot {
  border-radius: 20px;
  content: url(custom/companion_light.png);
}

html.dark .companion-screenshot {
  content: url(custom/companion_dark.png);
}



.recommendation--quote {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  font-style: italic;
  font-weight: 400;
  line-height: 1.5rem;
  margin: 18px 0 4px 0;
}


.recommendation--author {
  color: var(--vp-c-text-1);
  padding-top: 8px;
  line-height: 24px;
  font-size: 1rem;
}

</style>