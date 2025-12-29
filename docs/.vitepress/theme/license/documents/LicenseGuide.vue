<template>
  <document-template>
    <template #header>
      <h1><span class="highlight-foreground">QuestPDF</span> License Selection Guide</h1>

      <p class="description">Welcome to QuestPDF! This guide will help you understand how to select the appropriate license for our library, based on your usage context.</p>

      <p class="description">The licensing options for QuestPDF include the Community MIT license (which is free), and two tiers of paid licenses: the Professional License and the Enterprise License.</p>

      <a class="action primary" href="/license/" style="margin-top: 16px;">Purchase license</a>
    </template>

    <template #content>
      <section>
        <h3>License Equality</h3>
        <p>We believe in offering the full power of QuestPDF to all our users, regardless of the license they choose. Whether you're operating under our Community MIT, Professional, or Enterprise licenses, you can enjoy the same comprehensive range of features:</p>

        <ul>
          <li>- Full access to all QuestPDF features.</li>
          <li>- Support for commercial usage.</li>
          <li>- Freedom to create and deploy unlimited closed-source projects, applications, and APIs.</li>
          <li>- Royalty-free redistribution of the compiled library with your applications.</li>
        </ul>
      </section>

      <section>
        <h3>Transitive Dependency Usage</h3>
        <p>If you're using QuestPDF as a transitive dependency, you're free to use it under the <a class="license-link" href="/license/community">Community MIT License</a> without any cost. However, you're welcomed and encouraged to support the project by purchasing a paid license if you find the library valuable.</p>
      </section>

      <section>
        <h3>Non-profit Usage</h3>
        <p>If you represent an open-source project, a charitable organization, or are using QuestPDF for educational purposes or training courses, you can also use QuestPDF for free under the <a class="license-link" href="/license/community">Community MIT License</a>.</p>
      </section>

      <section>
        <h3>Small Businesses</h3>

        <p>For companies generating less than $1M USD in annual gross revenue, you can use QuestPDF under the <a class="license-link" href="/license/community">Community MIT License</a> for free.</p>
      </section>

      <section>
        <h3>Larger Businesses</h3>
        <p>Companies with an annual gross revenue exceeding $1M USD are required to purchase a paid license. The type of license you need depends on the number of developers working on projects that use QuestPDF.</p>

        <p><a class="license-link" href="/license/professional-enterprise">Professional License</a> - If there are up to 10 developers in your company who are using QuestPDF, you need to purchase the Professional License.</p>

        <p><a class="license-link" href="/license/professional-enterprise">Enterprise License</a> - If your company has more than 10 developers using QuestPDF, the Enterprise License is the right choice.</p>
      </section>

      <section>
        <h3>Beyond Compliance</h3>
        <p>Remember, purchasing a license isn't just about adhering to our guidelines, but also supporting the development of QuestPDF. Your contribution helps us to improve the library and offer top-notch support to all users.</p>
      </section>
    </template>
  </document-template>
</template>

<script setup>
import DocumentTemplate from "./DocumentTemplate.vue";
</script>

<style scoped>

</style>
