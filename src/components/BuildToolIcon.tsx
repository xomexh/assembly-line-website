import { Screwdriver } from '@phosphor-icons/react';

export function BuildToolIcon() {
  return (
    <span className="build-tool" aria-hidden="true">
      <Screwdriver className="build-tool__driver" size={19} weight="bold" />
      <span className="build-tool__fastener" />
    </span>
  );
}
