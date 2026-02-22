'use client';

import { useEffect, useState } from 'react';

/**
 * Live clock on the right side of the menu bar.
 */
function MenuBarClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <time
      aria-hidden="true"
      className="!font-mono !font-bold !text-gray-700 xmd:!text-[rgba(255,255,255,0.8)] !text-sm xmd:!text-xs"
    >
      {time}
    </time>
  );
}

export default MenuBarClock;
