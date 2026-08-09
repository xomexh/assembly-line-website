import { useEffect } from 'react';

export function PageMeta({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  useEffect(() => {
    document.title = title;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute('content', description);
  }, [description, title]);

  return null;
}
