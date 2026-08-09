import { WhatsappLogo } from '@phosphor-icons/react';
import { primaryWhatsappUrl } from '../contact.ts';

export function FloatingWhatsapp() {
  return (
    <a
      className="floating-whatsapp"
      href={primaryWhatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Assembly Line on WhatsApp"
    >
      <span>Ask an enthusiast</span>
      <span className="floating-whatsapp__icon" aria-hidden="true">
        <WhatsappLogo size={20} weight="fill" />
      </span>
    </a>
  );
}
