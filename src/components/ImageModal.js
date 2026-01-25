'use client';

import { useEffect } from 'react';
import { useModal } from '@/contexts/ModalProvider';

function ImageModal() {
  const { modalData, onClose } = useModal();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!modalData) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90%] max-h-[90%]"
        onClick={(e) => e?.stopPropagation()}
      >
        <img src={modalData.src} alt={modalData.alt} />
        <button
          className="absolute -top-1 right-0 -translate-y-[100%] font-bold text-white text-xl cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default ImageModal;
