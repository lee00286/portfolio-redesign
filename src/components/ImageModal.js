'use client';

import { useEffect, useRef } from 'react';
import { useModal } from '@/contexts/ModalProvider';

const FOCUSABLE_SELECTOR =
  'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

function ImageModal({ lang = 'en' }) {
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
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center sm:rounded-b-xl"
      style={{ backdropFilter: 'blur(2px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'en' ? 'Image View' : '이미지 보기'}
    >
      <div
        ref={modalRef}
        className="relative max-w-[90%] max-h-[90%]"
        onClick={(e) => e?.stopPropagation()}
      >
        <img
          src={modalData.src}
          alt={modalData.alt}
          className="rounded-lg"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
        />
        <button
          className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full bg-white/90 text-gray-700 text-sm font-semibold cursor-pointer"
          style={{
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            transition: 'background-color 0.15s ease'
          }}
          onClick={onClose}
          aria-label="Close image"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default ImageModal;
