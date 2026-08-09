import { contactEmail } from '../../contact.ts';

type LegalSection = [title: string, copy: string];

type LegalContent = {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export const legalCopy = {
  privacy: {
    title: 'Privacy policy',
    intro: 'This policy explains what information Assembly Line receives, why we use it and the choices available to you.',
    updated: 'Last updated August 2026',
    sections: [
      [
        'Information you provide',
        'When you ask for a configuration, place an order or request support, you may provide your name, email address, phone number, location, shipping address, budget, PC requirements and order details. Payment providers may also process payment information when a purchase is completed.',
      ],
      [
        'Website enquiries',
        'The build brief on this website prepares a message and opens WhatsApp. Assembly Line does not store that form submission on the website before WhatsApp opens. Your conversation is then handled under WhatsApp’s own privacy terms as well as this policy.',
      ],
      [
        'How information is used',
        'We use information to answer enquiries, recommend compatible components, prepare quotations, process and deliver orders, provide warranty or technical support, communicate order updates, prevent misuse and improve our products and services.',
      ],
      [
        'When information is shared',
        'Information may be shared with payment, delivery, component, warranty or technical service providers only when reasonably necessary to complete an order or provide support. We may also disclose information when required by law. We do not sell personal information.',
      ],
      [
        'Security and retention',
        'We use reasonable administrative and technical safeguards to protect the information in our care. No online system is completely secure. Information is retained only for as long as it is needed for orders, support, accounting, warranty, dispute resolution or legal obligations.',
      ],
      [
        'Your choices',
        `You may ask to access, correct or delete personal information associated with your enquiry by emailing ${contactEmail}. Some order or transaction records may need to be retained where the law requires it.`,
      ],
      [
        'Contact',
        `Questions about this privacy policy or the handling of your information can be sent to ${contactEmail}.`,
      ],
    ],
  },
  terms: {
    title: 'Terms of service',
    intro: 'These terms apply when you use this website, request a quotation or purchase products and services from Assembly Line.',
    updated: 'Last updated August 2026',
    sections: [
      [
        'Acceptance of terms',
        'By using the website or purchasing from Assembly Line, you agree to these terms and any written quotation or order confirmation supplied for your build. If you do not agree, do not place an order.',
      ],
      [
        'Reference configurations',
        'Builds, performance descriptions and prices shown on the website are reference points. The final component list, availability, price, taxes, delivery charges and estimated completion date are confirmed in a written quotation or order confirmation.',
      ],
      [
        'Products and substitutions',
        'Products are brand new unless they are explicitly identified otherwise. Assembly Line does not deal in second-hand products. A component will not be substituted after approval without discussing the change, compatibility and any price difference with you.',
      ],
      [
        'Orders and payment',
        'An order is accepted when the required payment is received and Assembly Line confirms it. Procurement or assembly may begin after acceptance. Requested changes can affect compatibility, price and delivery timing and must be agreed in writing.',
      ],
      [
        'Warranty and support',
        'Individual components are covered by their respective manufacturer warranties. Every complete PC purchase includes lifetime free technical support from Assembly Line. Warranty decisions, repair methods and replacement timelines may depend on the relevant manufacturer or service centre.',
      ],
      [
        'Customer responsibilities',
        'You are responsible for providing accurate contact, delivery and use-case information, reviewing the approved component list and following reasonable setup, care and support instructions. Back up important data before submitting a system or storage device for service.',
      ],
      [
        'Limitation of liability',
        'To the extent permitted by law, Assembly Line is not responsible for indirect, incidental or consequential loss arising from use of a product or service. Nothing in these terms excludes rights or remedies that cannot lawfully be excluded under applicable consumer law.',
      ],
      [
        'Website content',
        'Branding, copy, imagery and other website content belong to Assembly Line or their respective owners. They may not be reproduced or commercially reused without permission. Product names and trademarks remain the property of their owners.',
      ],
      [
        'Applicable law and contact',
        `These terms are governed by the laws applicable in India. Questions about an order, quotation or these terms can be sent to ${contactEmail}.`,
      ],
    ],
  },
  refund: {
    title: 'Refund policy',
    intro: 'This policy explains when a custom order may be cancelled, which returns are eligible and how approved refunds are processed.',
    updated: 'Last updated August 2026',
    sections: [
      [
        'Custom order cancellation',
        'A custom PC order may be cancelled within 24 hours of placement for a full refund. Once assembly has begun, an accepted cancellation is subject to a 15% restocking fee to cover ordered components, handling and work already completed.',
      ],
      [
        'Eligible returns',
        'Eligible products may be returned within seven days of delivery. The item must be unused, complete and in its original packaging with included accessories, manuals and proof of purchase. Contact Assembly Line before sending anything back so the return can be authorised.',
      ],
      [
        'Non-returnable items',
        'Opened software, activated licence keys, specially sourced items and completed custom configurations are not refundable for a change of mind. This does not remove any remedy available for a verified defect, damage in transit or an item supplied incorrectly.',
      ],
      [
        'Damage or faults',
        'Report visible transit damage, missing items or a system that is not working as expected as soon as possible. Keep the packaging and provide photographs or diagnostic details when requested. Eligible issues may be handled through repair, replacement, manufacturer warranty or refund as appropriate.',
      ],
      [
        'Inspection and deductions',
        'Returned items are inspected before a refund is approved. Assembly Line may reduce or decline a refund where an item is incomplete, damaged after delivery, used beyond reasonable inspection or returned without the supplied packaging and accessories, subject to applicable law.',
      ],
      [
        'Refund timing',
        'Approved refunds are initiated within 7–10 business days after the returned item is received and inspected. Funds are ordinarily returned through the original payment method; a bank or payment provider may take additional time to credit the amount.',
      ],
      [
        'Stock or fulfilment issues',
        'If Assembly Line cannot fulfil an accepted order and no suitable alternative is agreed, the affected amount will be refunded without a cancellation fee.',
      ],
      [
        'Contact',
        `To request a cancellation, return or refund assessment, contact ${contactEmail} with your name, order details and the reason for the request.`,
      ],
    ],
  },
  shipping: {
    title: 'Shipping policy',
    intro: 'This policy explains where Assembly Line ships, typical preparation times and the support included after delivery.',
    updated: 'Last updated August 2026',
    sections: [
      [
        'Shipping coverage',
        'Assembly Line ships across India. Delivery availability and the carrier used can depend on the destination, system size and serviceability of the postal code.',
      ],
      [
        'Preparation and dispatch',
        'Custom builds typically dispatch within 5–7 business days after the order and payment are confirmed. This is an estimate rather than a guarantee because component availability, testing or circumstances outside our control can affect timing. We will communicate material delays.',
      ],
      [
        'Charges and express delivery',
        'Shipping charges, if any, are confirmed before the order is approved. Express delivery may be available for selected locations and can involve an additional charge. Taxes or charges shown in the final quotation take precedence over general website information.',
      ],
      [
        'Address and delivery',
        'Provide a complete and accurate delivery address and a reachable phone number. Additional costs caused by an incorrect address, refused delivery or repeated delivery attempts may be charged to the customer where permitted.',
      ],
      [
        'Packaging and inspection',
        'Completed systems are packed with internal and external protection appropriate to the selected case and components. Inspect the package on arrival. Note visible damage with the carrier where possible and contact Assembly Line promptly before discarding the packaging.',
      ],
      [
        'First-year offsite service',
        'Complete PC purchases include complimentary offsite repair and maintenance service during the first year. Parts, manufacturer warranty conditions, shipping to a service centre and damage outside normal covered use may involve separate costs.',
      ],
      [
        'Lifetime technical support',
        'Every complete PC purchase includes lifetime free technical support by phone, email or remote assistance. Technical support does not extend or replace a component manufacturer’s warranty and does not include free replacement parts unless separately covered.',
      ],
      [
        'Contact',
        `For dispatch updates, delivery questions or service support, contact ${contactEmail} with your order details.`,
      ],
    ],
  },
} satisfies Record<string, LegalContent>;

export type LegalDocument = keyof typeof legalCopy;
