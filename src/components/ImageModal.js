'use client';

import { useEffect, useRef } from 'react';
import { useModal } from '@/contexts/ModalProvider';

const FOCUSABLE_SELECTOR =
  'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

function ImageModal() {
  const { modalData, onClose } = useModal();

  const modalRef = useRef(null);
  const prevFocusedRef = useRef(null);

  useEffect(() => {
    if (!modalData) return;

    // Store the currently focused element
    prevFocusedRef.current = document?.activeElement;

    const modalEl = modalRef.current;
    if (!modalEl) return;

    const focusableElements = modalEl.querySelectorAll(FOCUSABLE_SELECTOR);

    // Focus the first focusable element in the modal
    focusableElements[0]?.focus();

    const handleKeyDown = (e) => {
      if (e?.key === 'Escape') {
        // Escape: Close the modal
        onClose();
        return;
      }

      if (e?.key !== 'Tab') return;

      if (focusableElements?.length === 0) {
        e?.preventDefault();
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

      if (e?.shiftKey && document?.activeElement === firstFocusableElement) {
        // Shift + Tab: Move focus to the last focusable element
        e?.preventDefault();
        lastFocusableElement?.focus();
      } else if (
        !e?.shiftKey &&
        document?.activeElement === lastFocusableElement
      ) {
        // Tab: Move focus to the first focusable element
        e?.preventDefault();
        firstFocusableElement?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);

      if (prevFocusedRef.current) {
        // Restore the previously focused element
        prevFocusedRef.current.focus();
      }
    };
  }, [modalData, onClose]);

  if (!modalData) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        ref={modalRef}
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
