'use client';

import { useState } from 'react';
import { useAdminModal } from '@/contexts/AdminModalProvider';

function ConfirmModal() {
  const { modalData, onClose } = useAdminModal();

  const [isConfirming, setIsConfirming] = useState(false);

  if (!modalData) return null;

  const handleCancel = async () => {
    if (modalData.onCancel) {
      await modalData.onCancel();
    }

    onClose();
  };

  const handleConfirm = async () => {
    if (isConfirming) return;

    setIsConfirming(true);

    try {
      if (modalData.onConfirm) {
        await modalData.onConfirm();
      }
    } finally {
      setIsConfirming(false);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      onClick={handleCancel}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e?.stopPropagation()}
      >
        {modalData.title && (
          <h2 className="mb-3 text-lg font-bold">{modalData.title}</h2>
        )}

        {modalData.description && (
          <p className="mb-6 text-base">{modalData.description}</p>
        )}

        <div className="flex justify-end gap-3">
          <button
            disabled={isConfirming}
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            {modalData.cancelText || 'Cancel'}
          </button>

          <button
            disabled={isConfirming}
            className={`btn ${!!modalData.danger ? 'btn-danger' : 'btn-primary'}`}
            onClick={handleConfirm}
          >
            {modalData.confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
