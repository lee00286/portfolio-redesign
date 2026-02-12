'use client';

import { createContext, useContext, useState } from 'react';

const AdminModalContext = createContext(null);

// const initialModalData = {
//   title: '',
//   description: '',
//   confirmText: 'Confirm',
//   cancelText: 'Cancel',
//   danger: false,
//   onCancel: null,
//   onConfirm: null
// };

export function AdminModalProvider({ children }) {
  const [modalData, setModalData] = useState(null);

  const onOpen = (data) => {
    setModalData({
      title: '',
      description: '',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      danger: false,
      ...data
    });
  };

  const onClose = () => {
    setModalData(null);
  };

  return (
    <AdminModalContext.Provider value={{ modalData, onOpen, onClose }}>
      {children}
    </AdminModalContext.Provider>
  );
}

export const useAdminModal = () => {
  const ctx = useContext(AdminModalContext);

  if (!ctx) {
    throw new Error('Admin modal context not found');
  }

  return ctx;
};
