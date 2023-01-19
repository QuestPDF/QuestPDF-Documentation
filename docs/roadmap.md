# Roadmap

::: tip
Please note that QuestPDF is developed mainly by a single person. I am doing my best to maintain the project and offer the highest stability possible. However, some plans are likely to change over time.
:::

## Primary focus

**Documentation redesign** - implementing new features is really important to cover most common requirements. However, it is essential to simplify learning process and help new developers. Current documentation has been designed over a year ago and since then has grown over three times in size. I would like to rethink its structure:

1) Shorten and simplify the `Getting started` tutorial.
2) Record short video introducing to basic concepts of QuestPDF.
3) Improve documentation about each building element: offer more precise behavior descriptions, API reference and more examples.
5) Investigate better connectivity between code examples, e.g. by generating clickable links in the code.

## Next features

- Font subsetting to reduce output file size,
- Text justification,

## Under consideration

### Previewer tool improvements

- Add support for SectionLinks,
- Add support for Hyperlinks,
- Improved UI for general exceptions,
- Interactive UI for infinite-layout exceptions,
- Investigation: per-page performance measurement,
- Investigation: content and elements inspection.

### Other ideas

- Improve line breaking algorithm for Asian languages - not all languages use whitespace to break lines and wrap text. Some of them, such as Chinese, use significantly different [set of rules](https://en.wikipedia.org/wiki/Line_breaking_rules_in_East_Asian_languages). Covering most of them should improve QuestPDF compatibility with Asian languages. This mode will be available as special `TextStyle` flag, possible to set up globally for entire document.
- Throw exception (debug mode only) when there is no font style close enough to current text style (e.g. no font with italic bold version),
- Investigation on how to simplify unit tests and make them easier to manage,
- Relative elements: alignment and translate,
- Text truncating,
- Custom slots in components (named slots, dynamic slots).
