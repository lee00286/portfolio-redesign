'use client';

import Image from 'next/image';
import { useModal } from '@/contexts/ModalProvider';

function CustomImage({
  src,
  alt = 'An image',
  width,
  height,
  imgClass = '',
  hasLightbox = false
}) {
  const { onOpen } = useModal();

  if (!src) return <></>;

  const handleOpen = () => {
    onOpen({ src, alt });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 1200}
      height={height || 800}
      className={`rounded-lg border border-gray-200 object-contain w-full ${imgClass ? imgClass : ''}`}
      {...(hasLightbox
        ? {
            role: 'button',
            tabIndex: 0,
            onClick: handleOpen,
            onKeyDown: handleKeyDown,
            'aria-label': `View ${alt} in full size`
          }
        : {})}
    />
  );
}

export default CustomImage;
