export const legalCopy = {
  privacy: {
    title: 'Privacy policy',
    intro: 'A plain-language overview of how enquiry information is handled.',
    sections: [
      ['Information you share', 'When you contact us, you may choose to share your name, contact details, location, budget and PC requirements. The website does not store the build brief before WhatsApp opens.'],
      ['How it is used', 'We use enquiry information to answer questions, prepare a configuration, provide support and communicate about your order.'],
      ['Your choices', 'You may ask us to correct or delete information associated with your enquiry by emailing assemblylineindia@gmail.com.'],
    ],
  },
  terms: {
    title: 'Terms of service',
    intro: 'The practical terms that apply when you use this website or request a configuration.',
    sections: [
      ['Reference configurations', 'Builds and prices shown on this website are starting points. Final component selection, availability, price and delivery timing are confirmed in a written quotation.'],
      ['Advice and compatibility', 'Recommendations are based on the requirements you share and the information available when the quote is prepared.'],
      ['Contact', 'Questions about a quote or these terms can be sent to assemblylineindia@gmail.com.'],
    ],
  },
  refund: {
    title: 'Refund policy',
    intro: 'Refund and cancellation terms depend on the stage of a custom order.',
    sections: [
      ['Before ordering', 'Review the component list, price and lead time in your quotation before approving the build.'],
      ['Custom orders', 'Because components may be ordered specifically for an approved build, cancellation and refund eligibility can vary once procurement begins. The applicable terms will be confirmed with your order.'],
      ['Problems after delivery', 'Contact us promptly if an item arrives damaged or the system is not working as expected so we can assess the issue and help.'],
    ],
  },
  shipping: {
    title: 'Shipping policy',
    intro: 'How delivery is planned for a finished custom PC.',
    sections: [
      ['Delivery availability', 'Delivery options, charges and estimated timing are confirmed for your location before the order is approved.'],
      ['Packaging', 'Completed systems are prepared for transport with internal and external protection appropriate to the selected case and components.'],
      ['At delivery', 'Inspect the outer packaging when the shipment arrives and contact us promptly if there is visible transit damage.'],
    ],
  },
} satisfies Record<string, {
  title: string;
  intro: string;
  sections: [string, string][];
}>;

export type LegalDocument = keyof typeof legalCopy;
