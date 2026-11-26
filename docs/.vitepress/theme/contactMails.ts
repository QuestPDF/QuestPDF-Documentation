/* The prefilled emails behind the contact and pricing buttons. Plain ASCII and CRLF line breaks (RFC 6068): some mail
   clients mangle other characters or join lines on a bare LF. Keep each href under about 2,000 characters for older
   Outlook versions, and keep the subjects: incoming requests are sorted by them.
   The text is the sender's own email; hints for the sender go inside [brackets], never in the sentences. */

export const contactEmail = "contact@questpdf.com";

export const plainMail = `mailto:${contactEmail}`;

function mailto(subject: string, lines: string[]) {
  const body = ["Hello QuestPDF team,", "", ...lines, "", "Kind regards,", ""].join("\r\n");
  return `${plainMail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const address = "- Address: [street, city, state or region, postal code, country]";

const licenseFields = [
  "License",
  "- License type: [Professional or Enterprise]",
  "- For a renewal: [license ID or last invoice number]"
];

const companyFields = [
  "- Legal name: [as registered]",
  address,
  "- VAT or tax ID: [if applicable]"
];

/* printed as "License end user" on the quote and the Paddle invoice; covers reseller and affiliate purchases */
const endUserFields = [
  "License end user (if not the company above)",
  "- Legal name: [company that will hold the license]",
  address
];

const purchaseFields = [
  "Purchase",
  "- Invoice or order number: [from the receipt email]",
  "- Email address used at checkout: [if different from this one]"
];

export const quoteMail = mailto("Quote request: QuestPDF license", [
  "We would like to request a quote for a QuestPDF license. Our company details are below. Please use them on both the quote and the invoice.",
  "",
  ...licenseFields,
  "",
  "Company",
  ...companyFields,
  "",
  "Invoicing",
  "- Invoice contact: [name and email]",
  "- PO number: [if required on the invoice; can be sent later]",
  "",
  ...endUserFields,
  "",
  "If you need anything else to prepare the quote, please let me know."
]);

/* the same details without the quote step, for buyers who are ready to pay */
export const invoiceMail = mailto("Invoice request: QuestPDF license", [
  "We would like to purchase a QuestPDF license and pay by invoice. Our company details are below. Please use them on the invoice.",
  "",
  ...licenseFields,
  "",
  "Company",
  ...companyFields,
  "",
  "Invoicing",
  "- Invoice contact: [name and email]",
  "- PO number: [if required on the invoice]",
  "",
  ...endUserFields,
  "",
  "If you need anything else to prepare the invoice, please let me know."
]);

export const invoiceUpdateMail = mailto("Invoice update: QuestPDF license", [
  "We would like our company details added to the invoice for our QuestPDF license.",
  "",
  ...purchaseFields,
  "",
  "Company details for the invoice",
  ...companyFields,
  "",
  "If you need anything else to update the invoice, please let me know."
]);

export const refundMail = mailto("Refund request: QuestPDF license", [
  "We would like to request a refund for our QuestPDF license.",
  "",
  ...purchaseFields,
  "- Company name: [as on the invoice]",
  "",
  "Reason for the refund: [optional]",
  "",
  "If you need anything else to process the refund, please let me know."
]);

export const supportMail = mailto("Support request: QuestPDF", [
  "I need help with [a short description of the problem].",
  "",
  "Environment",
  "- QuestPDF version: [NuGet package version]",
  "- .NET version: [e.g. .NET 10]",
  "- Operating system: [e.g. Windows 11, macOS, or Linux in Docker]",
  "- License: [license ID or company name]",
  "",
  "Problem",
  "- Expected result: [what should happen]",
  "- Actual result: [what happens, with the full error message and stack trace, if any]",
  "",
  "Code sample",
  "[minimal code that reproduces the problem; a small project or the generated PDF can also be attached]",
  "",
  "Thanks in advance for your help."
]);
