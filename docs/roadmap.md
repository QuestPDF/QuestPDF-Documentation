# Roadmap

## Next releases

1) Improving development experience when debugging infinite layout exceptions,
2) Optimization of FluentAPI implementation.

## Long-term focus

1) Iterative documentation improvements:
   - Improve documentation about each building element: offer more precise behavior descriptions, API references, and more examples,
   - Investigate better connectivity between code examples, e.g., by generating clickable links in the code,
   - Shorten and simplify the `Getting Started` tutorial,
   - Record a short video introducing the basic concepts of QuestPDF.
2) Improved text capabilities and language support:
   - Unicode-compliant bi-directional and LTR/RTL Text Support (UAX #9),
   - Unicode-compliant word-break algorithm (UAX #14).
3) Support for tagged PDFs.
4) Automated font subsetting to reduce output file size.
5) New QuestPDF Previewer application to enhance the development experience.

## Under consideration

### Previewer tool improvements

- Add support for SectionLinks,
- Add support for Hyperlinks,
- Improved UI for general exceptions,
- Interactive UI for infinite-layout exceptions,
- Investigation: per-page performance measurement,
- Investigation: content and elements inspection.

### Other ideas

- Throw exception (debug mode only) when there is no font style close enough to current text style (e.g. no font with italic bold version),
- Investigation on how to simplify unit tests and make them easier to manage,
- Relative elements: alignment and translate,
- Text truncating,
- Custom slots in components (named slots, dynamic slots).
