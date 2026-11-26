/* The resellers named on the pricing and contact pages; the logos are in public/license/resellers.

   size: the height at which the logo's letters are as tall as the others' (about 29px). shift: moves the logo so that
   the letters stand on one baseline; QBS is stacked, so it is centred on the letters instead. Both are multiplied by
   the row's --unit. */
export const resellers = [
  { name: "SoftwareOne", link: "https://www.softwareone.com/", src: "software-one.svg", size: 30, shift: 0.4 },
  { name: "Insight", link: "https://www.insight.com/", src: "insight.svg", size: 38, shift: 4.6 },
  { name: "SHI", link: "https://www.shi.com/", src: "shi.svg", size: 40, shift: -5.1 },
  { name: "QBS Software", link: "https://www.qbssoftware.com/", src: "qbs-software.svg", size: 45, shift: 0 }
];
