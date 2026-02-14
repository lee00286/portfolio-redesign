'use client';

import { useEffect } from 'react';

/**
 * Observes the scroll position and updates the URL hash accordingly.
 * @returns
 */
function ScrollHashObserver() {
  useEffect(() => {
    const scrollContainer = document.querySelector('[data-scroll-container]');
    if (!scrollContainer) return;

    const sections = Array.from(
      scrollContainer.querySelectorAll('section[id]')
    );

    if (!sections || sections?.length === 0) return;

    let currentId = '';

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const containerTop = scrollContainer.getBoundingClientRect().top;

      // If at the bottom of the page, anchor to the last section
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        const last = sections[sections.length - 1];
        const newHash = `#${last.id}`;

        if (newHash !== currentId) {
          currentId = newHash;
          history.replaceState(null, '', newHash);
          window.dispatchEvent(new Event('hashchange'));
        }
        return;
      }

      let candidate = null;

      for (const section of sections) {
        // Skip sections that are not in the DOM
        if (section.offsetParent === null) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top - containerTop <= 0) {
          candidate = section;
        } else {
          break;
        }
      }

      // if (!candidate) {
      //   candidate = sections[0];
      // }

      const newHash = candidate ? `#${candidate.id}` : '';

      if (newHash !== currentId) {
        currentId = newHash;
        history.replaceState(null, '', newHash);
        window.dispatchEvent(new Event('hashchange'));
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}

export default ScrollHashObserver;
