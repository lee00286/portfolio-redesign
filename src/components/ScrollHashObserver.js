'use client';

import { useEffect, useRef } from 'react';

/**
 * Observes the scroll position and updates the URL hash accordingly.
 */
function ScrollHashObserver() {
  const rafId = useRef(null);
  const currentHash = useRef('');

  useEffect(() => {
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
    };

    const handleScroll = () => {
      // Cancel any pending frame to avoid stacking updates
      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const containerTop = scrollContainer.getBoundingClientRect().top;

        // If at the bottom of the page, anchor to the last section
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

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return null;
}

export default ScrollHashObserver;
