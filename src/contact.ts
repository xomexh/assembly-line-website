import { whatsappUrl } from './data.ts';

export const contactEmail = 'assemblylineindia@gmail.com';
export const mapUrl = 'https://maps.app.goo.gl/ufb5wcTHCxRwNiF18';
export const phoneNumbers = [
  { display: '+91 70087 13016', href: 'tel:+917008713016' },
  { display: '+91 73270 31693', href: 'tel:+917327031693' },
] as const;

export const primaryWhatsappUrl = whatsappUrl(
  'Hi Assembly Line, I would like help planning a custom PC.',
);
