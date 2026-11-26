import { defineLoader } from "vitepress";
import { featureTree, type FeatureNode } from "./featureTree";

declare const data: number;
export { data };

/* How many features the Features overview lists, for the homepage's "200+": counted at build time, so the homepage
   does not load the tree. A feature that holds options counts through them, not once more itself; the number is
   rounded down to ten. */
const count = (nodes: FeatureNode[]): number =>
    nodes.reduce((sum, node) => sum + (node.items ? count(node.items) : 1), 0);

export default defineLoader({
  load: () => Math.floor(count(featureTree) / 10) * 10
});
