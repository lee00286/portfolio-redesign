'use client';

import { useEffect, useRef } from 'react';

export function useAutosizeTextarea(value) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref?.current) return;

    ref.current.style.height = 'auto';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [value]);

  return ref;
}
