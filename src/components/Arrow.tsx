export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={diagonal ? 'arrow arrow--diagonal' : 'arrow'}
    >
      →
    </span>
  );
}
