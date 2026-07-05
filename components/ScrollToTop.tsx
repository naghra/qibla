import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Reset scroll position when the route changes (SPA navigation). */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const adminMain = document.querySelector('.admin-main');
    if (adminMain instanceof HTMLElement) {
      adminMain.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
