# Roadmap

QuestPDF is built to be a dependable, long-term foundation for generating PDF documents in code. This page outlines where the library is heading — the capabilities we're actively building and the direction we're committed to over the coming releases.

We intentionally don't attach fixed dates to roadmap items. Priorities are shaped by real-world needs, enterprise requirements, and our commitment to shipping each feature at a high level of quality and stability. Some items below may land in the very next release; others represent a direction we'll grow into over a longer horizon. What stays constant is the pace: QuestPDF ships continuously, and the [Recently delivered](#recently-delivered) section shows what that looks like in practice.

Have a feature you'd like to see prioritized? We track community input through [GitHub Discussions](https://github.com/QuestPDF/QuestPDF/discussions) — your feedback directly informs what we build next.


## In progress

What we're actively building right now.

- **Support for more platforms and languages.** Foundational work is underway to bring the QuestPDF API to runtimes and languages beyond .NET, so more teams can rely on the same document engine regardless of their technology stack.

- **Native AOT compilation support.** Full compatibility with .NET Native AOT. AOT compilation delivers faster startup times, smaller self-contained deployments, and a lower memory footprint — increasingly important for serverless functions, containerized services, and high-density cloud workloads. This removes a key adoption barrier for teams standardizing on AOT-first architectures.

- **Introductory video and learning materials.** A concise video walkthrough of QuestPDF fundamentals, from your first document to real-world layouts. The goal is to shorten the path from evaluation to productive use — particularly for developers and teams adopting the library for the first time.


## Up next

Confirmed direction for upcoming releases. These items are planned and prioritized; exact timing depends on scope and dependencies.

- **Sample gallery with ready-to-use code.** A curated gallery of copy-and-paste code samples covering the most common document types — invoices, reports, certificates, and more — with complete, working implementations. Less boilerplate, faster implementation, and a proven starting point instead of a blank page.

- **Expanded and improved documentation.** Continued investment in documentation: broader coverage, clearer explanations, more end-to-end examples, and deeper guidance for advanced scenarios. Strong documentation lowers onboarding cost and reduces day-to-day friction for every team using QuestPDF.

- **Built-in PDF validation with veraPDF.** A first-class, built-in way to validate your generated documents against conformance standards using veraPDF — giving teams a straightforward, automated path to verify compliance directly within their own build and QA pipelines.


## Future

Future development plans include:

- **PDF signing with X.509 certificates.** Built-in support for digitally signing documents using `X509Certificate` certificates. Digital signatures provide authenticity and tamper-evidence — a common requirement for contracts, invoices, and official documents across finance, legal, and government.

- **PDF/A-4 and PDF/UA-2 conformance.** Support for the latest archival (PDF/A-4) and accessibility (PDF/UA-2) standards, building directly on the existing PDF/A-2, PDF/A-3, and PDF/UA-1 support. Essential for regulated industries, the public sector, and any organization with long-term archival or accessibility obligations.

- **Increased test coverage.** Ongoing expansion of the automated test suite across more layouts, edge cases, and rendering scenarios. Higher coverage translates directly into greater stability and predictability from release to release — a core reason teams trust QuestPDF in production-critical systems.

- **Content translation support.** Tooling to streamline generating the same document across multiple languages, making QuestPDF easier to adopt for teams serving international audiences and multi-market operations.


## Recently delivered

QuestPDF is under active, continuous development. A selection of recent milestones:

- **Enterprise-ready licensing and documentation** *(2026.6)* — Substantially revised legal documents to better support enterprise procurement and compliance requirements.

- **Windows ARM64 native support** *(2026.6)* — Native execution on `win-arm64` environments.

- **Broader Linux compatibility** *(2026.6)* — Improved support for older Linux distributions (glibc 2.28 and newer), widening the range of supported deployment targets.

- **.NET 10 support** *(2025.12)* — Full compatibility with the latest .NET release.

- **Tagged PDF and semantic structure** *(2025.12)* — Automatic semantic tagging of document content, the foundation for accessible, machine-readable PDFs.

- **PDF/UA-1, PDF/A-2, and PDF/A-3 conformance** *(2025.12)* — Support for accessibility and archival conformance standards across the PDF/A-2 and PDF/A-3 conformance levels and PDF/UA-1.

- **Automated conformance and e-invoice validation** *(2025.12)* — QuestPDF's own output is continuously validated against conformance standards using veraPDF, and against ZUGFeRD / Factur-X requirements using the Mustang project.

- **Document operations API** *(2025.7)* — Merge existing documents, manage metadata, and embed e-invoice data through a dedicated operations API.

- **Concurrent generation performance** *(2025.7)* — Significant throughput improvements when generating many text-heavy documents in parallel.

- **Custom rendering engine** *(2024.3 onward)* — A custom Skia-based native layer replacing the previous SkiaSharp dependency, making QuestPDF a self-contained library with a rendering stack we control and update on a predictable cadence (currently tracking Skia M149).

- **Companion App** — A visual layout debugger and live preview that makes diagnosing layout issues fast and intuitive.


:::info
This roadmap is a living document and will evolve as priorities develop. It reflects current intent and direction rather than a binding commitment or delivery schedule.
:::