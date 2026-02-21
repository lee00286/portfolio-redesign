'use client';

import { useEffect, useRef, useCallback } from 'react';

const MBL_BREAKPOINT = 854;

/**
 * Observes the scroll position and updates the URL hash accordingly.
 * Only active at some breakpoint.
 */
function ScrollHashObserver() {
  const rafId = useRef(null);
  const currentHash = useRef('');
  const cleanupScroll = useRef(null);

  const activate = useCallback(() => {
    // If observer is already active
    if (cleanupScroll.current) return;

    const scrollContainer = document.querySelector('[data-scroll-container]');
    if (!scrollContainer) return;

    const sections = Array.from(
      scrollContainer.querySelectorAll('section[id]')
    );

    if (!sections || sections?.length === 0) return;

    const updateHash = (newHash) => {
      if (newHash === currentHash.current) return;
      currentHash.current = newHash;

      history.replaceState(null, '', newHash || window.location.pathname);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    };

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const containerTop = scrollContainer.getBoundingClientRect().top;

        if (scrollTop + clientHeight >= scrollHeight - 1) {
          const last = sections[sections.length - 1];
          updateHash(`#${last.id}`);
          return;
        }

        let candidate = null;

        for (const section of sections) {
          if (section.offsetParent === null) continue;

          const rect = section.getBoundingClientRect();

          if (rect.top - containerTop <= 0) {
            candidate = section;
          } else {
            break;
          }
        }

        updateHash(candidate ? `#${candidate.id}` : '');
      });
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    cleanupScroll.current = () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      cleanupScroll.current = null;
    };
  }, []);

  const deactivate = useCallback(() => {
    if (cleanupScroll.current) cleanupScroll.current();
  }, []);

  useEffect(() => {
    // Activate/deactivate depending on screen size
    const handleResize = () => {
      if (window.innerWidth >= MBL_BREAKPOINT) {
        activate();
      } else {
        deactivate();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      deactivate();
    };
  }, [activate, deactivate]);

  return null;
}

export default ScrollHashObserver;
