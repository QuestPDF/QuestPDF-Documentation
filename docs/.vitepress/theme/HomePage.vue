<template>
  <div class="reverse">
    <div class="container">

      <section style="display: flex; flex-direction: column;">
        <h2 class="title">What is QuestPDF?</h2>

        <div class="library-details" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 64px;">
          <div>
            <p>QuestPDF is an open-source .NET library for PDF generation.</p>

            <p>Utilizing several new concepts and approaches, QuestPDF seeks to resolve the challenges inherent in this process. To make implementation as straightforward as possible, the library features a C# Fluent API.</p>

          </div>

          <p>Additionally, the QuestPDF Previewer expedites the development cycle by providing a hot-reload capability, allowing real-time results without recompiling code. Finally, the document structure is rendered through a comprehensive and flexible layout engine.</p>
        </div>
      </section>

      <div class="statistics">

        <section class="statistics-card">
          <img class="icon" src="custom/star-stat.svg" />
          <span class="value">4 450+</span>
          <span class="label">GitHub stargazers</span>
        </section>

        <section class="statistics-card">
          <img class="icon" src="custom/download-stat2.svg" />
          <span class="value">700 000+</span>
          <span class="label">Nuget download</span>
        </section>

        <section class="statistics-card">
          <img class="icon" src="custom/update-stat2.svg" />
          <span class="value">40+</span>
          <span class="label">Library updates</span>
        </section>

      </div>

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
    <h2 class="title">What you need is here</h2>

    <div class="targets">

      <section class="target-card">
        <img class="icon" src="custom/community2.svg" />
        <h3 class="title">Loved by developers</h3>
        <p class="details">This library is created specifically for designing and arranging document layouts, with full paging support. Alternative solutions, such as HTML-based converters, are not designed for this purpose and therefore are often unpredictable and do not produce desired results.</p>
      </section>

      <section class="target-card">
        <img class="icon" src="custom/success2.svg" />
        <h3 class="title">Trusted by business</h3>
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

      <div class="features">

        <section class="feature-card">
          <img class="icon" src="custom/settings.svg" />
          <h3 class="title">Comprehensive layout engine</h3>
          <p class="details">Utilize a layout engine specifically designed for document generation, with full paging support. It gives you high control over the content, optimizes the document's visual structure, and makes your code more flexible.</p>
        </section>

        <section class="feature-card">
          <img class="icon" src="custom/server2.svg" />
          <h3 class="title">Multiplatform</h3>
          <p class="details">Feel free to use your preffered code editor (JetBrains Rider, Visual Studio, VS Code, etc.). Run your software on any operating system (Windows, Linux, macOS), cloud platforms (e.g. Azure, AWS), device types (desktop, tablets, phones) and even web browser (via WebAssembly).</p>
        </section>

        <section class="feature-card">
          <img class="icon" src="custom/puzzle.svg" />
          <h3 class="title">Reusable code</h3>
          <p class="details">Make your code more manageable by dividing it into classes and methods, exactly how you do it with other features and functionalities. You don't need to learn more skills to make your implementation beautiful.
          </p>
        </section>

        <section class="feature-card">
          <img class="icon" src="custom/maintain.svg" />
          <h3 class="title">Efficient maintenance</h3>
          <p class="details">Follow the code-only approach to have better understanding of changes and implementation history. Use your preffered version control system to easily manage fixes, adjustments and improvements. Never get lost in proprietary binary formats or complex HTML implementations.</p>
        </section>

        <section class="feature-card">
          <img class="icon" src="custom/paint2.svg" />
          <h3 class="title">Quick prototyping</h3>
          <p class="details">Design and adjust visual content using the QuestPDF Previewer tool. It utilizes a hot-reload capability to preview your document without code re-compilation. Use the inspector tool to better understand the layout and its structure.</p>
        </section>

        <section class="feature-card">
          <img class="icon" src="custom/speed.svg" />
          <h3 class="title">High performance</h3>
          <p class="details">Enjoy high performance and low resource usage thanks to highly optimized layout engine and graphical library. Generate even 1000 PDF files per minute per core with a thread-safe process.</p>
        </section>

        <section class="feature-card">
          <img class="icon" src="custom/book.svg" />
          <h3 class="title">Rewarding learning</h3>
          <p class="details">Quickly go into action and learn library essential features by reading the Getting Started tutorial. Learn more advanced concepts with constantly improving documentation and hundreds of code examples.</p>
        </section>

        <section class="feature-card">
          <img class="icon" src="custom/intellisense.svg" />
          <h3 class="title">Discoverable Fluent API</h3>
          <p class="details">The library uses the FluentAPI code style that makes your code more concise and easier to understand. The IntelliSense mechanism available in all major IDEs helps you writing the code efficiently and discover new features.</p>
        </section>

        <section class="feature-card">
          <img class="icon" src="custom/language.svg" />
          <h3 class="title">Advanced languages support</h3>
          <p class="details">Easily create multilangual documents with advanced text style support, including right-to-left languages (RTL) as well as languages requiring text shaping to properly display glyphs (e.g. Arabic).</p>
        </section>
      </div>
    </div>
  </div>

<!--  <div class="container">-->
<!--    <h2 class="title">Library that truly helps</h2>-->

<!--    <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 64px;">-->
<!--      <div class="recommendation">-->
<!--        <p class="recommendation&#45;&#45;quote">This library is amazing, we recently did a small prototype to test RTL and Arabic support, we were impressed with it. Coming from a background where I have used Microsoft Report Designer, Crystal Reports and Fast Reports, this library is better than them all.</p>-->
<!--        <p class="recommendation&#45;&#45;author">Toss_A_Coin_Yo</p>-->
<!--      </div>-->

<!--      <div class="recommendation">-->
<!--        <p class="recommendation&#45;&#45;quote">Thanks for your hard work, I really appreciate QuestPDF! One of the most professional, high quality open-source PDFs library I came across so far!</p>-->
<!--        <p class="recommendation&#45;&#45;author">kbmkbm</p>-->
<!--      </div>-->

<!--      <div class="recommendation">-->
<!--        <p class="recommendation&#45;&#45;quote">Recently made use of this library over another older library and have to say it was a joy to work with. The previewer tool makes making small changes and designing documents such a nice task when matched up with hot reload.</p>-->
<!--        <p class="recommendation&#45;&#45;author">Lawwley</p>-->
<!--      </div>-->

<!--      <div class="recommendation">-->
<!--        <p class="recommendation&#45;&#45;quote">I have been monitoring this project for a couple of years and finally had the chance to utilize it. Initial thoughts are that it is amazing. Thank you for the incredible amount of work you have put into this!</p>-->
<!--        <p class="recommendation&#45;&#45;author">yooperdev</p>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->

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



.library-details p {
  color: var(--vp-c-text-2);

  line-height: 24px;
  font-size: 1rem;

  margin-bottom: 1rem;
}



.targets {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 96px;

  margin-top: 64px;
}

.target-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  /*background-color: var(--vp-c-bg-soft);*/
  /*border: 1px solid var(--vp-c-divider-light);*/
  /*border-radius: 12px;*/
  /*padding: 32px;*/
}

.target-card img.icon {
  align-self: center;
  height: 96px;

  /*filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1));*/
}

.target-card h3 {
  text-align: center;
}

.target-card p.details {
  text-align: justify;
}




.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 64px 96px;

  margin-top: 64px;
}

.feature-card {
  display: grid;
  grid-template-areas:
      "icon title"
      "icon description";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 8px 24px;
}

@media screen and (max-width: 1000px) and (min-width: 700px) {
  .feature-card {
    grid-template-areas:
      "icon"
      "title"
      "description";
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
    grid-gap: 8px 0;
  }
}

.feature-card img.icon {
  grid-area: icon;

  justify-self: start;
  align-self: start;
  height: 48px;
  width: 48px;
}

.feature-card h3.title {
  grid-area: title;

  margin: 0;
}

.feature-card p.details {
  grid-area: description;

  justify-self: start;
  align-self: start;
}





.statistics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 64px;

  margin: 64px 0;
}

.statistics-card {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 4px 24px;
}

.statistics-card img.icon {
  grid-column: 1;
  grid-row: 1 / span 2;

  justify-self: start;
  align-self: start;
  height: 48px;
  width: 48px;
}

.statistics-card span.value {
  grid-column: 2;
  grid-row: 1;
  margin: 0;

  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
  font-weight: 500;
}

.statistics-card span.label {
  grid-column: 2;
  grid-row: 2;
  justify-self: start;
  align-self: start;

  color: var(--vp-c-text-2);
  font-size: 1rem;
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

  line-height: 24px;
  font-size: 1rem;
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