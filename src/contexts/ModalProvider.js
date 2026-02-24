'use client';

import { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modalData, setModalData] = useState(null);

  const onOpen = (image) => {
    setModalData(image);
  };

  const onClose = () => {
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ modalData, onOpen, onClose }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
