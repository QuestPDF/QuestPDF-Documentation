# Text Style

## Font Size

Font size measures the height of text characters, determining how large or small the text appears.

It's worth noting that different fonts may render text with different visual sizes, even when assigned the same numerical font size.

<<< @/snippets/text-style/font-size.cs{7,11,15 csharp}

![Three lines of the same sentence at 16, 24 and 36 points, each one clearly larger than the last.](/api-reference/text-font-size.webp){.example}


## Font Family

A font family is a collection of related fonts that share a consistent design style but may vary in weight, style, or width.

Examples of font families include Lato, Noto Serif and JetBrains Mono. Fonts other than the built-in Lato must be available to your application, see [font management](/api-reference/text/font-management).

<<< @/snippets/text-style/font-family.cs{8,11 csharp}

![The same sentence in three fonts: the default sans-serif Lato, Noto Serif with serifs, and the monospaced JetBrains Mono.](/api-reference/text-font-family.webp){.example}


## Font Fallback

The Font Fallback option is a list of alternative fonts that are used when specific glyphs are unavailable in the primary font. This ensures that text is displayed correctly across different systems and environments.

A common example is the display of non-Latin characters, such as Arabic or Chinese, which may not be supported by all fonts.

<<< @/snippets/text-style/font-fallback.cs{3 csharp}

![An English sentence in Lato ends with the Arabic word البرمجة, which is drawn correctly by the fallback font instead of missing-glyph boxes.](/api-reference/text-font-fallback.webp){.example}

It's also useful for displaying emojis, which are not universally supported by all fonts.

<<< @/snippets/text-style/font-fallback-emoji.cs{3 csharp}

![Five emojis drawn inline with the text by the fallback font; they appear as black-and-white outlines, not in colour.](/api-reference/text-font-fallback-emoji.webp){.example}

::: tip
Rather than repeating the fallback list on every text element, configure it once in the [default text style](/api-reference/default-text-style) of the page or document.
Learn more in the [font management](/api-reference/text/font-management#covering-additional-languages) section.
:::

## Font Color

The font color determines the color applied to text characters, affecting their visual appearance.

It also influences the default color of text decorations, such as underlines.

<<< @/snippets/text-style/font-color.cs{4,6,8 csharp}

![Only the words "red", "green" and "blue" take their colours; the rest of the sentence stays black.](/api-reference/text-font-color.webp){.example}


## Background Color

Sets a solid background color for the text.

This color fills the area behind the text or other elements, enhancing contrast and providing visual emphasis.

<<< @/snippets/text-style/background-color.cs{4 csharp}

![Only the bold word "algorithm" has a pale yellow background that hugs the word; the rest of the sentence wraps to a second line without a background.](/api-reference/text-font-background.webp){.example}


## Font Weight

Determines the thickness of the text characters, ranging from light to bold, to create visual hierarchy or emphasis.

Please note that not all fonts support every weight. If the specified weight isn't available, the library selects the closest available option.

| Name          | CSS Value | Example Text                                   |
|---------------|-----------|------------------------------------------------|
| Thin          | 100       | <span style="font-weight: 100">Example</span>  |
| ExtraLight    | 200       | <span style="font-weight: 200">Example</span>  |
| Light         | 300       | <span style="font-weight: 300">Example</span>  |
| NormalWeight  | 400       | <span style="font-weight: 400">Example</span>  |
| Medium        | 500       | <span style="font-weight: 500">Example</span>  |
| SemiBold      | 600       | <span style="font-weight: 600">Example</span>  |
| Bold          | 700       | <span style="font-weight: 700">Example</span>  |
| ExtraBold     | 800       | <span style="font-weight: 800">Example</span>  |
| Black         | 900       | <span style="font-weight: 900">Example</span>  |
| ExtraBlack    | 1000      | <span style="font-weight: 1000">Example</span> |


<<< @/snippets/text-style/font-weight.cs{4,6,8,10 csharp}

![Bold, normal, light and thin weights in one sentence; the thin word is barely visible.](/api-reference/text-font-weight.webp){.example}

:::warning
QuestPDF does not currently support fonts with variable weights.
:::


## Italic

Renders text with an italic effect, where letters are slightly slanted to the right.

Commonly used for emphasis or to distinguish specific words.

<<< @/snippets/text-style/italic.cs{4 csharp}

![The word "important" is slanted while the rest of the sentence stays upright.](/api-reference/text-font-italic.webp){.example}


## Decorations

Applies decorative lines on text. Commonly used to emphasize specific words or phrases.

### Positions

It is also possible to customize the decoration position:
- Underline,
- Strikethrough,
- Overline.

<<< @/snippets/text-style/decoration-positions.cs{4,6,8 csharp}

![A red line below "underline", a green line through "strikethrough", and a blue line above "overline", as far above the tallest letters as the underline is below the baseline.](/api-reference/text-decoration-types.webp){.example}

### Styles

It is also possible to customize the decoration line style:
- DecorationSolid,
- DecorationDouble,
- DecorationWavy,
- DecorationDotted,
- DecorationDashed.

<<< @/snippets/text-style/decoration-styles.cs{5,7,9,11,13-14 csharp}

![Five underline styles under coloured words: solid, double, wavy, dotted and dashed.](/api-reference/text-decoration-styles.webp){.example}

### Styling

By default, the decoration line color is the same as the text color, and the decoration thickness is determined by the font. 
However, these properties can be customized.

<<< @/snippets/text-style/decoration-styling.cs{6-9 csharp}

![A red wavy line under the misspelled word "seriuos", in a different colour from the black text.](/api-reference/text-decoration-advanced.webp){.example}


## Subscript

Subscript displays text slightly below the baseline, often in a smaller size. 
Commonly used for chemical formulas or mathematical notations

<<< @/snippets/text-style/subscript.cs{4 csharp}

![The 2 in H2O is smaller and sits below the baseline.](/api-reference/text-subscript.webp){.example}


## Superscript

Superscript displays text slightly above the baseline, often in a smaller size.
Typically used for exponents, footnotes, or ordinal indicators

<<< @/snippets/text-style/superscript.cs{4 csharp}

![The 2 in E = mc2 is smaller and raised above the baseline.](/api-reference/text-superscript.webp){.example}


## Line Height

Adjusts the vertical spacing between lines of text, affecting readability and overall text layout.
The added space is proportional to the text size.

<<< @/snippets/text-style/line-height.cs{16 csharp}

![The same paragraph with three increasing line heights: in the tightest one the lines overlap, and in the widest one there is a full empty line between them.](/api-reference/text-line-height.webp){.example}


## Letter Spacing

Adjusts the horizontal spacing between characters in the text, affecting readability and overall visual style.

The adjustment is proportional to the text size.

<<< @/snippets/text-style/letter-spacing.cs{csharp}

![The same sentence with tighter, normal and wider letter spacing: tight letters touch each other, and wide spacing pushes the text onto a second line.](/api-reference/text-letter-spacing.webp){.example}


## Word Spacing

Adjusts the horizontal spacing between words in the text, affecting readability and overall visual style.
The adjustment is proportional to the text size.

<<< @/snippets/text-style/word-spacing.cs{csharp}

![Negative word spacing removes the gaps between words, normal spacing keeps them, and positive spacing widens them.](/api-reference/text-word-spacing.webp){.example}


## Hyphenation

QuestPDF supports hyphenation by breaking words at soft hyphen characters `U+00AD` and rendering a hyphen at the break.

It does not hyphenate text automatically. Please use a dedicated hyphenation library to insert soft hyphens for you.

A soft hyphen is invisible and is rendered only when the line actually breaks at that position. This behavior is always enabled and requires no configuration.

<<< @/snippets/text-style/hyphenation.cs{csharp}

![Without soft hyphens the long German words move to the next line whole; with them, the words break at the soft hyphens and a hyphen is drawn at each break.](/api-reference/text-hyphenation.webp){.example}


## Font Features

Font features are a set of typographic features that can be applied to text to enhance its appearance. 
They are used to control various aspects of text rendering.

Font features are always encoded as 4-character long strings. For example, the ligatures feature is encode as `liga`, while the kernig feature as `kern`.
For a list of available features, refer to the `QuestPDF.Helpers.FontFeatures` class.

::: tip
Please note that fonts usually support only a subset of font features.
If you try to enable a feature that is not supported by the font, it will be ignored.
Moreover, some fonts have features enabled by default, and you may not see any difference when enabling them.
:::

::: info
QuestPDF disables the `StandardLigatures` feature by default. Enable it explicitly whenever you want ligatures in your document.
:::

### Example

Let's analyze the `StandardLigatures` font feature, which replaces specific pairs of letters (such as 'fi' or 'fl') with a single, combined glyph to enhance aesthetics.

<<< @/snippets/text-style/font-features.cs{15,27 csharp}

![Without ligatures, "fl" and "fi" are separate letters; with ligatures, each pair is joined into a single glyph.](/api-reference/text-font-features.webp){.example}


## Break Anywhere

Allows a line to break between any two characters, not only at word boundaries such as spaces or hyphens.

With this setting enabled, lines are filled as fully as possible, at the cost of splitting words at arbitrary positions without hyphenation.

Without this setting, a word longer than the line is still split where it overflows, so no text is cut off. `BreakAnywhere` changes where lines break: they are filled completely instead of breaking early at natural break points such as `/` or `-`. Use it when evenly filled lines matter more than readable breaks, e.g. hashes or identifiers in narrow columns; for prose and URLs the default is usually easier to read.

<<< @/snippets/text-style/break-anywhere.cs{csharp}

![By default the URL breaks after "-" and "/", leaving uneven lines; with BreakAnywhere every line is filled and words are split at any character, such as "api-ref" / "erence".](/api-reference/text-break-anywhere.webp){.example}