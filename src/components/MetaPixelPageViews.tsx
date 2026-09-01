import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type MetaPixelWindow = Window & {
  fbq?: (command: 'track', eventName: 'PageView') => void;
};

let lastTrackedLocation =
  typeof window === 'undefined'
    ? ''
    : `${window.location.pathname}${window.location.search}`;

export function MetaPixelPageViews() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const location = `${pathname}${search}`;

    if (location === lastTrackedLocation) return;

    lastTrackedLocation = location;
    (window as MetaPixelWindow).fbq?.('track', 'PageView');
  }, [pathname, search]);

  return null;
}
