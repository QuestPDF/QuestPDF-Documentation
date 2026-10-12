<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Enterprise</div>
      <h2>The questions we get before every purchase</h2>
      <p class="sub-header">Here is the reply, so your security team can read it now and you can forward it later.</p>
    </div>

    <div class="layout">
      <!-- the reply as a mail message: a header strip, then short bullet answers -->
      <div class="card mail">
        <div class="mail-head">
          <div class="mail-row"><span class="mail-key">From</span><span>QuestPDF</span></div>
          <div class="mail-row"><span class="mail-key">To</span><span>Your security team</span></div>
          <div class="mail-row"><span class="mail-key">Subject</span><span class="mail-subject">Re: Security questions before purchase</span></div>
        </div>

        <div class="mail-body">
          <p>Thanks for the questions. The short answers:</p>
          <ul>
            <li v-for="item of answers" :key="item.label">
              <strong>{{ item.label }}</strong> {{ item.text }}
            </li>
          </ul>
          <p>Happy to answer anything else.</p>
        </div>
      </div>

      <div class="aside">
        <div class="aside-item" v-for="item of links" :key="item.href">
          <div class="t-icon"><i class="fa-regular" :class="item.icon"></i></div>
          <div>
            <div class="aside-title">{{ item.title }}</div>
            <a class="t-link" :href="item.href">{{ item.link }} <i class="fa-regular fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const answers = [
  { label: "Telemetry:", text: "none. QuestPDF makes no network calls of any kind." },
  { label: "License server:", text: "none. There is nothing to reach and nothing to whitelist." },
  { label: "Air-gapped:", text: "yes. The library runs entirely inside your application process." },
  { label: "Source code:", text: "all of it is on GitHub. The native dependencies, Skia and qpdf, are built from source in our CI." },
  { label: "Standards:", text: "PDF/A-2 and PDF/A-3 at levels b, u and a, PDF/UA-1, ZUGFeRD and Factur-X, validated with veraPDF and Mustang on every build." }
];

const links = [
  { icon: "fa-shield-check", title: "The full statement, in writing", link: "Security policy", href: "/security-policy.html" },
  { icon: "fa-code", title: "The code your team can audit", link: "Repository on GitHub", href: "https://github.com/QuestPDF/QuestPDF" },
  { icon: "fa-sliders", title: "How a standard is switched on", link: "Document settings", href: "/concepts/document-settings.html" }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.layout {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 32px;
  width: 100%;
  margin-top: 32px;
  align-items: start;
}

/* the shared card sets padding and start alignment; the mail is full-bleed and stretched */
.card.mail {
  padding: 0;
  align-items: stretch;
  overflow: hidden;
}

.mail-head {
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--home-surface-inner);
  font-size: 0.9375rem;
  line-height: 1.25rem;
}

.mail-row {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 12px;
  color: var(--vp-c-text-2);
}

.mail-key {
  color: var(--vp-c-text-3);
}

.mail-subject {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.mail-body {
  padding: 24px 28px 28px;
  font-size: 1rem;
  line-height: 1.625rem;
  color: var(--vp-c-text-2);
}

.mail-body p {
  margin: 0;
}

.mail-body ul {
  margin: 16px 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mail-body strong {
  color: var(--vp-c-text-1);
}

.aside {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 8px;
}

.aside-item {
  display: flex;
  gap: 16px;
  align-items: center;
}

.aside-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
}

.aside .t-link {
  font-size: 0.9375rem;
}

.aside .t-link i {
  font-size: 0.75rem;
}

@media screen and (max-width: 960px) {
  .layout { grid-template-columns: minmax(0, 1fr); }
  .aside { padding-top: 0; }
}

</style>
