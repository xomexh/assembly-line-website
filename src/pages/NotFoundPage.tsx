import { Link } from 'react-router-dom';
import { Arrow } from '../components/Arrow.tsx';
import { PageMeta } from '../components/PageMeta.tsx';

export function NotFoundPage() {
  return (
    <section className="not-found shell">
      <PageMeta
        title="Page not found - Assembly Line"
        description="This Assembly Line page could not be found."
      />
      <p className="eyebrow">404 · loose cable</p>
      <h1>This route is not connected.</h1>
      <p>The page may have moved, or the address may be incomplete.</p>
      <Link className="button button--primary" to="/">Return home <Arrow /></Link>
    </section>
  );
}
