# Roadmap

::: tip
Please note that QuestPDF is developed mainly by a single person. I am doing my best to maintain the project and offer the highest stability possible. However, some plans are likely to change over time.
:::

## Next releases

### 2022.07 - 2022.10

**Documentation redesign** - implementing new features is really important to cover most common requirements. However, it is essential to simplify learning process and help new developers. Current documentation has been designed over a year ago and since then has grown over three times in size. I would like to rethink its structure:

1) Shorten and simplify the `Getting started` tutorial.
2) Record short video introducing to basic concepts of QuestPDF.
3) Create a separate page for each layout element. Offer more precise behavior descriptions, API reference and more examples.
4) Divide the `Patterns and practices` page into separate sections.
5) Investigate better connectivity between code examples, e.g. by generating clickable links in the code.
6) Prepare documentation to be translated into other languages.

**Improve line breaking algorithm for Asian languages** - not all languages use whitespace to break lines and wrap text. Some of them, such as Chinese, use significantly different [set of rules](https://en.wikipedia.org/wiki/Line_breaking_rules_in_East_Asian_languages). Covering most of them should improve QuestPDF compatibility with Asian languages. This mode will be available as special `TextStyle` flag, possible to set up globally for entire document.

**Right to left support** - this release will continue improving compatibility with more advanced languages. This feature is not only about direction of text but also impact a couple of layout algorithms. For example, the `Table` element should place cells starting from the right-hand side when RTL mode is enabled. Moreover, the developer should be able to enable the RL mode on per-element and per-document basis.


## Under consideration

### Previewer tool improvements

- Add support for SectionLinks,
- Add support for Hyperlinks,
- Improved UI for general exceptions,
- Interactive UI for infinite-layout exceptions,
- Investigation: per-page performance measurement,
- Investigation: content and elements inspection.

### Other ideas

- Investigation on how to simplify unit tests and make them easier to manage.
- Relative elements: alignment and translate,
- Font subsetting to reduce output file size,
- Text justification,
- Text truncating,
- Custom slots in components (named slots, dynamic slots).
