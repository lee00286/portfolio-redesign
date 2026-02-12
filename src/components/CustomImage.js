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

  const onClick = () => {
    if (hasLightbox) {
      onOpen({ src, alt });
    }
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 1200}
      height={height || 800}
      className={`rounded-lg border border-gray-600 object-contain w-full ${imgClass ? imgClass : ''}`}
      onClick={onClick}
    />
  );
}

export default CustomImage;
