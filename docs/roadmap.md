# Roadmap

QuestPDF is built to be a dependable, long-term foundation for generating PDF documents in code. This page outlines where the library is heading, including the capabilities we are actively building and our strategic direction over the coming releases.

This roadmap is a living document. Because we prioritize quality over rigid deadlines, we do not attach fixed dates to these items. It reflects our current intent rather than a binding delivery schedule.

## In progress

What we're actively building right now.

- **Support for more platforms and languages.** Foundational work is underway to bring the QuestPDF API to runtimes and languages beyond .NET, so more teams can rely on the same document engine regardless of their technology stack.

- **Native AOT compilation support.** Full compatibility with .NET Native AOT. AOT compilation delivers faster startup times, smaller self-contained deployments, and a lower memory footprint — increasingly important for serverless functions, containerized services, and high-density cloud workloads. This removes a key adoption barrier for teams standardizing on AOT-first architectures.

- **Introductory video and learning materials.** A concise video walkthrough of QuestPDF fundamentals, from your first document to real-world layouts. The goal is to shorten the path from evaluation to productive use — particularly for developers and teams adopting the library for the first time.


## Up next

Confirmed direction for upcoming releases. These items are planned and prioritized; exact timing depends on scope and dependencies.

- **Sample gallery with ready-to-use code.** A curated gallery of copy-and-paste code samples covering the most common document types — invoices, reports, certificates, and more — with complete, working implementations. Less boilerplate, faster implementation, and a proven starting point instead of a blank page.

- **New layout elements, options, and enhancements.** Ongoing expansion of the layout engine with new elements, richer configuration options, and refinements to existing components. A broader, more expressive set of building blocks means fewer custom workarounds and more document designs that can be described directly and cleanly in code.

- **Expanded and improved documentation.** Continued investment in documentation: broader coverage, clearer explanations, more end-to-end examples, and deeper guidance for advanced scenarios. Strong documentation lowers onboarding cost and reduces day-to-day friction for every team using QuestPDF.


## Future

Future development plans include:

- **Built-in PDF validation with veraPDF.** A first-class, built-in way to validate your generated documents against conformance standards using veraPDF — giving teams a straightforward, automated path to verify compliance directly within their own build and QA pipelines.

- **Increased test coverage.** Ongoing expansion of the automated test suite across more layouts, edge cases, and rendering scenarios. Higher coverage translates directly into greater stability and predictability from release to release — a core reason teams trust QuestPDF in production-critical systems.

- **PDF/A-4 and PDF/UA-2 conformance.** Support for the latest archival (PDF/A-4) and accessibility (PDF/UA-2) standards, building directly on the existing PDF/A-2, PDF/A-3, and PDF/UA-1 support. Essential for regulated industries, the public sector, and any organization with long-term archival or accessibility obligations.

- **Content translation support.** Tooling to streamline generating the same document across multiple languages, making QuestPDF easier to adopt for teams serving international audiences and multi-market operations.

- **PDF signing with X.509 certificates.** Built-in support for digitally signing documents using `X509Certificate` certificates. Digital signatures provide authenticity and tamper-evidence — a common requirement for contracts, invoices, and official documents across finance, legal, and government.

- **Further performance and resource-efficiency improvements.** Continued, deliberate investigation into generation speed alongside CPU and memory usage, with the goal of pushing throughput higher and resource consumption lower. This matters most for high-volume, latency-sensitive, and cost-conscious workloads running at scale.

- **Basic AcroForm support.** Programmatic creation of interactive form fields — text inputs, checkboxes, and similar controls — along with the ability to read submitted values back from existing form documents. This opens up fillable PDFs for use cases such as applications, surveys, and onboarding paperwork, and enables automated data capture from completed forms.

- **PDF content inspection.** Reading and inspecting the contents of existing PDF files — extracting text and examining document structure programmatically. This extends QuestPDF beyond document creation into analysis, supporting scenarios such as content extraction, verification, and post-processing of documents your systems receive.


## Recently delivered

QuestPDF is under active, continuous development. A selection of recent milestones:

- **Enterprise-ready licensing and documentation.** Substantially revised legal documents to better support enterprise procurement and compliance requirements.

- **Windows ARM64 native support.** Native execution on `win-arm64` environments.

- **Companion App.** A visual companion for development: live document preview, layout-problem debugging, navigation from rendered output straight to the originating code, and content inspection — making it fast and intuitive to understand and fix exactly what your document is doing.

- **Tagged PDF and semantic structure.** Automatic semantic tagging of document content, the foundation for accessible, machine-readable PDFs.

- **PDF/UA-1, PDF/A-2, and PDF/A-3 conformance.** Support for accessibility and archival conformance standards across the PDF/A-2 and PDF/A-3 conformance levels and PDF/UA-1.

- **Automated conformance and e-invoice validation.** QuestPDF's own output is continuously validated against conformance standards using veraPDF, and against ZUGFeRD / Factur-X requirements using the Mustang project.

- **Advanced graphics capabilities.** Native support for linear gradients, rounded corners, customizable dash patterns for lines, and a dedicated shadow element with configurable blur, color, offset, and spread. Documents gain a polished, modern visual finish directly from code, with no external tooling required.

- **Document operations API.** A dedicated API for working with existing PDF files: merge and split documents, apply password protection, add overlays and underlays (for watermarks, stationery, or background templates), attach external files, manage metadata, and embed e-invoice data.

- **Custom text and graphics engine.** A custom Skia-based native layer replacing the previous SkiaSharp dependency, making QuestPDF a self-contained library with a rendering stack we control and update on a predictable cadence (currently tracking Skia M149). The same engine powers advanced typography (complex text shaping, right-to-left and bidirectional scripts, and automatic font subsetting), native SVG rendering, and document compression that meaningfully reduces output file size.
