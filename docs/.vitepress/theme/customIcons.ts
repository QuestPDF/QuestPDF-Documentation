/* Glyphs Font Awesome has no good match for, drawn on its 512 grid with its regular-style 48-unit stroke so they sit
   next to the Pro icons unnoticed. Same definition shape as the imported ones, so Icon.vue renders them as is. */

import type { IconDefinition, IconName } from "@fortawesome/fontawesome-common-types";

/* a square with one large rounded corner against three sharp ones */
export const faRoundedCorners: IconDefinition = {
  prefix: "fak",
  iconName: "rounded-corners" as IconName,
  icon: [
    448, 512, [], "",
    "M224 32L424 32A24 24 0 0 1 448 56L448 456A24 24 0 0 1 424 480L24 480A24 24 0 0 1 0 456L0 256A224 224 0 0 1 224 32zM224 80A176 176 0 0 0 48 256L48 432L400 432L400 80L224 80z"
  ]
};

/* duotone: the secondary layer is the shadow cast below and right of the box, rendered at Icon.vue's 40% opacity */
export const faDropShadow: IconDefinition = {
  prefix: "fakd",
  iconName: "drop-shadow" as IconName,
  icon: [
    512, 512, [], "",
    [
      "M352 128L384 128A64 64 0 0 1 448 192L448 416A64 64 0 0 1 384 480L160 480A64 64 0 0 1 96 416L96 384L288 384A64 64 0 0 0 352 320z",
      "M64 32L288 32A64 64 0 0 1 352 96L352 320A64 64 0 0 1 288 384L64 384A64 64 0 0 1 0 320L0 96A64 64 0 0 1 64 32zM64 80A16 16 0 0 0 48 96L48 320A16 16 0 0 0 64 336L288 336A16 16 0 0 0 304 320L304 96A16 16 0 0 0 288 80L64 80z"
    ]
  ]
};
